import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/ribbons";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  const uiLang = useApp((s) => s.uiLang);
  return (
    <div>
      <PageHero kicker={t(uiLang, "app.place")} title={t(uiLang, "about.title")} />
      <main className="enter mx-auto max-w-3xl px-4 py-8">
      <Card className="mt-6">
        <h2 className="font-display text-xl font-medium">{t(uiLang, "about.frame")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t(uiLang, "about.frameBody")}</p>
      </Card>

      <Card className="mt-4">
        <h2 className="font-display text-xl font-medium">{t(uiLang, "about.cite")}</h2>
        <blockquote className="mt-3 border-l-2 border-coral pl-4 text-sm leading-relaxed text-ink-soft">
          Ma, W. A., Richie-Halford, A., Burkhardt, A. K., Kanopka, K., Chou, C., Domingue, B. W.,
          & Yeatman, J. D. (2025). ROAR-CAT: Rapid Online Assessment of Reading ability with
          Computerized Adaptive Testing. <em>Behavior Research Methods, 57</em>(1), 1–17.{" "}
          <a className="text-coral underline" href="https://doi.org/10.3758/s13428-024-02578-y">
            doi.org/10.3758/s13428-024-02578-y
          </a>
        </blockquote>
        <p className="mt-4 text-sm text-ink-soft">{t(uiLang, "about.jscat")}</p>
        <p className="mt-2 text-xs text-dust">
          jsCAT © 2023 Wanjing Anya Ma, Adam Richie-Halford. MIT License. Source:{" "}
          <a className="underline" href="https://github.com/yeatmanlab/jsCAT">
            github.com/yeatmanlab/jsCAT
          </a>
          . This project’s copy:{" "}
          <a className="underline" href="https://github.com/Hemaraja9994/Reading-Screening-Test">
            Hemaraja9994/Reading-Screening-Test
          </a>
          .
        </p>
      </Card>

      <Card className="mt-4">
        <h2 className="font-display text-xl font-medium">{t(uiLang, "about.ka")}</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t(uiLang, "about.kaBody")}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t(uiLang, "about.notOfficial")}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t(uiLang, "about.privacy")}</p>
      </Card>
    </main>
    </div>
  );
}
