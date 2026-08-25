import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import type { Lang } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

function Mark() {
  return (
    <span className="grid size-8 place-items-center rounded-sm bg-teal font-display text-lg font-medium text-paper">
      ಕ
    </span>
  );
}

const LANGS: Lang[] = ["kn", "en", "hi"];

export function AppShell({ children }: { children: ReactNode }) {
  const uiLang = useApp((s) => s.uiLang);
  const setUiLang = useApp((s) => s.setUiLang);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideNav = pathname === "/test";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { to: "/", label: t(uiLang, "nav.home") },
    { to: "/screen", label: t(uiLang, "nav.screen") },
    { to: "/records", label: t(uiLang, "nav.records") },
    { to: "/protocol", label: t(uiLang, "nav.protocol") },
    { to: "/about", label: t(uiLang, "nav.about") },
  ] as const;

  if (hideNav) return <>{children}</>;

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <nav className="no-print sticky top-0 z-30 border-b border-rule/80 bg-paper/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <Mark />
            <span className="font-display text-lg font-medium tracking-tight">
              {t(uiLang, "app.name")}
            </span>
          </Link>
          <div className="ml-auto hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-sm px-3 py-2 text-sm text-ink-soft transition-colors duration-150 hover:text-ink",
                  pathname === l.to && "bg-paper-2 text-ink",
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1 md:ml-3">
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setUiLang(l)}
                className={cn(
                  "h-9 min-w-9 rounded-sm px-2 text-xs font-medium uppercase tracking-wide",
                  uiLang === l ? "bg-teal text-paper" : "text-dust hover:bg-paper-2 hover:text-ink",
                )}
                aria-pressed={uiLang === l}
              >
                {l}
              </button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
        {open ? (
          <div className="border-t border-rule px-4 py-2 md:hidden">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="block rounded-sm px-3 py-3 text-sm text-ink-soft"
              >
                {l.label}
              </Link>
            ))}
          </div>
        ) : null}
      </nav>
      {children}
    </div>
  );
}
