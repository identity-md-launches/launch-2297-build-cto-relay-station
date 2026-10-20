import type { IntegrationStatus, RelayAdapter } from "./adapter";
import { IntegrationPendingError } from "./types";
import { A1_SOURCE } from "../config";

/**
 * A1 source/Node SDK is delivered, but its release has no product deployment and is not
 * production-ready. W1's browser bridge is unvalidated, so operations fail closed. No selector,
 * address or transaction is synthesized here (see docs/A1-HANDOFF.md).
 */
const pending = (what: string) => () => Promise.reject(new IntegrationPendingError(what));

export function createLiveAdapter(): RelayAdapter {
  const status: IntegrationStatus = {
    state: "A1_INTEGRATION_PENDING",
    summary: "A1 已交付源码与 Node SDK，尚无已验证的产品部署；浏览器集成未完成，公开数据与链上操作仍不可用。",
    missing: [
      "已验证的链 ID、Factory 地址与公开 RPC",
      "浏览器 SDK 适配与不可变配置核验",
      "W1 接入真实 A1 的本地链验收",
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
