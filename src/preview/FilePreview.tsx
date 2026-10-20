import { useEffect, useMemo, useState } from "react";
import type { RelayAdapter } from "../domain/adapter";
import { safeFileName, verifyFile, type VerifyResult } from "../domain/files";
import type { AssetVersion, Capabilities } from "../domain/types";
import { isolatedSrcDoc, renderMarkdown } from "./sanitize";
import { CopyId, KIND_LABEL } from "../ui/format";

type Load =
  | { phase: "loading" }
  | { phase: "error"; message: string }
  | { phase: "done"; bytes: Uint8Array; result: VerifyResult };

const MAX_IMAGE_SIDE = 4096;

/** Fetches the actual bytes of one asset version, verifies them against the A1 descriptor and previews safely. */
export function FilePreview({ asset, adapter, caps }: { asset: AssetVersion; adapter: RelayAdapter; caps: Capabilities }) {
  const [load, setLoad] = useState<Load>({ phase: "loading" });
  const [imgNote, setImgNote] = useState<string | null>(null);
  const d = asset.descriptor;

  useEffect(() => {
    let live = true;
    setLoad({ phase: "loading" });
    adapter
      .fetchFile(d, asset.producerJobId)
      .then(async (bytes) => {
        const result = await verifyFile(bytes, d, asset.kind, caps.maxBytes[asset.kind], caps.mediaTypes[asset.kind]);
        if (live) setLoad({ phase: "done", bytes, result });
      })
      .catch((e: Error) => live && setLoad({ phase: "error", message: e.message }));
    return () => { live = false; };
  }, [adapter, asset, caps, d]);

  const verified = load.phase === "done" && load.result.ok;
  const blobUrl = useMemo(() => {
    if (!verified || load.phase !== "done") return null;
    // Downloads use octet-stream so the browser saves rather than renders; images use their sniffed type.
    const type = asset.kind === "image" ? d.mediaType : "application/octet-stream";
    return URL.createObjectURL(new Blob([load.bytes as BlobPart], { type }));
  }, [verified, load, asset.kind, d.mediaType]);
  useEffect(() => () => { if (blobUrl) URL.revokeObjectURL(blobUrl); }, [blobUrl]);

  const text = load.phase === "done" && verified && asset.kind !== "image" ? new TextDecoder().decode(load.bytes) : null;

  return (
    <div className="preview" aria-live="polite">
      <dl className="facts">
        <div><dt>文件</dt><dd>{d.name}（{KIND_LABEL[asset.kind]}，{d.mediaType}）</dd></div>
        <div><dt>描述长度</dt><dd>{d.bytes} 字节</dd></div>
        <div><dt>描述 SHA-256</dt><dd><CopyId value={d.sha256} label="文件 SHA-256" /></dd></div>
        <div><dt>生产作业</dt><dd><CopyId value={asset.producerJobId} label="生产作业" /></dd></div>
      </dl>
      {load.phase === "loading" && <p className="state-line">正在下载并校验实际文件…</p>}
      {load.phase === "error" && (
        <p className="alert alert-error" role="alert">无法获取文件：{load.message}。不显示内容，也不标记为已校验。</p>
      )}
      {load.phase === "done" && (
        <>
          <ul className="checks">
            {load.result.checks.map((c) => (
              <li key={c.name} className={c.ok ? "check-ok" : "check-bad"}>
                <span aria-hidden="true">{c.ok ? "✓" : "✕"}</span> {c.name}：{c.ok ? "通过" : "不通过"}，{c.detail}
              </li>
            ))}
          </ul>
          {verified ? (
            <p className="badge badge-ok">已校验：与 A1 描述一致</p>
          ) : (
            <p className="alert alert-error" role="alert">校验失败：内容不予预览，也不提供下载。请让生产方重新提交正确的文件或绑定。</p>
          )}
        </>
      )}
      {verified && asset.kind === "html" && text !== null && (
        <iframe
          className="frame"
          title={`${d.name} 隔离预览`}
          sandbox=""
          referrerPolicy="no-referrer"
          srcDoc={isolatedSrcDoc(text)}
        />
      )}
      {verified && asset.kind === "document" && text !== null && (
        <div className="md" dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }} />
      )}
      {verified && asset.kind === "image" && blobUrl && (
        <figure className="img-box">
          <img
            src={blobUrl}
            alt={`${asset.assetKey} 第 ${asset.revision} 轮图片`}
            onLoad={(e) => {
              const im = e.currentTarget;
              if (im.naturalWidth > MAX_IMAGE_SIDE || im.naturalHeight > MAX_IMAGE_SIDE) setImgNote("图片尺寸超过显示上限，已隐藏");
              else setImgNote(`${im.naturalWidth} × ${im.naturalHeight} 像素`);
            }}
          />
          {imgNote && <figcaption>{imgNote}</figcaption>}
        </figure>
      )}
      {verified && blobUrl && (
        <a className="btn btn-secondary" href={blobUrl} download={safeFileName(d.name)}>
          下载已校验文件
        </a>
      )}
    </div>
  );
}
