import type { RecoveryRecord } from "../domain/adapter";

// Local storage only helps recovery after a reload: the chain state the adapter reports is the truth.
const KEY = "w1.recovery.v1";

export function loadRecovery(): RecoveryRecord[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function saveRecovery(r: RecoveryRecord) {
  const all = loadRecovery().filter((x) => x.sponsorshipId !== r.sponsorshipId);
  localStorage.setItem(KEY, JSON.stringify([...all, r]));
}

export function removeRecovery(sponsorshipId: string) {
  localStorage.setItem(KEY, JSON.stringify(loadRecovery().filter((x) => x.sponsorshipId !== sponsorshipId)));
}
