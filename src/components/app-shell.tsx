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
    <span className="grid size-8 place-items-center rounded-md bg-coral font-display text-lg font-medium text-surface">
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
    { to: "/interpret", label: t(uiLang, "nav.interpret") },
    { to: "/about", label: t(uiLang, "nav.about") },
  ] as const;

  if (hideNav) return <>{children}</>;

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <nav className="no-print sticky top-0 z-30 bg-navy text-surface">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <Mark />
            <span className="font-display text-lg font-medium tracking-tight">{t(uiLang, "app.name")}</span>
          </Link>
          <div className="ml-auto hidden items-center gap-0.5 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "rounded-md px-2.5 py-2 text-sm text-surface/75 transition-colors duration-150 hover:text-surface",
                  pathname === l.to && "bg-surface/10 text-surface",
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1 lg:ml-3">
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setUiLang(l)}
                className={cn(
                  "h-9 min-w-9 rounded-md px-2 text-xs font-medium uppercase tracking-wide transition-colors duration-150",
                  uiLang === l ? "bg-coral text-surface" : "text-surface/70 hover:bg-surface/10 hover:text-surface",
                )}
                aria-pressed={uiLang === l}
              >
                {l}
              </button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="text-surface hover:bg-surface/10 hover:text-surface lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
        {open ? (
          <div className="border-t border-surface/10 px-4 py-2 lg:hidden">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "block rounded-md px-3 py-3 text-sm text-surface/80",
                  pathname === l.to && "bg-surface/10 text-surface",
                )}
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
