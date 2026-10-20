import DOMPurify from "dompurify";
import { marked } from "marked";

/** Markdown to sanitized HTML: no scripts, handlers, frames, forms, styles or remote images. */
export function renderMarkdown(src: string): string {
  const raw = marked.parse(src, { async: false, gfm: true }) as string;
  const purify = DOMPurify(window);
  purify.addHook("afterSanitizeAttributes", (node) => {
    if (node.tagName === "A") {
      const href = node.getAttribute("href") ?? "";
      if (!/^https:\/\//i.test(href)) node.removeAttribute("href");
      node.setAttribute("rel", "noopener noreferrer nofollow");
      node.setAttribute("target", "_blank");
    }
  });
  return purify.sanitize(raw, {
    FORBID_TAGS: ["img", "iframe", "frame", "object", "embed", "form", "input", "button", "style", "svg", "math", "video", "audio", "source", "link", "meta", "base"],
    FORBID_ATTR: ["style", "srcset"],
    ALLOW_DATA_ATTR: false,
  });
}

/**
 * Generated HTML is shown only inside an opaque-origin iframe (sandbox without allow-scripts or
 * allow-same-origin) and with a CSP that blocks network, scripts, forms and navigation. Inline
 * styles and data: images stay so self-contained pages render.
 */
export const PREVIEW_CSP =
  "default-src 'none'; img-src data:; style-src 'unsafe-inline'; font-src data:; form-action 'none'; base-uri 'none'; frame-src 'none'; connect-src 'none'; script-src 'none'; navigate-to 'none'";

export function isolatedSrcDoc(html: string): string {
  const meta = `<meta http-equiv="Content-Security-Policy" content="${PREVIEW_CSP}">`;
  // Put the CSP first so it applies before any element the generated page contains.
  return `<!doctype html><html><head>${meta}<meta name="referrer" content="no-referrer"></head><body>${html}</body></html>`;
}
