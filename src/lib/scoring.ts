import type { RiskBand, Trial } from "./types";

/**
 * Provisional screening bands for the Karnataka pilot.
 * These are NOT the official ROAR-CAT norms. They exist so teachers get a
 * classroom-usable flag while Ms. Rashmi's validation sample is collected.
 */
export function bandFromTheta(theta: number, _se: number, nItems: number): RiskBand {
  if (nItems < 8) return "inconclusive";
  if (theta < -0.8) return "refer";
  if (theta < 0.2) return "watch";
  return "typical";
}

export function accuracyOf(trials: Trial[]): number {
  if (trials.length === 0) return 0;
  return trials.filter((t) => t.correct).length / trials.length;
}

export function meanRt(trials: Trial[]): number {
  if (trials.length === 0) return 0;
  return trials.reduce((s, t) => s + t.rtMs, 0) / trials.length;
}
