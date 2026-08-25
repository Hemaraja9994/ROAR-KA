import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Label, Select } from "@/components/ui/input";
import { KARNATAKA_DISTRICTS, HOME_LANGUAGES } from "@/lib/districts";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import type { Grade, Lang, SchoolType, ScreeningSession, Sex } from "@/lib/types";
import { PROTOCOL_VERSION } from "@/lib/types";
import { uid } from "@/lib/utils";

export const Route = createFileRoute("/screen")({ component: ScreenForm });

const GRADES: Grade[] = ["lkg", "ukg", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

function ScreenForm() {
  const uiLang = useApp((s) => s.uiLang);
  const teacher = useApp((s) => s.teacher);
  const setTeacher = useApp((s) => s.setTeacher);
  const upsert = useApp((s) => s.upsertSession);
  const navigate = useNavigate();

  const [childCode, setChildCode] = useState("");
  const [age, setAge] = useState("8");
  const [grade, setGrade] = useState<Grade>("3");
  const [sex, setSex] = useState<Sex>("unspecified");
  const [homeLanguage, setHomeLanguage] = useState("kannada");
  const [medium, setMedium] = useState<Lang | "other">("kn");
  const [testLang, setTestLang] = useState<Lang>("kn");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  function start(demo = false) {
    const name = demo ? t(uiLang, "common.demoChild") : childCode.trim();
    if (!demo && (!teacher.name.trim() || !teacher.school.trim() || !name || !age)) {
      setError(t(uiLang, "screen.needFields"));
      return;
    }
    if (!demo && !consent) {
      setError(t(uiLang, "screen.needConsent"));
      return;
    }
    const session: ScreeningSession = {
      id: uid("scr"),
      protocolVersion: PROTOCOL_VERSION,
      createdAt: new Date().toISOString(),
      uiLang,
      testLang: demo ? uiLang : testLang,
      teacher: demo
        ? {
            name: teacher.name || "Demo teacher",
            school: teacher.school || "Demo school",
            district: teacher.district || "bengaluru-urban",
            schoolType: teacher.schoolType,
            className: teacher.className || "3 A",
          }
        : teacher,
      child: {
        code: name || t(uiLang, "common.demoChild"),
        ageYears: Number(age) || 8,
        grade,
        sex,
        homeLanguage,
        medium,
      },
      consent: demo ? true : consent,
      status: "practice",
      trials: [],
      practiceCorrect: 0,
      theta: 0,
      se: Number.POSITIVE_INFINITY,
      accuracy: 0,
      band: "inconclusive",
      notes: "",
    };
    upsert(session);
    void navigate({ to: "/test" });
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-3xl font-medium">{t(uiLang, "screen.title")}</h1>
      <p className="mt-2 text-ink-soft">{t(uiLang, "screen.lead")}</p>

      <Card className="mt-6">
        <h2 className="font-display text-xl font-medium">{t(uiLang, "screen.teacher")}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="tn">{t(uiLang, "screen.teacherName")}</Label>
            <Input
              id="tn"
              value={teacher.name}
              onChange={(e) => setTeacher({ name: e.target.value })}
              autoComplete="name"
            />
          </div>
          <div>
            <Label htmlFor="sc">{t(uiLang, "screen.school")}</Label>
            <Input id="sc" value={teacher.school} onChange={(e) => setTeacher({ school: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="di">{t(uiLang, "screen.district")}</Label>
            <Select
              id="di"
              value={teacher.district}
              onChange={(e) => setTeacher({ district: e.target.value })}
            >
              {KARNATAKA_DISTRICTS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d[uiLang]}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="st">{t(uiLang, "screen.schoolType")}</Label>
            <Select
              id="st"
              value={teacher.schoolType}
              onChange={(e) => setTeacher({ schoolType: e.target.value as SchoolType })}
            >
              {(["government", "aided", "private", "other"] as const).map((k) => (
                <option key={k} value={k}>
                  {t(uiLang, `type.${k}`)}
                </option>
              ))}
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="cl">{t(uiLang, "screen.className")}</Label>
            <Input
              id="cl"
              value={teacher.className}
              onChange={(e) => setTeacher({ className: e.target.value })}
              placeholder="3 A"
            />
          </div>
        </div>
      </Card>

      <Card className="mt-4">
        <h2 className="font-display text-xl font-medium">{t(uiLang, "screen.child")}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="cc">{t(uiLang, "screen.childName")}</Label>
            <Input id="cc" value={childCode} onChange={(e) => setChildCode(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="age">{t(uiLang, "screen.age")}</Label>
            <Input
              id="age"
              type="number"
              min={5}
              max={16}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="gr">{t(uiLang, "screen.grade")}</Label>
            <Select id="gr" value={grade} onChange={(e) => setGrade(e.target.value as Grade)}>
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g === "lkg" || g === "ukg" ? t(uiLang, `grade.${g}`) : g}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="sx">{t(uiLang, "screen.sex")}</Label>
            <Select id="sx" value={sex} onChange={(e) => setSex(e.target.value as Sex)}>
              {(["girl", "boy", "unspecified"] as const).map((k) => (
                <option key={k} value={k}>
                  {t(uiLang, `sex.${k}`)}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="hl">{t(uiLang, "screen.homeLang")}</Label>
            <Select id="hl" value={homeLanguage} onChange={(e) => setHomeLanguage(e.target.value)}>
              {HOME_LANGUAGES.map((h) => (
                <option key={h.id} value={h.id}>
                  {h[uiLang]}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="md">{t(uiLang, "screen.medium")}</Label>
            <Select
              id="md"
              value={medium}
              onChange={(e) => setMedium(e.target.value as Lang | "other")}
            >
              {(["kn", "en", "hi", "other"] as const).map((k) => (
                <option key={k} value={k}>
                  {t(uiLang, `lang.${k}`)}
                </option>
              ))}
            </Select>
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="tl">{t(uiLang, "screen.testLang")}</Label>
            <Select id="tl" value={testLang} onChange={(e) => setTestLang(e.target.value as Lang)}>
              {(["kn", "en", "hi"] as const).map((k) => (
                <option key={k} value={k}>
                  {t(uiLang, `lang.${k}`)}
                </option>
              ))}
            </Select>
            <p className="mt-1.5 text-xs text-dust">{t(uiLang, "screen.testLangHint")}</p>
          </div>
        </div>

        <label className="mt-5 flex items-start gap-3 text-sm text-ink-soft">
          <input
            type="checkbox"
            className="mt-1 size-4 accent-teal"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <span>{t(uiLang, "screen.consent")}</span>
        </label>
      </Card>

      {error ? <p className="mt-4 text-sm text-refer">{error}</p> : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <Button size="lg" onClick={() => start(false)}>
          {t(uiLang, "screen.start")}
        </Button>
        <Button size="lg" variant="secondary" onClick={() => start(true)}>
          {t(uiLang, "home.demo")}
        </Button>
      </div>
    </main>
  );
}
