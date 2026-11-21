export type Lang = "en" | "kn" | "hi" | "te" | "ta" | "ml";

/** All supported languages, in switcher order. */
export const LANGS: Lang[] = ["kn", "en", "hi", "te", "ta", "ml"];

/** Each language's own name, for the language switcher. */
export const NATIVE_NAME: Record<Lang, string> = {
  kn: "ಕನ್ನಡ",
  en: "English",
  hi: "हिन्दी",
  te: "తెలుగు",
  ta: "தமிழ்",
  ml: "മലയാളം",
};

/** CSS class that sets the right script font for a test word. */
export function wordClass(lang: Lang): string {
  return `word-${lang}`;
}

export type SchoolType = "government" | "aided" | "private" | "other";

export type Sex = "girl" | "boy" | "unspecified";

export type Grade = "lkg" | "ukg" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";

export type RiskBand = "typical" | "watch" | "refer" | "inconclusive";

export type SessionStatus = "draft" | "practice" | "testing" | "complete" | "abandoned";

export interface Item {
  id: string;
  text: string;
  real: boolean;
  a: number;
  b: number;
  c: number;
  d: number;
  practice?: boolean;
}

export interface Trial {
  itemId: string;
  text: string;
  real: boolean;
  responseReal: boolean;
  correct: boolean;
  rtMs: number;
  thetaAfter: number;
  seAfter: number;
  index: number;
}

export interface TeacherProfile {
  name: string;
  school: string;
  district: string;
  schoolType: SchoolType;
  className: string;
}

export interface ChildProfile {
  code: string;
  ageYears: number;
  grade: Grade;
  sex: Sex;
  homeLanguage: string;
  medium: Lang | "other";
}

export interface ScreeningSession {
  id: string;
  protocolVersion: string;
  createdAt: string;
  completedAt?: string;
  uiLang: Lang;
  testLang: Lang;
  teacher: TeacherProfile;
  child: ChildProfile;
  consent: boolean;
  status: SessionStatus;
  trials: Trial[];
  practiceCorrect: number;
  theta: number;
  se: number;
  accuracy: number;
  band: RiskBand;
  notes: string;
}

export const PROTOCOL_VERSION = "ROAR-KA-pilot-2026.1";

export const MIN_TEST_ITEMS = 20;
export const MAX_TEST_ITEMS = 24;
export const SE_STOP = 0.5;
export const PRACTICE_N = 4;
