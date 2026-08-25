import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock3, Shield } from "lucide-react";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const uiLang = useApp((s) => s.uiLang);
  const setTeacher = useApp((s) => s.setTeacher);

  function fillDemo() {
    setTeacher({
      name: "Ms. Rashmi (demo)",
      school: "Bengaluru Pilot School",
      district: "bengaluru-urban",
      schoolType: "government",
      className: "3 A",
    });
  }

  return (
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:pt-12">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-teal">
        {t(uiLang, "home.kicker")}
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
        {t(uiLang, "home.title")}
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-ink-soft">{t(uiLang, "home.lead")}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button size="lg" asChild>
          <Link to="/screen">
            {t(uiLang, "home.cta")}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button size="lg" variant="secondary" asChild>
          <Link to="/screen" onClick={fillDemo}>
            {t(uiLang, "home.demo")}
          </Link>
        </Button>
      </div>

      <p className="mt-10 font-display text-3xl font-medium tracking-tight text-teal sm:text-4xl">
        ಓದು <span className="text-rule">·</span> Read <span className="text-rule">·</span> पढ़ो
      </p>

      <figure className="mt-8 overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
        <div className="border-b border-rule px-4 py-2 text-xs font-medium uppercase tracking-widest text-dust">
          {t(uiLang, "test.practiceTitle")} · ಕನ್ನಡ
        </div>
        <div className="px-4 py-10 text-center">
          <p className="word-kn text-5xl font-medium tracking-tight sm:text-6xl">ಮನೆ</p>
        </div>
        <div className="grid grid-cols-2 gap-px bg-rule">
          <div className="bg-teal px-3 py-5 text-center text-paper">
            <p className="font-semibold">{t(uiLang, "test.real")}</p>
          </div>
          <div className="bg-paper-2 px-3 py-5 text-center text-ink">
            <p className="font-semibold">{t(uiLang, "test.pseudo")}</p>
          </div>
        </div>
      </figure>

      <div className="mt-12 grid gap-3 sm:grid-cols-3">
        <Card className="flex gap-3 p-4 sm:block sm:p-5">
          <BookOpen className="mt-0.5 size-5 shrink-0 text-teal" strokeWidth={1.75} />
          <div>
            <h2 className="font-display text-lg font-medium sm:mt-3 sm:text-xl">{t(uiLang, "home.how1t")}</h2>
            <p className="mt-1 text-sm text-ink-soft sm:mt-2">{t(uiLang, "home.how1b")}</p>
          </div>
        </Card>
        <Card className="flex gap-3 p-4 sm:block sm:p-5">
          <Clock3 className="mt-0.5 size-5 shrink-0 text-teal" strokeWidth={1.75} />
          <div>
            <h2 className="font-display text-lg font-medium sm:mt-3 sm:text-xl">{t(uiLang, "home.how2t")}</h2>
            <p className="mt-1 text-sm text-ink-soft sm:mt-2">{t(uiLang, "home.how2b")}</p>
          </div>
        </Card>
        <Card className="flex gap-3 p-4 sm:block sm:p-5">
          <Shield className="mt-0.5 size-5 shrink-0 text-teal" strokeWidth={1.75} />
          <div>
            <h2 className="font-display text-lg font-medium sm:mt-3 sm:text-xl">{t(uiLang, "home.how3t")}</h2>
            <p className="mt-1 text-sm text-ink-soft sm:mt-2">{t(uiLang, "home.how3b")}</p>
          </div>
        </Card>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <Card>
          <h2 className="font-display text-xl font-medium">{t(uiLang, "home.for")}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(uiLang, "home.forBody")}</p>
        </Card>
        <Card>
          <h2 className="font-display text-xl font-medium">{t(uiLang, "home.keep")}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(uiLang, "home.keepBody")}</p>
        </Card>
      </div>

      <p className="mt-8 text-sm text-dust">{t(uiLang, "home.notDx")}</p>
      <p className="mt-4 max-w-3xl text-xs leading-relaxed text-dust">{t(uiLang, "home.credit")}</p>
    </main>
  );
}
