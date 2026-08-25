import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Printer, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea, Label } from "@/components/ui/input";
import { downloadText, trialLog } from "@/lib/export";
import { gradeLabel, t } from "@/lib/i18n";
import { meanRt } from "@/lib/scoring";
import { useApp } from "@/lib/store";
import type { RiskBand } from "@/lib/types";
import { cn, round } from "@/lib/utils";

export const Route = createFileRoute("/results/$id")({ component: ResultsPage });

const bandStyle: Record<RiskBand, string> = {
  typical: "bg-foam text-typical",
  watch: "bg-paper-2 text-watch",
  refer: "bg-paper-2 text-refer",
  inconclusive: "bg-paper-2 text-dust",
};

function ResultsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const session = useApp((s) => s.sessions.find((x) => x.id === id));
  const upsert = useApp((s) => s.upsertSession);
  const uiLang = useApp((s) => s.uiLang);

  if (!session) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-ink-soft">{t(uiLang, "records.empty")}</p>
        <Button className="mt-4" asChild>
          <Link to="/records">{t(uiLang, "nav.records")}</Link>
        </Button>
      </main>
    );
  }

  const band = session.band;
  const rt = meanRt(session.trials);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-teal">
        {t(uiLang, "app.name")} · {session.protocolVersion}
      </p>
      <h1 className="mt-2 font-display text-3xl font-medium">{t(uiLang, "results.title")}</h1>
      <p className="mt-1 text-ink-soft">
        {session.child.code} · {t(uiLang, "screen.grade")} {gradeLabel(uiLang, session.child.grade)} ·{" "}
        {t(uiLang, `lang.${session.testLang}`)}
      </p>

      <div
        className={cn(
          "mt-6 rounded-xl px-5 py-5 shadow-[var(--shadow-border)]",
          bandStyle[band],
        )}
      >
        <p className="text-xs font-medium uppercase tracking-widest opacity-80">
          {t(uiLang, "results.band")}
        </p>
        <h2 className="mt-1 font-display text-2xl font-medium">
          {t(uiLang, `results.${band === "typical" ? "typicalT" : band === "watch" ? "watchT" : band === "refer" ? "referT" : "incT"}`)}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed">
          {t(uiLang, `results.${band === "typical" ? "typicalB" : band === "watch" ? "watchB" : band === "refer" ? "referB" : "incB"}`)}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label={t(uiLang, "results.ability")} value={round(session.theta, 2).toFixed(2)} />
        <Stat
          label={t(uiLang, "results.se")}
          value={Number.isFinite(session.se) ? round(session.se, 2).toFixed(2) : "—"}
        />
        <Stat
          label={t(uiLang, "results.accuracy")}
          value={`${Math.round(session.accuracy * 100)}%`}
        />
        <Stat label={t(uiLang, "results.items")} value={String(session.trials.length)} />
      </div>
      <p className="mt-3 text-xs text-dust">
        {t(uiLang, "results.time")}: {Math.round(rt)} {t(uiLang, "common.ms")}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-dust">{t(uiLang, "results.thetaNote")}</p>

      <Card className="mt-6">
        <Label htmlFor="notes">{t(uiLang, "results.notes")}</Label>
        <Textarea
          id="notes"
          value={session.notes}
          placeholder={t(uiLang, "results.notesPh")}
          onChange={(e) => upsert({ ...session, notes: e.target.value })}
        />
      </Card>

      <div className="no-print mt-6 flex flex-wrap gap-3">
        <Button onClick={() => window.print()}>
          <Printer className="size-4" />
          {t(uiLang, "results.print")}
        </Button>
        <Button
          variant="secondary"
          onClick={() => downloadText(`${session.child.code}-trials.csv`, trialLog(session))}
        >
          <Download className="size-4" />
          {t(uiLang, "results.export")}
        </Button>
        <Button variant="outline" asChild>
          <Link to="/screen">
            <Plus className="size-4" />
            {t(uiLang, "results.again")}
          </Link>
        </Button>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-dust">{t(uiLang, "results.disclaimer")}</p>
      <p className="mt-3 text-xs text-dust">
        {session.teacher.name} · {session.teacher.school} ·{" "}
        {new Date(session.completedAt ?? session.createdAt).toLocaleString()}
      </p>
      <button
        type="button"
        className="no-print mt-6 text-sm text-dust underline"
        onClick={() => navigate({ to: "/records" })}
      >
        {t(uiLang, "nav.records")}
      </button>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface px-3 py-3 shadow-[var(--shadow-border)]">
      <p className="text-xs text-dust">{label}</p>
      <p className="mt-1 font-display text-2xl font-medium tabular-nums">{value}</p>
    </div>
  );
}
