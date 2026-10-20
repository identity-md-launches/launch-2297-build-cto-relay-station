import type { IntegrationStatus, RelayAdapter } from "./adapter";
import { IntegrationPendingError } from "./types";
import { A1_SOURCE } from "../config";

/**
 * Live adapter. A1 has not delivered an accepted SDK, ABI or deployment, so every operation
 * fails closed. No selector, address, method or transaction is synthesized here. When A1 ships,
 * replace the bodies with calls into the pinned A1 SDK (see docs/A1-HANDOFF.md).
 */
const pending = (what: string) => () => Promise.reject(new IntegrationPendingError(what));

export function createLiveAdapter(): RelayAdapter {
  const status: IntegrationStatus = {
    state: "A1_INTEGRATION_PENDING",
    summary: "A1 尚未交付可用的 SDK、ABI 与部署配置，公开数据与链上操作均不可用。",
    missing: [
      "A1 交付仓库与提交（含 SDK/CLI 与 ABI）",
      "已验证的链 ID、Factory 地址与公开 RPC",
      "A1 不可变能力配置（类型、容量、大小上限、发布开关）",
    ],
    a1: { ...A1_SOURCE },
  };
  return {
    kind: "live",
    label: "A1 实时",
    capabilities: {
      read: false,
      createBranch: false,
      propose: false,
      sponsor: false,
      fork: false,
      bindingRetry: false,
      realWalletSigning: false,
    },
    status: () => status,
    getCapabilities: pending("能力配置"),
    listBranches: pending("公开项目列表"),
    getBranch: pending("分支读取"),
    getHistory: pending("历史读取"),
    getProposals: pending("提案读取"),
    getSponsorships: pending("资助状态读取"),
    quoteFee: pending("费用报价"),
    createBranch: pending("创建根分支"),
    propose: pending("提交提案"),
    approve: pending("授权额度"),
    sponsor: pending("资助"),
    retryRefused: pending("拒绝后重试"),
    resubmitBinding: pending("重新提交绑定"),
    fork: pending("分叉"),
    reconcile: pending("交易对账"),
    fetchFile: pending("文件下载"),
  };
}
