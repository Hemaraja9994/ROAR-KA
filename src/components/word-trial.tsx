import { t } from "@/lib/i18n";
import type { Item, Lang } from "@/lib/types";
import { cn } from "@/lib/utils";

export function WordTrial({
  item,
  testLang,
  uiLang,
  locked,
  onAnswer,
}: {
  item: Item;
  testLang: Lang;
  uiLang: Lang;
  locked: boolean;
  onAnswer: (real: boolean) => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 items-center justify-center px-4">
        <p
          key={item.id}
          className={cn(
            "word-swap max-w-full text-center text-5xl font-medium leading-tight tracking-tight text-ink sm:text-6xl",
            testLang === "kn" && "word-kn",
            testLang === "hi" && "word-hi",
            testLang === "en" && "word-en",
          )}
        >
          {item.text}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          disabled={locked}
          onClick={() => onAnswer(true)}
          className="flex min-h-24 flex-col items-center justify-center rounded-xl bg-coral px-3 text-surface shadow-[var(--shadow-border)] transition-transform duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-60"
        >
          <span className="text-lg font-semibold">{t(testLang, "test.real")}</span>
          {uiLang !== testLang ? (
            <span className="mt-1 text-xs text-surface/70">{t(uiLang, "test.real")}</span>
          ) : null}
        </button>
        <button
          type="button"
          disabled={locked}
          onClick={() => onAnswer(false)}
          className="flex min-h-24 flex-col items-center justify-center rounded-xl bg-surface px-3 text-ink shadow-[var(--shadow-border)] transition-transform duration-150 ease-out active:not-disabled:scale-[0.96] disabled:opacity-60"
        >
          <span className="text-lg font-semibold">{t(testLang, "test.pseudo")}</span>
          {uiLang !== testLang ? (
            <span className="mt-1 text-xs text-dust">{t(uiLang, "test.pseudo")}</span>
          ) : null}
        </button>
      </div>
    </div>
  );
}
