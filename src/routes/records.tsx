import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/ribbons";
import { downloadText, sessionsToCsv } from "@/lib/export";
import { gradeLabel, t } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { cn, round } from "@/lib/utils";

export const Route = createFileRoute("/records")({ component: RecordsPage });

function RecordsPage() {
  const uiLang = useApp((s) => s.uiLang);
  const sessions = useApp((s) => s.sessions);
  const del = useApp((s) => s.deleteSession);
  const clear = useApp((s) => s.clearAll);

  return (
    <div>
      <PageHero kicker={t(uiLang, "app.place")} title={t(uiLang, "records.title")} />
      <main className="enter mx-auto max-w-3xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <p className="text-sm text-dust">{sessions.length}</p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            disabled={sessions.length === 0}
            onClick={() => downloadText("roar-ka-pilot.csv", sessionsToCsv(sessions))}
          >
            <Download className="size-4" />
            {t(uiLang, "records.export")}
          </Button>
          <Button
            variant="outline"
            disabled={sessions.length === 0}
            onClick={() => {
              if (window.confirm(t(uiLang, "records.clearAsk"))) clear();
            }}
          >
            <Trash2 className="size-4" />
            {t(uiLang, "records.clear")}
          </Button>
        </div>
      </div>

      {sessions.length === 0 ? (
        <Card className="mt-8 text-center text-ink-soft">
          <p>{t(uiLang, "records.empty")}</p>
          <Button className="mt-4" asChild>
            <Link to="/screen">{t(uiLang, "nav.screen")}</Link>
          </Button>
        </Card>
      ) : (
        <ul className="mt-6 space-y-3">
          {sessions.map((s) => (
            <li key={s.id}>
              <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{s.child.code}</p>
                  <p className="text-sm text-dust">
                    {gradeLabel(uiLang, s.child.grade)} · {t(uiLang, `lang.${s.testLang}`)} ·{" "}
                    {new Date(s.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={cn(
                    "self-start rounded-md px-2 py-1 text-xs font-medium",
                    s.band === "typical" && "bg-flag-low text-typical",
                    s.band === "watch" && "bg-flag-mid text-watch",
                    s.band === "refer" && "bg-flag-high text-refer",
                    s.band === "inconclusive" && "bg-paper-2 text-dust",                  )}
                >
                  {s.band} · θ {round(s.theta, 1)}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" asChild>
                    <Link to="/results/$id" params={{ id: s.id }}>
                      {t(uiLang, "records.open")}
                    </Link>
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => del(s.id)}>
                    {t(uiLang, "records.delete")}
                  </Button>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </main>
    </div>
  );
}
