import type { ScreeningSession } from "./types";
import { round } from "./utils";

function csvEscape(v: string | number | boolean): string {
  const s = String(v);
  if (/[",\n]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

const HEADERS = [
  "id",
  "protocolVersion",
  "createdAt",
  "completedAt",
  "uiLang",
  "testLang",
  "teacherName",
  "school",
  "district",
  "schoolType",
  "className",
  "childCode",
  "ageYears",
  "grade",
  "sex",
  "homeLanguage",
  "medium",
  "consent",
  "nItems",
  "accuracy",
  "theta",
  "se",
  "band",
  "notes",
] as const;

function row(s: ScreeningSession): string {
  const vals = [
    s.id,
    s.protocolVersion,
    s.createdAt,
    s.completedAt ?? "",
    s.uiLang,
    s.testLang,
    s.teacher.name,
    s.teacher.school,
    s.teacher.district,
    s.teacher.schoolType,
    s.teacher.className,
    s.child.code,
    s.child.ageYears,
    s.child.grade,
    s.child.sex,
    s.child.homeLanguage,
    s.child.medium,
    s.consent,
    s.trials.length,
    round(s.accuracy, 3),
    round(s.theta, 3),
    round(s.se, 3),
    s.band,
    s.notes,
  ];
  return vals.map(csvEscape).join(",");
}

export function sessionsToCsv(sessions: ScreeningSession[]): string {
  return [HEADERS.join(","), ...sessions.map(row)].join("\n");
}

export function downloadText(filename: string, text: string, mime = "text/csv") {
  const blob = new Blob([text], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function trialLog(s: ScreeningSession): string {
  const h = "index,itemId,text,real,responseReal,correct,rtMs,thetaAfter,seAfter";
  const lines = s.trials.map((t) =>
    [
      t.index,
      t.itemId,
      csvEscape(t.text),
      t.real,
      t.responseReal,
      t.correct,
      t.rtMs,
      round(t.thetaAfter, 4),
      round(t.seAfter, 4),
    ].join(","),
  );
  return [h, ...lines].join("\n");
}
