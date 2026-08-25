import type { RiskBand } from "./types";

export function bandClass(band: RiskBand): string {
  if (band === "typical") return "bg-flag-low text-typical";
  if (band === "watch") return "bg-flag-mid text-watch";
  if (band === "refer") return "bg-flag-high text-refer";
  return "bg-paper-2 text-dust";
}

export function bandTitleKey(band: RiskBand): string {
  if (band === "typical") return "results.typicalT";
  if (band === "watch") return "results.watchT";
  if (band === "refer") return "results.referT";
  return "results.incT";
}

export function bandBodyKey(band: RiskBand): string {
  if (band === "typical") return "results.typicalB";
  if (band === "watch") return "results.watchB";
  if (band === "refer") return "results.referB";
  return "results.incB";
}

export const INTERPRET_FLAGS: Array<{
  band: Exclude<RiskBand, "inconclusive">;
  doKey: string;
  childKey: string;
  parentKey: string;
  dontKey: string;
}> = [
  {
    band: "typical",
    doKey: "interpret.typicalDo",
    childKey: "interpret.typicalChild",
    parentKey: "interpret.typicalParent",
    dontKey: "interpret.typicalDont",
  },
  {
    band: "watch",
    doKey: "interpret.watchDo",
    childKey: "interpret.watchChild",
    parentKey: "interpret.watchParent",
    dontKey: "interpret.watchDont",
  },
  {
    band: "refer",
    doKey: "interpret.referDo",
    childKey: "interpret.referChild",
    parentKey: "interpret.referParent",
    dontKey: "interpret.referDont",
  },
];
