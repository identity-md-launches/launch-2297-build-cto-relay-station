import type { AssetKind, FileDescriptor, Hex } from "./types";

export async function sha256Hex(bytes: Uint8Array): Promise<Hex> {
  const digest = await crypto.subtle.digest("SHA-256", bytes as BufferSource);
  return `0x${[...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("")}`;
}

export const utf8 = (s: string) => new TextEncoder().encode(s);
export const utf8Length = (s: string) => utf8(s).length;

/** Detects the real image format from magic bytes. SVG and anything else is rejected. */
export function sniffImage(bytes: Uint8Array): "image/png" | "image/jpeg" | "image/webp" | null {
  const b = bytes;
  if (b.length >= 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 && b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a) return "image/png";
  if (b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (b.length >= 12 && String.fromCharCode(...b.slice(0, 4)) === "RIFF" && String.fromCharCode(...b.slice(8, 12)) === "WEBP") return "image/webp";
  return null;
}

export interface VerifyResult {
  ok: boolean;
  checks: { name: string; ok: boolean; detail: string }[];
  actualSha256: Hex;
  actualBytes: number;
}

/** Verifies fetched bytes against the A1 descriptor: length, SHA-256, media type and size cap. */
export async function verifyFile(
  bytes: Uint8Array,
  descriptor: FileDescriptor,
  kind: AssetKind,
  maxBytes: number,
  allowedTypes: string[],
): Promise<VerifyResult> {
  const actualSha256 = await sha256Hex(bytes);
  const checks: VerifyResult["checks"] = [];
  checks.push({ name: "长度", ok: bytes.length === descriptor.bytes, detail: `实际 ${bytes.length} 字节，描述 ${descriptor.bytes} 字节` });
  checks.push({ name: "SHA-256", ok: actualSha256 === descriptor.sha256.toLowerCase(), detail: actualSha256 === descriptor.sha256.toLowerCase() ? "与描述一致" : `实际 ${actualSha256}` });
  checks.push({ name: "大小上限", ok: bytes.length <= maxBytes, detail: `上限 ${maxBytes} 字节` });
  let formatOk = allowedTypes.includes(descriptor.mediaType);
  let formatDetail = descriptor.mediaType;
  if (kind === "image") {
    const sniffed = sniffImage(bytes);
    formatOk = formatOk && sniffed === descriptor.mediaType;
    formatDetail = sniffed ? `文件头为 ${sniffed}` : "文件头不是 PNG、JPEG 或 WebP";
  } else {
    try {
      new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    } catch {
      formatOk = false;
      formatDetail = "不是有效的 UTF-8 文本";
    }
  }
  checks.push({ name: "格式", ok: formatOk, detail: formatDetail });
  return { ok: checks.every((c) => c.ok), checks, actualSha256, actualBytes: bytes.length };
}

/** A download file name that cannot escape into a path or carry control characters. */
export function safeFileName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "file";
  const cleaned = base.replace(/[^\p{L}\p{N}._-]/gu, "_").replace(/^\.+/, "");
  return cleaned.slice(0, 96) || "file";
}

export const toBase64 = (b: Uint8Array) => btoa(String.fromCharCode(...b));
export const fromBase64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
