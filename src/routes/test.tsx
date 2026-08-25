import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { WordTrial } from "@/components/word-trial";
import { Button } from "@/components/ui/button";
import { applyResponse, createCat, pickNext, shouldStop, type CatState } from "@/lib/cat";
import { t } from "@/lib/i18n";
import { getPractice, getTestBank } from "@/lib/items";
import { accuracyOf, bandFromTheta } from "@/lib/scoring";
import { useApp } from "@/lib/store";
import type { Item, ScreeningSession, Trial } from "@/lib/types";
import { MAX_TEST_ITEMS, MIN_TEST_ITEMS, SE_STOP } from "@/lib/types";

export const Route = createFileRoute("/test")({ component: TestPage });

type Phase = "intro" | "practice" | "ready" | "testing" | "feedback";

export function TestPage() {
  const navigate = useNavigate();
  const currentId = useApp((s) => s.currentId);
  const sessions = useApp((s) => s.sessions);
  const upsert = useApp((s) => s.upsertSession);
  const session = sessions.find((s) => s.id === currentId);

  const [phase, setPhase] = useState<Phase>("intro");
  const [pIndex, setPIndex] = useState(0);
  const [pCorrect, setPCorrect] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; item: Item } | null>(null);
  const [item, setItem] = useState<Item | null>(null);
  const [cat, setCat] = useState<CatState | null>(null);
  const [admin, setAdmin] = useState<Item[]>([]);
  const [answers, setAnswers] = useState<Array<0 | 1>>([]);
  const [locked, setLocked] = useState(false);
  const [stopOpen, setStopOpen] = useState(false);
  const startedAt = useRef(Date.now());

  const uiLang = session?.uiLang ?? "en";
  const testLang = session?.testLang ?? "en";
  const practice = session ? getPractice(session.testLang) : [];

  useEffect(() => {
    if (!session) {
      void navigate({ to: "/screen" });
    }
  }, [session, navigate]);

  useEffect(() => {
    startedAt.current = Date.now();
  }, [item, pIndex, phase]);

  if (!session) return null;
  const current = session;

  function finish(s: ScreeningSession, trials: Trial[], catNow: CatState, status: ScreeningSession["status"]) {
    const next: ScreeningSession = {
      ...s,
      status,
      trials,
      theta: catNow.theta,
      se: catNow.se,
      accuracy: accuracyOf(trials),
      band: bandFromTheta(catNow.theta, catNow.se, trials.length),
      completedAt: new Date().toISOString(),
      practiceCorrect: pCorrect,
    };
    upsert(next);
    void navigate({ to: "/results/$id", params: { id: s.id } });
  }

  function onPractice(real: boolean) {
    if (locked) return;
    const cur = practice[pIndex];
    const ok = real === cur.real;
    setLocked(true);
    setPCorrect((n) => n + (ok ? 1 : 0));
    setFeedback({ ok, item: cur });
    setPhase("feedback");
  }

  function nextPractice() {
    setLocked(false);
    setFeedback(null);
    if (pIndex + 1 >= practice.length) {
      setPhase("ready");
      return;
    }
    setPIndex((i) => i + 1);
    setPhase("practice");
  }

  function beginTest() {
    const bank = getTestBank(current.testLang);
    const state = createCat(bank);
    const first = pickNext(0, state.remaining, 0);
    setCat(state);
    setItem(first);
    setAdmin([]);
    setAnswers([]);
    setPhase("testing");
    upsert({ ...current, status: "testing" });
    startedAt.current = Date.now();
  }

  function onTest(real: boolean) {
    if (!item || !cat || locked) return;
    setLocked(true);
    const rt = Date.now() - startedAt.current;
    const correct = real === item.real;
    const nextCat = applyResponse(cat, admin, answers, item, correct);
    const nextAdmin = [...admin, item];
    const nextAns: Array<0 | 1> = [...answers, correct ? 1 : 0];
    const trial: Trial = {
      itemId: item.id,
      text: item.text,
      real: item.real,
      responseReal: real,
      correct,
      rtMs: rt,
      thetaAfter: nextCat.theta,
      seAfter: nextCat.se,
      index: nextAdmin.length,
    };
    const trials = [...current.trials, trial];
    upsert({ ...current, trials, theta: nextCat.theta, se: nextCat.se, status: "testing" });
    setCat(nextCat);
    setAdmin(nextAdmin);
    setAnswers(nextAns);

    if (shouldStop(nextCat.nItems, nextCat.se, MIN_TEST_ITEMS, MAX_TEST_ITEMS, SE_STOP)) {
      finish(current, trials, nextCat, "complete");
      return;
    }
    const nxt = pickNext(nextCat.theta, nextCat.remaining, nextCat.nItems);
    window.setTimeout(() => {
      setItem(nxt);
      setLocked(false);
      startedAt.current = Date.now();
    }, 180);
  }

  const progress =
    phase === "testing" && cat ? `${cat.nItems} ${t(uiLang, "common.of")} ${MAX_TEST_ITEMS}` : "";

  return (
    <div className="flex min-h-dvh flex-col bg-paper text-ink">
      <header className="flex items-center justify-between gap-3 px-4 py-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-dust">
            {phase === "testing" ? t(uiLang, "test.testing") : t(uiLang, "test.practiceTitle")}
          </p>
          <p className="text-sm text-ink-soft tabular-nums">{progress}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setStopOpen(true)}>
          {t(uiLang, "test.stop")}
        </Button>
      </header>

      {phase === "intro" ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <h1 className="font-display text-3xl font-medium">{t(uiLang, "test.practiceTitle")}</h1>
          <p className="mt-3 max-w-md text-ink-soft">{t(uiLang, "test.practiceLead")}</p>
          <p className="mt-4 max-w-md text-sm text-dust">{t(uiLang, "test.teacherHint")}</p>
          <Button className="mt-8" size="lg" onClick={() => setPhase("practice")}>
            {t(uiLang, "screen.start")}
          </Button>
        </div>
      ) : null}

      {phase === "practice" && practice[pIndex] ? (
        <>
          <p className="px-4 text-center text-sm text-dust">{t(uiLang, "test.teacherHint")}</p>
          <WordTrial
            item={practice[pIndex]}
            testLang={testLang}
            uiLang={uiLang}
            locked={locked}
            onAnswer={onPractice}
          />
        </>
      ) : null}

      {phase === "feedback" && feedback ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <p className="font-display text-3xl font-medium">
            {feedback.ok ? t(uiLang, "test.correct") : t(uiLang, "test.wrong")}
          </p>
          <p className="mt-3 text-ink-soft">
            {feedback.item.real ? t(uiLang, "test.realExplain") : t(uiLang, "test.pseudoExplain")}
          </p>
          <p
            className={`mt-6 text-4xl font-medium ${testLang === "kn" ? "word-kn" : testLang === "hi" ? "word-hi" : "word-en"}`}
          >
            {feedback.item.text}
          </p>
          <Button className="mt-8" size="lg" onClick={nextPractice}>
            {t(uiLang, "test.next")}
          </Button>
        </div>
      ) : null}

      {phase === "ready" ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <h1 className="font-display text-3xl font-medium">{t(uiLang, "test.practiceTitle")}</h1>
          <p className="mt-3 max-w-md text-ink-soft">{t(uiLang, "test.practiceLead")}</p>
          <Button className="mt-8" size="lg" onClick={beginTest}>
            {t(uiLang, "test.begin")}
          </Button>
        </div>
      ) : null}

      {phase === "testing" && item ? (
        <WordTrial
          item={item}
          testLang={testLang}
          uiLang={uiLang}
          locked={locked}
          onAnswer={onTest}
        />
      ) : null}

      {stopOpen ? (
        <div className="fixed inset-0 z-40 grid place-items-center bg-ink/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-surface p-5 shadow-[var(--shadow-border)]">
            <h2 className="font-display text-xl font-medium">{t(uiLang, "test.stopTitle")}</h2>
            <p className="mt-2 text-sm text-ink-soft">{t(uiLang, "test.stopBody")}</p>
            <div className="mt-5 flex flex-col gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  if (cat) finish(current, current.trials, cat, "abandoned");
                  else void navigate({ to: "/records" });
                }}
              >
                {t(uiLang, "test.savePartial")}
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  useApp.getState().deleteSession(current.id);
                  void navigate({ to: "/" });
                }}
              >
                {t(uiLang, "test.discard")}
              </Button>
              <Button variant="ghost" onClick={() => setStopOpen(false)}>
                {t(uiLang, "test.stay")}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
