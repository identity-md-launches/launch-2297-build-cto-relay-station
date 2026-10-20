# A1 integration handoff

Status: **A1_INTEGRATION_PENDING**. A1 local-chain tests: **NOT_RUN**. Mainnet compatibility/consumption: **NOT_RUN**. No real key, paid job, public deployment or production hosting was used.

## Observed source and pins

- Public dependency: https://api.imd.fun/jobs/d5530989-b886-4f9d-80dd-44d26d85ffd2
- Submitted-body SHA-256 supplied by the assignment: `3683b19c9c39d67b5c679641e4755e7914f471fe41329d1a3b2dfb1a34a58c77`. The job metadata alone is not verification of the exact submitted-body encoding.
- Build/integration responses: `validation/raw/a1-build.json`, `validation/raw/a1-integration.json`, and the final release observation when present in `validation/release.json`.
- At the build and integration checks the job was `executing`, `delivery: null`, and project head was null. Partial accepted nodes do not identify a final public delivery.
- Actual delivered A1 repository: unavailable. Final commit: unavailable. Imported SDK/ABI/config files: **none**. Imported file hashes: empty. No inferred repository, guessed methods or synthetic ABI is used.
- `validation/release.json` pins W1 source, tests, protected lock/config files, export and the exact job-response bytes with SHA-256. The delivery service will assign W1's final commit; the manifest describes the checked working-tree bytes.

## Existing boundary

`src/domain/adapter.ts` defines one UI-domain `RelayAdapter`; `types.ts` defines view models and explicit operation capabilities. This is **not a contract ABI**. `liveAdapter.ts` advertises every capability false and rejects every operation with `A1_INTEGRATION_PENDING`. `FixtureAdapter` is a separate local-only implementation with simulated identities, prices, callbacks and storage. The default route never falls back to it.

## Work when a final delivery exists

1. Fetch the same public job, follow its actual delivery, and pin the delivered repository URL and final commit. Record every imported SDK, ABI and immutable configuration path and content SHA-256. Verify the provided body pin against an actual available submitted body; do not equate the job JSON or objective text hash with that pin.
2. Run A1's documented offline local tests/deployment unchanged in a temporary checkout. Use only temporary local-chain identities. Do not modify core, purchase a live job or add a signer/backend/indexer authority. Record exact commands, outcomes and any browser-incompatible Node-only modules.
3. Map the real SDK query, canonical checkpoint witnesses, proposal previews, unsigned transactions, fee/allowance checks, result/manifest binding and authenticated status APIs into the UI boundary. No method names/selectors can be derived from the UI interface. Keep a capability false until its mapping is real and tested.
4. Validate chain ID, Factory/Branch identity, immutable profiles/capability provenance and approved public RPC configuration. Replace candidate fixture constraints with actual SDK validation, including complete serialized request-body overhead, per-type reservations, input-type/inline-image budgets and mode/publication restrictions. W1's current draft checks are fixture/UI checks, not proof of A1 encoder compatibility.
5. Wire the verified live read route to the shared project/workspace views without a connect wall. Those views are currently instantiated only by demo mode; remove demo-specific route/chain assumptions when binding live views. Keep public unavailable states distinct from empty lists. Connect signing to the user's explicitly selected provider only.
6. Before each signature revalidate the selected account/network, configuration, anchor, current nonzero proposal, witnesses, quoted price, exact allowance and Branch spender. Approval must resolve after confirmed allowance, not merely a returned hash. MaxFee is a purchase ceiling, not permission for automatic sponsorship.
7. Journal the original approval/purchase hash, nonce, chain and selected identity as soon as submission is known, before waiting for confirmation. Reconcile after reload from the real SDK/chain, including dropped/replaced/unknown transactions and absent/corrupt local storage. Never automatically prepare a replacement purchase. The demo journal is not a production transaction broadcaster.
8. Implement authenticated refusal/status-1 identical-body retry with a fresh explicit fee/approval preview and new attempt receipt. Freeze status 2 and unknown failure; leave absent callbacks pending indefinitely. Obtain the corrected raw manifest and bounded witness from real A1 APIs for a binding preview/resubmission without repurchase. No HTTP response may unlock a branch or invent a refund.
9. Fetch actual files using SDK-approved public locations with streaming size limits, no private/local-network URL access, and descriptors/provenance from accepted checkpoints. Verify file SHA-256/length/MIME independently of raw-manifest keccak. Keep Git/publication observations and times separate; publishing before binding must not mark acceptance.
10. Run the entire acceptance matrix against actual A1 contracts/SDK locally, with temporary accounts and deterministic real files. Retain the already separate fixture evidence. Then complete the remaining explicitly authorized live acceptance in a later stage; this handoff authorizes no mainnet operation.

## Mandatory local-chain acceptance before enabling live operations

| Area | Required actual evidence | Current result |
| --- | --- | --- |
| Six functions | Root/propose/choose sponsor/read/continue/historical fork using real SDK-prepared transactions and witnesses | NOT_RUN |
| Multi-asset retention | Execute HTML R1 → image R2 → HTML R3; R3 parent is own latest job R2; selected saved R1 HTML and exact R2 image bytes persist | NOT_RUN |
| Historical fork | Chosen historical assets/provenance only; child has own open and separately funded execution | NOT_RUN |
| Payment/state | Exact Branch allowance, current price/maxFee, stale-anchor rejection, double submit, account/network changes | NOT_RUN |
| Recovery/failure | Original hash/nonce after reload, pending/missing callbacks, authenticated status 1, status 2/unknown freeze, corrected binding without repurchase | NOT_RUN |
| Files/publication | Actual authenticated descriptors, unavailable/tampered files, SHA-256 versus manifest keccak, Git/site observation ordering | NOT_RUN |
| Wallet integration | Selected real provider signing unsigned local-chain transactions; rejection and asynchronous receipt handling | NOT_RUN |

The existing fixture browser suite demonstrates UI behavior only. It does not authenticate callbacks, validate A1's Solidity parser, verify deployed contracts or prove IMD job admission/execution.
