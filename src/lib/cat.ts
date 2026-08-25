/**
 * Client-side IRT CAT used by ROAR-KA.
 *
 * Faithful to the published ROAR-CAT / jsCAT frame (Ma et al., 2025;
 * yeatmanlab/jsCAT): 1PL with a 0.5 lower asymptote for two-alternative
 * lexical decision, EAP ability estimation with a N(0,1) prior, Maximum
 * Fisher Information item selection, and SE from test information.
 *
 * Simplified reimplementation (no lodash / optimization-js). Algorithm
 * credit: Wanjing Anya Ma, Adam Richie-Halford, and the Yeatman Lab.
 */

import type { Item } from "./types";
import { clamp } from "./utils";

const MIN_THETA = -6;
const MAX_THETA = 6;
const STEP = 0.1;

export interface CatState {
  theta: number;
  se: number;
  nItems: number;
  remaining: Item[];
}

function irf(theta: number, item: Item): number {
  const p = item.c + (item.d - item.c) / (1 + Math.exp(-item.a * (theta - item.b)));
  return clamp(p, 1e-6, 1 - 1e-6);
}

function fisher(theta: number, item: Item): number {
  const p = irf(theta, item);
  const q = 1 - p;
  const denom = (1 - item.c) ** 2;
  if (denom < 1e-12) return 0;
  return item.a * item.a * (q / p) * ((p - item.c) ** 2 / denom);
}

function normalPdf(x: number, mean = 0, sd = 1): number {
  return Math.exp(-((x - mean) ** 2) / (2 * sd * sd)) / (Math.sqrt(2 * Math.PI) * sd);
}

function makeGrid(): Array<[number, number]> {
  const grid: Array<[number, number]> = [];
  for (let t = MIN_THETA; t <= MAX_THETA + 1e-9; t += STEP) {
    const theta = Math.round(t * 10) / 10;
    grid.push([theta, normalPdf(theta)]);
  }
  return grid;
}

const GRID = makeGrid();

function logLikelihood(theta: number, items: Item[], answers: Array<0 | 1>): number {
  let ll = 0;
  for (let i = 0; i < items.length; i++) {
    const p = irf(theta, items[i]);
    ll += answers[i] === 1 ? Math.log(p) : Math.log(1 - p);
  }
  return ll;
}

export function estimateEap(items: Item[], answers: Array<0 | 1>): number {
  if (items.length === 0) return 0;
  let num = 0;
  let den = 0;
  for (const [theta, prior] of GRID) {
    const like = Math.exp(logLikelihood(theta, items, answers));
    const w = like * prior;
    num += theta * w;
    den += w;
  }
  if (den <= 0) return 0;
  return clamp(num / den, MIN_THETA, MAX_THETA);
}

export function estimateSe(theta: number, items: Item[]): number {
  if (items.length === 0) return Number.POSITIVE_INFINITY;
  const info = items.reduce((s, it) => s + fisher(theta, it), 0);
  if (info <= 1e-12) return Number.POSITIVE_INFINITY;
  return 1 / Math.sqrt(info);
}

export function pickNext(theta: number, remaining: Item[], nAnswered: number): Item | null {
  if (remaining.length === 0) return null;
  if (nAnswered < 2) {
    const sorted = [...remaining].sort((a, b) => a.b - b.b);
    const mid = Math.floor(sorted.length / 2);
    const jitter = nAnswered === 0 ? -1 : 1;
    return sorted[clamp(mid + jitter, 0, sorted.length - 1)];
  }
  let best = remaining[0];
  let bestFi = -1;
  for (const item of remaining) {
    const fi = fisher(theta, item);
    if (fi > bestFi) {
      bestFi = fi;
      best = item;
    }
  }
  return best;
}

export function createCat(bank: Item[]): CatState {
  return {
    theta: 0,
    se: Number.POSITIVE_INFINITY,
    nItems: 0,
    remaining: bank.filter((i) => !i.practice),
  };
}

export function applyResponse(
  state: CatState,
  administered: Item[],
  answers: Array<0 | 1>,
  item: Item,
  correct: boolean,
): CatState {
  const nextAdmin = [...administered, item];
  const nextAns: Array<0 | 1> = [...answers, correct ? 1 : 0];
  const theta = estimateEap(nextAdmin, nextAns);
  const se = estimateSe(theta, nextAdmin);
  return {
    theta,
    se,
    nItems: nextAdmin.length,
    remaining: state.remaining.filter((i) => i.id !== item.id),
  };
}

export function shouldStop(nItems: number, se: number, minItems: number, maxItems: number, seStop: number): boolean {
  if (nItems >= maxItems) return true;
  return nItems >= minItems && se <= seStop;
}
