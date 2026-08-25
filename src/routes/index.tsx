import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ribbons, StepMark } from "@/components/ribbons";
import { INTERPRET_FLAGS, bandClass, bandTitleKey, bandBodyKey } from "@/lib/bands";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const uiLang = useApp((s) => s.uiLang);
  const setTeacher = useApp((s) => s.setTeacher);

  function fillDemo() {
    setTeacher({
      name: "Demo teacher",
      school: "Bengaluru Pilot School",
      district: "bengaluru-urban",
      schoolType: "government",
      className: "3 A",
    });
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-navy text-surface">
        <Ribbons />
        <div className="enter relative mx-auto max-w-5xl px-4 pb-16 pt-12 sm:pb-20 sm:pt-16">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-coral">
            {t(uiLang, "home.kicker")}
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
            {t(uiLang, "home.title")}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-surface/80">{t(uiLang, "home.lead")}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/screen">
                {t(uiLang, "home.cta")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="border border-surface/20 bg-surface/10 text-surface hover:bg-surface/20"
              asChild
            >
              <Link to="/screen" onClick={fillDemo}>
                {t(uiLang, "home.demo")}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-surface hover:bg-surface/10 hover:text-surface"
              asChild
            >
              <Link to="/interpret">{t(uiLang, "home.interpretCta")}</Link>
            </Button>
          </div>

          <p className="mt-12 font-display text-3xl font-medium tracking-tight sm:text-4xl">
            ಓದು <span className="text-coral">·</span> Read <span className="text-magenta">·</span> पढ़ो
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-12">
        <figure className="lift overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-border)]">
          <div className="flex items-center justify-between border-b border-rule px-4 py-2 text-xs font-medium uppercase tracking-widest text-dust">
            <span>
              {t(uiLang, "test.practiceTitle")} · ಕನ್ನಡ
            </span>
            <span>{t(uiLang, "home.min")}</span>
          </div>
          <div className="px-4 py-10 text-center">
            <p className="word-kn word-swap text-5xl font-medium tracking-tight sm:text-6xl">ಮನೆ</p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-rule">
            <div className="bg-coral px-3 py-5 text-center text-surface">
              <p className="font-semibold">{t(uiLang, "test.real")}</p>
            </div>
            <div className="bg-paper-2 px-3 py-5 text-center text-ink">
              <p className="font-semibold">{t(uiLang, "test.pseudo")}</p>
            </div>
          </div>
        </figure>

        <div className="mt-12 grid gap-3 sm:grid-cols-3">
          {(
            [
              ["home.how1t", "home.how1b"],
              ["home.how2t", "home.how2b"],
              ["home.how3t", "home.how3b"],
            ] as const
          ).map(([keyT, keyB], i) => (
            <Card key={keyT} className="lift flex gap-3 p-4 sm:block sm:p-5">
              <StepMark n={i + 1} />
              <div>
                <h2 className="font-display text-lg font-medium sm:mt-4 sm:text-xl">{t(uiLang, keyT)}</h2>
                <p className="mt-1 text-sm text-ink-soft sm:mt-2">{t(uiLang, keyB)}</p>
              </div>
            </Card>
          ))}
        </div>

        <h2 className="mt-14 font-display text-2xl font-medium">{t(uiLang, "home.flagTitle")}</h2>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {INTERPRET_FLAGS.map((flag) => (
            <Link key={flag.band} to="/interpret" className="block">
              <Card className={cn("lift h-full p-5", bandClass(flag.band))}>
                <h3 className="font-display text-xl font-medium">{t(uiLang, bandTitleKey(flag.band))}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-90">{t(uiLang, bandBodyKey(flag.band))}</p>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card className="lift">
            <h2 className="font-display text-xl font-medium">{t(uiLang, "home.for")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(uiLang, "home.forBody")}</p>
          </Card>
          <Card className="lift">
            <h2 className="font-display text-xl font-medium">{t(uiLang, "home.keep")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(uiLang, "home.keepBody")}</p>
          </Card>
        </div>

        <p className="mt-8 text-sm text-dust">{t(uiLang, "home.notDx")}</p>
        <p className="mt-4 max-w-3xl text-xs leading-relaxed text-dust">{t(uiLang, "home.credit")}</p>
      </main>
    </div>
  );
}
