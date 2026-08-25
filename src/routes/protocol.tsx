import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
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
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="font-display text-3xl font-medium">{t(uiLang, "protocol.title")}</h1>
      <p className="mt-2 text-ink-soft">{t(uiLang, "protocol.lead")}</p>
      <ol className="mt-8 space-y-3">
        {steps.map(([ht, hb]) => (
          <li key={ht}>
            <Card className="p-5">
              <h2 className="font-display text-xl font-medium">{t(uiLang, ht)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t(uiLang, hb)}</p>
            </Card>
          </li>
        ))}
      </ol>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Card>
          <h2 className="font-display text-xl font-medium text-typical">{t(uiLang, "protocol.do")}</h2>
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
    </main>
  );
}
