// The site's single configuration file: metadata, A1 source pin and wallet chain.
// No A1 address, ABI or selector lives here because A1 has not delivered one (A1_INTEGRATION_PENDING).
import { mainnet } from "viem/chains";

export const SITE_NAME = "CTO 中继站";
export const SITE_DESCRIPTION = "浏览公开项目、提出工作、明确资助、查看真实资产与历史，并从已接受的检查点分叉。";

/** What W1 observed about A1 at build time. Updated by hand at each integration step. */
export const A1_SOURCE = {
  jobId: "d5530989-b886-4f9d-80dd-44d26d85ffd2",
  submittedBodySha256: "3683b19c9c39d67b5c679641e4755e7914f471fe41329d1a3b2dfb1a34a58c77",
  checkedAt: "2026-10-20",
  observedState: "executing",
  delivery: null as string | null,
};

/**
 * A1's objective names Ethereum Intake v2, so the wallet control targets Ethereum mainnet.
 * This only drives the connect / switch-network control; no contract call uses it until A1 ships.
 */
export const WALLET_CHAIN = mainnet;
