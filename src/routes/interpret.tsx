import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenCheck, MessageCircle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHero, StepMark } from "@/components/ribbons";
import { INTERPRET_FLAGS, bandClass, bandTitleKey, bandBodyKey } from "@/lib/bands";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/interpret")({ component: InterpretPage });

function InterpretPage() {
  const uiLang = useApp((s) => s.uiLang);

  return (
    <div>
      <PageHero
        kicker={t(uiLang, "interpret.kicker")}
        title={t(uiLang, "interpret.title")}
        lead={t(uiLang, "interpret.lead")}
      />
      <main className="enter mx-auto max-w-5xl px-4 py-10">
        <p className="max-w-3xl text-sm leading-relaxed text-ink-soft">{t(uiLang, "interpret.notDx")}</p>

        <h2 className="mt-10 font-display text-2xl font-medium">{t(uiLang, "interpret.flags")}</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {INTERPRET_FLAGS.map((flag, i) => (
            <Card key={flag.band} className={cn("lift flex flex-col gap-3 p-5", bandClass(flag.band))}>
              <StepMark n={i + 1} />
              <h3 className="font-display text-xl font-medium">{t(uiLang, bandTitleKey(flag.band))}</h3>
              <p className="text-sm leading-relaxed opacity-90">{t(uiLang, bandBodyKey(flag.band))}</p>
            </Card>
          ))}
        </div>

        <h2 className="mt-12 font-display text-2xl font-medium">{t(uiLang, "interpret.matrixTitle")}</h2>
        <p className="mt-2 max-w-3xl text-sm text-ink-soft">{t(uiLang, "interpret.matrixLead")}</p>
        <div className="mt-5 overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-border)]">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead>
              <tr className="bg-navy text-surface">
                <th className="px-4 py-3 font-medium">{t(uiLang, "interpret.matrixTitle")}</th>
                <th className="px-3 py-3 font-medium">{t(uiLang, "interpret.col0")}</th>
                <th className="px-3 py-3 font-medium">{t(uiLang, "interpret.col1")}</th>
                <th className="px-3 py-3 font-medium">{t(uiLang, "interpret.col2")}</th>
                <th className="px-3 py-3 font-medium">{t(uiLang, "interpret.col3")}</th>
              </tr>
            </thead>
            <tbody>
              <MatrixRow
                label={t(uiLang, "interpret.row1")}
                cells={["low", "low", "mid", "high"]}
                low={t(uiLang, "interpret.shortTypical")}
                mid={t(uiLang, "interpret.shortWatch")}
                high={t(uiLang, "interpret.shortRefer")}
              />
              <MatrixRow
                label={t(uiLang, "interpret.row2")}
                cells={["low", "mid", "mid", "high"]}
                low={t(uiLang, "interpret.shortTypical")}
                mid={t(uiLang, "interpret.shortWatch")}
                high={t(uiLang, "interpret.shortRefer")}
              />
              <MatrixRow
                label={t(uiLang, "interpret.row3")}
                cells={["low", "mid", "high", "high"]}
                low={t(uiLang, "interpret.shortTypical")}
                mid={t(uiLang, "interpret.shortWatch")}
                high={t(uiLang, "interpret.shortRefer")}
              />
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-ink-soft">
          <Legend swatch="bg-purple" label={t(uiLang, "interpret.shortTypical")} />
          <Legend swatch="bg-navy" label={t(uiLang, "interpret.shortWatch")} />
          <Legend swatch="bg-coral" label={t(uiLang, "interpret.shortRefer")} />
        </div>

        <h2 className="mt-12 font-display text-2xl font-medium">{t(uiLang, "interpret.doTitle")}</h2>
        <div className="mt-5 space-y-4">
          {INTERPRET_FLAGS.map((flag) => (
            <Card key={flag.band} className="p-5 sm:p-6">
              <p className={cn("inline-flex rounded-sm px-2 py-1 text-xs font-medium", bandClass(flag.band))}>
                {t(uiLang, bandTitleKey(flag.band))}
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Quote icon={BookOpenCheck} label={t(uiLang, "results.thisWeek")} text={t(uiLang, flag.doKey)} />
                <Quote icon={MessageCircle} label={t(uiLang, "results.sayChild")} text={t(uiLang, flag.childKey)} />
                <Quote icon={MessageCircle} label={t(uiLang, "results.sayParent")} text={t(uiLang, flag.parentKey)} />
                <Quote icon={ShieldAlert} label={t(uiLang, "results.dontSay")} text={t(uiLang, flag.dontKey)} />
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card>
            <h2 className="font-display text-xl font-medium">{t(uiLang, "interpret.thetaTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(uiLang, "interpret.thetaBody")}</p>
          </Card>
          <Card>
            <h2 className="font-display text-xl font-medium">{t(uiLang, "interpret.seTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(uiLang, "interpret.seBody")}</p>
          </Card>
          <Card>
            <h2 className="font-display text-xl font-medium">{t(uiLang, "interpret.slowTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(uiLang, "interpret.slowBody")}</p>
          </Card>
          <Card>
            <h2 className="font-display text-xl font-medium">{t(uiLang, "interpret.guessTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(uiLang, "interpret.guessBody")}</p>
          </Card>
        </div>

        <Card className="mt-4">
          <h2 className="font-display text-xl font-medium">{t(uiLang, "interpret.whenTitle")}</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(uiLang, "interpret.whenBody")}</p>
        </Card>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <Link to="/screen">
              {t(uiLang, "home.cta")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/protocol">{t(uiLang, "nav.protocol")}</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

function Quote({
  icon: Icon,
  label,
  text,
}: {
  icon: typeof BookOpenCheck;
  label: string;
  text: string;
}) {
  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-dust">
        <Icon className="size-3.5 text-coral" strokeWidth={2} />
        {label}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{text}</p>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={cn("size-3 rounded-full", swatch)} />
      {label}
    </span>
  );
}

function MatrixRow({
  label,
  cells,
  low,
  mid,
  high,
}: {
  label: string;
  cells: Array<"low" | "mid" | "high">;
  low: string;
  mid: string;
  high: string;
}) {
  const copy = { low, mid, high };
  return (
    <tr className="border-t border-rule">
      <th className="px-4 py-3 font-medium text-ink">{label}</th>
      {cells.map((c, i) => (
        <td key={i} className="px-3 py-3">
          <span
            className={cn(
              "inline-flex min-h-11 min-w-full items-center justify-center rounded-md px-2 text-center text-xs font-medium leading-tight text-surface",
              c === "low" && "bg-purple",
              c === "mid" && "bg-navy",
              c === "high" && "bg-coral",
            )}
          >
            {copy[c]}
          </span>
        </td>
      ))}
    </tr>
  );
}
