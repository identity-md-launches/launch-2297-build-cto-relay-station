# CTO 中继站 W1

Chinese-first static product workspace for the A1 Agent core. This stage preserves the existing React UI and adds executed validation and focused behavioral/security repairs.

**A1_INTEGRATION_PENDING.** A1 has delivered source/ABI and a Node SDK at commit `9b0294e7ab19060bd00c489fbe032cf248528e0d`, but its release has no product deployment and marks production readiness false. W1's browser bridge and actual W1-to-A1 local-chain acceptance remain **NOT_RUN**. The default page reports public data unavailable and disables all business operations. `#/demo` is an explicit, persistently labelled local fixture workspace. It never asks a real wallet to sign. No fixture result is an A1-chain integration result. The unmodified A1 dependency harness was separately replayed locally; see the [handoff](docs/A1-HANDOFF.md).

## Install, rebuild and preview

Use Node 22 or a compatible runtime and the committed lockfile. Existing dependency versions and build configuration are preserved.

```sh
npm ci --ignore-scripts --no-audit --no-fund --cache /tmp/w1-npm-cache
npm run typecheck
npm run test:unit
npm run build
npm run preview
```

Preview serves `dist/` at port 4173. Open the default page for the integration status or append `#/demo` for local demonstrations. `dist/index.html`, its hashed assets, favicon and share image are the complete static export. Vite uses `base: './'`; navigation uses hashes. The browser tests also serve the unchanged export under `/gateway/` and check relative asset loading. The product needs no operator server. There is no new contract or production deployment in this repository.

## Use the workspace

1. Discover projects publicly. In demo mode, create a root branch with a fixed goal; this simulates gas only.
2. Propose document, single-page HTML or single-image work. Choose create/update, a slot and explicit current input versions. An update requires its target input. Publication starts off. Image reference/editing is unavailable.
3. Choose any current proposal. Review its exact content, inputs, branch/checkpoint, parent job, publication effect, current price, maxFee and Branch spender. Approve the quoted exact price, then explicitly purchase. A higher price requires fresh confirmation/approval.
4. Inspect checkpoint assets and separate approval, purchase, admission, execution, callback, binding, file, Git and publication stages. Downloaded bytes are checked for length, SHA-256, allowed format and resource bounds before a preview/download is offered.
5. Continue on the same branch using its latest bound job while retaining untouched assets from older rounds.
6. Fork a selected historical checkpoint with a fixed direction. The child inherits that checkpoint's assets/provenance and has no own IMD project/head or proposals; execution requires new explicit sponsorship.

Demo account A/B and fault controls are test instruments, not accounts on a deployed A1 system. Demo state is stored in the browser and may be reset. The candidate limits and simulated IMD price are fixture data only. No activity, fee or asset from this mode is shown as public live data.

## Wallets and recovery

The single wallet control supports named EIP-6963 providers, mobile wallet-browser links and Coinbase Smart Wallet. Connection is explicit after a reload; the app does not initialize wallet SDKs merely to display public reads or the demo. A real wallet can display an account/network, but all demo operations continue to use only the clearly selected simulated account.

Prepared forms are discarded when their account/network changes. A delayed quote cannot start an approval after its form is unmounted. Recovery hints include adapter kind, chain, account, proposal, branch and original purchase hash/nonce. They are validated and reconciled through the adapter, never accepted as business truth. Reload does not buy again. Missing callbacks remain pending, status 2 freezes purchases, and corrected binding does not repurchase. Only simulated authenticated status 1 exposes an explicit identical-request retry in the demo.

The future live adapter must journal submission before waiting for receipts and reconcile approval/purchase uncertainty from A1 chain state. That actual SDK path is **NOT_RUN**, not implemented by the fixture journal.

## Files and previews

Markdown passes through Marked and DOMPurify. Active content, remote images, styles and host DOM/focus identifiers are removed; explicit HTTPS links open with `noopener noreferrer nofollow`.

Generated HTML is sanitized and rendered in `sandbox=""` with an opaque origin and a restrictive CSP. Scripts, navigation links, refreshes, forms, frames, network CSS and non-raster sources are removed. Inline raster image dimensions are bounded, with a shared pixel budget. The product never handles wallet messages from a preview. Preview rendering may differ from the original page; the explicit verified download preserves the original bytes.

W1's independent preview safety policy allows at most 4096 pixels per image side, with at most 4096² aggregate pixels in HTML inline images. This is a client preview limit, **not** a claimed A1 immutable capability value. A1 byte/media limits must come from the real adapter configuration. Standalone images must also decode successfully in the browser. A valid file hash proves byte agreement, not quality, publication, binding correctness or writer honesty.

## Reproduce browser validation

With compatible Chromium/WebKit installed for the locked Playwright version:

```sh
npx playwright install chromium webkit
node scripts/validate.mjs
```

This sequentially runs typecheck, Vitest, production build and all five browser projects, retaining actual command results under `docs/validation/raw/`. It also hashes the source/tests/config/export immediately after the build and checks they stayed unchanged through the browser run. `node scripts/record-release.mjs` refuses to generate release pins if those checked bytes later change. Browser runtime libraries must be available; the install command above is setup guidance, not a claim that an arbitrary host is preconfigured.

In this validation run Chromium uses the supplied browser via `tests/run-browsers.mjs --imd-chromium`; WebKit was downloaded with the locked CLI into temporary storage and supplied runtime libraries there. The exact execution command is in [validation/README.md](docs/validation/README.md). Neither browser binaries nor dependencies/caches are bundled in Git.

See [validation evidence](docs/validation/README.md), [review](REVIEW.md), [design system](DESIGN.md) and the [A1 handoff](docs/A1-HANDOFF.md). These distinguish fixture assertions, independent automated measurements, contributor source review and unperformed real integration. The Agent/CLI product remains a separate A1 deliverable; W1 does not replace it or grant backend authority.
