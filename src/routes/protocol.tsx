import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHero, StepMark } from "@/components/ribbons";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/protocol")({ component: ProtocolPage });

function ProtocolPage() {
  const uiLang = useApp((s) => s.uiLang);
  const steps = [
    ["protocol.s1t", "protocol.s1b"],
    ["protocol.s2t", "protocol.s2b"],
    ["protocol.s3t", "protocol.s3b"],
    ["protocol.s4t", "protocol.s4b"],
    ["protocol.s5t", "protocol.s5b"],
  ] as const;
  const dos = ["protocol.do1", "protocol.do2", "protocol.do3"] as const;
  const donts = ["protocol.dont1", "protocol.dont2", "protocol.dont3"] as const;

  return (
    <div>
      <PageHero
        kicker={t(uiLang, "app.place")}
        title={t(uiLang, "protocol.title")}
        lead={t(uiLang, "protocol.lead")}
      />
      <main className="enter mx-auto max-w-3xl px-4 py-8">
        <ol className="space-y-3">
          {steps.map(([ht, hb], i) => (
            <li key={ht}>
              <Card className="lift flex gap-4 p-5">
                <StepMark n={i + 1} />
                <div>
                  <h2 className="font-display text-xl font-medium">{t(uiLang, ht)}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(uiLang, hb)}</p>
                </div>
              </Card>
            </li>
          ))}
        </ol>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <h2 className="font-display text-xl font-medium text-purple">{t(uiLang, "protocol.do")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {dos.map((k) => (
                <li key={k}>{t(uiLang, k)}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="font-display text-xl font-medium text-refer">{t(uiLang, "protocol.dont")}</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {donts.map((k) => (
                <li key={k}>{t(uiLang, k)}</li>
              ))}
            </ul>
          </Card>
        </div>
        <Button className="mt-8" size="lg" asChild>
          <Link to="/interpret">
            {t(uiLang, "home.interpretCta")}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </main>
    </div>
  );
}
