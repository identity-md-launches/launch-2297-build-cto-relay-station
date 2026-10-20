# Validation evidence

Final checked product tree: source/export hashes in [release.json](release.json). A1 status: **A1_INTEGRATION_PENDING**. Actual A1 local-chain and mainnet tests are **NOT_RUN**. All PASS entries below concern the source, static export, fixture adapter or unsigned test-wallet integration specified in the row.

| Check | Actual result | Raw evidence |
| --- | --- | --- |
| Locked dependency install | Exit 0, unchanged manifest/lockfile | [install.log](raw/install.log) |
| TypeScript | Exit 0 | [typecheck-final.log](raw/typecheck-final.log) |
| Vitest | 27/27 passed, 2 files, exit 0 | [vitest-final.log](raw/vitest-final.log), [vitest.json](raw/vitest.json) |
| Production build | Exit 0; relative Vite export in `dist/` | [build-final.log](raw/build-final.log) |
| Chromium + WebKit | 95/95 passed, no skips or retries, exit 0 | [e2e-final.log](raw/e2e-final.log), [e2e.json](raw/e2e.json) |
| Per-test page/resource audit | 95 passed records; no uncaught page errors, unexpected console errors, external request attempts or HTTP errors; no host horizontal overflow | [browser/](browser/) |
| taste@1 | 16/16 on default entry page | [taste-final.log](raw/taste-final.log), [probe/taste.json](probe/taste.json), [probe screenshots](probe/shots/) |
| Targeted rendered design sample | Six pairs ≥4.5:1, phone input 16px, shortcuts fully visible, reduced-motion transition 0s | [design-review.log](raw/design-review.log), [design-measurements.json](raw/design-measurements.json) |
| Actual A1 SDK/contracts locally | NOT_RUN: no public final delivery/repo/commit/SDK/ABI/config | [A1 handoff](../A1-HANDOFF.md), [final job response](raw/a1-final.json) |
| Mainnet / paid execution / production hosting | NOT_RUN | No such operation was attempted |

`raw/commands.json` records actual command arguments, start/end times and exit codes from the final sequential run. The Playwright runner uses the locked 1.64.1 framework. Chromium uses the supplied executable; the WebKit runtime was downloaded by that locked CLI (WebKit 27.2, revision 2370). Temporary runtime files, browser binaries, caches and installed dependencies are excluded from the deliverable.

## Executed commands

```sh
npm ci --ignore-scripts --no-audit --no-fund --cache /tmp/w1-npm-cache

PLAYWRIGHT_BROWSERS_PATH=/opt/imd-tools/ms-playwright \
W1_WEBKIT_EXECUTABLE=/tmp/w1-browsers/webkit-2370/pw_run.sh \
PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1 \
node scripts/validate.mjs --imd-chromium

IMD_PLAYWRIGHT=/opt/imd-tools/playwright-mcp/node_modules/playwright/index.mjs \
PLAYWRIGHT_BROWSERS_PATH=/opt/imd-tools/ms-playwright \
node .imd/reads/skills/design-critic/scripts/taste.mjs --out test/scratch/taste --offline

PLAYWRIGHT_BROWSERS_PATH=/opt/imd-tools/ms-playwright \
node scripts/design-review.mjs --imd-chromium
```

The environment variables above select test runtimes only. The WebKit launcher uses temporary downloaded runtime libraries; host package-validation was bypassed for that userspace runtime, **not** browser sandbox/CSP or application checks. The actual browser launch and interaction results are retained. Standard-machine reproduction can install compatible browsers/runtime libraries and use `node scripts/validate.mjs` without the runtime override. The pinned taste input is supplied by this task and may not exist after its input files are removed; its unmodified results/screenshots are retained here.

No test edits the core or uses a real key, external paid order, live deployment or product backend. All browser servers are bounded static test transports closed by their owning command.

## Browser matrix and actual journeys

Each project executes all 19 browser cases; no desktop-only flow skips remain.

| Project | Browser/viewport | Cases |
| --- | --- | --- |
| chromium-desktop | Chromium, 1440 × 900 | 19 passed |
| chromium-mobile | Chromium mobile emulation, 390 × 844 | 19 passed |
| chromium-narrow | Chromium, 320 × 844 | 19 passed |
| webkit-desktop | WebKit, 1440 × 900 | 19 passed |
| webkit-mobile | WebKit phone emulation, 390 × 844 | 19 passed |

The fresh two-account journey creates a root, proposes two current alternatives, selects the older HTML proposal, sponsors with the other simulated identity, executes image R2 and HTML R3 using the own latest R2 parent, then creates document R4. It downloads actual HTML/PNG/Markdown files, compares length and independent Node SHA-256 against the displayed fixture descriptors, preserves the R1 marker and exact R2 PNG bytes in R3, and confirms untouched asset provenance. It forks historical R1 after R4, checks byte equality with original R1, excludes later assets/proposals/project/head and verifies the child's first fee preview uses `job.open`.

`files/<project>-journey.json` records the actual downloaded paths, SHA-256, byte lengths, producer jobs and original provenance. The adjacent files are real downloaded bytes. A filename ending `landing-r0.html` is the child's checkpoint-zero view of the **original R1 asset**, not a newly produced revision-zero file. Fixture identities have no private keys and transactions are simulated; none of these files are A1 execution evidence.

Additional executed cases cover:

- Default unavailable live mode without a connect wall or fixture fallback, static `/gateway/` asset/routing/metadata loading and first-screen controls.
- Create/propose/purchase double clicks, wrong network/account changes, stale resubmission and signature rejection with one-shot rejection state cleared.
- Pending/missing callback across reload, single-use identical status-1 retry, status-2 freeze, bad-binding repair without new purchase, original-hash/nonce unknown-transaction reconciliation.
- Missing/tampered files, SVG disguised as PNG, truncated PNG with matching descriptor hash, oversized dimension header, current-version preview replacement and real PNG decode.
- Malicious HTML/Markdown scripts, frame navigation, forms, refreshes, CSS/network sources, host messages/storage/navigation, unsafe links and DOM/focus clobbering.
- EIP-6963-only test provider without `window.ethereum`, named provider selection on phones/desktops, account changes, network switching, rejection, inert background, keyboard wrap/Escape/return and disconnect. No real signing methods are requested.
- Long unbroken names/goals/requirements, exact error hashes and actual Markdown code at all configured widths, with host overflow checked after every case.
- Demo reset from the project list clears created fixture projects and prepared forms, while preserving the wallet connector cache.

The explicit cross-origin isolation probe produces **13 expected WebKit sandbox-denial console messages** in this final run. Only the exact sandbox-denial diagnostic in that specific test is classified as expected; every message remains in the per-test JSON. It is evidence of a blocked action, not an ignored application exception. All other console errors fail validation.

## Screenshots and visual review

Screenshots are browser output at CSS pixel scale, not image-generated mockups. All five projects retain home, live/focus, workspace first-screen, expanded workspace/security, long-value and historical-fork screenshots in [screenshots/](screenshots/).

Reviewed representative evidence:

- [Chromium 390 home](screenshots/chromium-mobile-demo-home.png): public project and create action on the first screen, persistent demo label.
- [Chromium 390 workspace](screenshots/chromium-mobile-workspace-first.png): goal and fully visible section actions before full identifiers.
- [WebKit 390 home](screenshots/webkit-mobile-demo-home.png): same product/action and no overlap.
- [Chromium 320 live/focus](screenshots/chromium-narrow-live.png): visible keyboard focus and explicit unavailable production status.
- [WebKit 390 workspace](screenshots/webkit-mobile-workspace-first.png) and [expanded security state](screenshots/webkit-mobile-security.jpg): final source/export states.

The first-screen workspace screenshot is taken before any download scrolls the page. Full-page screenshots are separate. The probe reports no horizontal scroll at 320/390/1440, no overlapping text/floating control obstruction and no clipped text on its entry route. Six-domain review, repaired findings and coverage limits are in [REVIEW.md](../../REVIEW.md); implemented source tokens/components are in [DESIGN.md](../../DESIGN.md).

## Failures encountered and repaired

Historical iteration logs are retained under `raw/` with `baseline`, `repair`, `investigation`, `recheck` or `iteration` names. They are **not** final-tree PASS evidence. They record the original 10-unit/desktop-limited suite, exploratory browser failures and fixes: unsupported CSP directive, eager SDK reload probe, stale deferred actions, wrong hidden-title assertion, precise expected sandbox diagnostics and the full-matrix first-screen review. One unit experiment exceeded its timeout while deeply comparing 2 MiB arrays; the final test independently compares length and SHA-256, rather than relaxing data coverage. Test selector mistakes were corrected without treating their timeouts as product successes.

The final status comes only from `*-final.log`, final JSON reports, per-test records and the final export hashes. Tests were rebuilt and rerun after the last product-source repair. No serious reproduced defect remains open in the tested fixture path; this does not certify the absent production integration.

## Limitations and handoff

A1's final public delivery remains absent at the final recorded check. No SDK/ABI/config file was imported and no selector/address was fabricated. The live adapter is disabled, and live view wiring, true witnesses, authenticated callbacks, unsigned local-chain transactions, approval/purchase recovery before receipt, exact encoder budgets, Git and publication observation must pass the [A1 handoff](../A1-HANDOFF.md) before activation.

Actual A1 local-chain, mainnet, real browser extensions/mobile wallet apps/Coinbase passkeys and real IMD admission/execution are NOT_RUN. PNG is the exercised image format; JPEG/WebP browser files, physical-device testing, native zoom, screen-reader sessions, RTL and a second-author source security audit are not claimed. Independent automated design measurements and the contributor's separate source review carry no independent network certification.
