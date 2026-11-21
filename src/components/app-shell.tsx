import { Link, Navigate, useRouterState } from "@tanstack/react-router";
import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";
import { LANGS, NATIVE_NAME, type Lang } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

/** Pages a signed-out visitor may open. Everything else needs a teacher login. */
const PUBLIC_PATHS = new Set(["/login", "/signup"]);

function Mark() {
  return (
    <span className="grid size-8 place-items-center rounded-md bg-coral font-display text-lg font-medium text-surface">
      ಕ
    </span>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const uiLang = useApp((s) => s.uiLang);
  const setUiLang = useApp((s) => s.setUiLang);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideNav = pathname === "/test";
  const [open, setOpen] = useState(false);
  const { user, isPending } = useCurrentUserState();
  const isPublic = PUBLIC_PATHS.has(pathname);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Login gate: wait for the session, then send signed-out visitors to /login
  // and signed-in visitors away from the login/sign-up pages.
  if (isPending) {
    return (
      <div
        className="grid min-h-dvh place-items-center bg-paper"
        role="status"
        aria-label={t(uiLang, "auth.loading")}
      >
        <span className="size-8 animate-pulse rounded-md bg-coral/70" />
      </div>
    );
  }
  if (!user && !isPublic) return <Navigate to="/login" />;
  if (user && isPublic) return <Navigate to="/" />;

  function doSignOut() {
    setSigningOut(true);
    void signOut("/login").catch(() => setSigningOut(false));
  }

  const links = [
    { to: "/", label: t(uiLang, "nav.home") },
    { to: "/screen", label: t(uiLang, "nav.screen") },
    { to: "/records", label: t(uiLang, "nav.records") },
    { to: "/protocol", label: t(uiLang, "nav.protocol") },
    { to: "/interpret", label: t(uiLang, "nav.interpret") },
    { to: "/about", label: t(uiLang, "nav.about") },
  ] as const;

  if (hideNav) return <>{children}</>;
  const navLinks = user ? links : [];

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <nav className="no-print sticky top-0 z-30 bg-navy text-surface">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <Mark />
            <span className="font-display text-lg font-medium tracking-tight">
              {t(uiLang, "app.name")}
            </span>
          </Link>
          <div className="ml-auto hidden items-center gap-0.5 lg:flex">
            {navLinks.map((l) => (
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
            <label className="sr-only" htmlFor="ui-lang">
              Language
            </label>
            <select
              id="ui-lang"
              value={uiLang}
              onChange={(e) => setUiLang(e.target.value as Lang)}
              className="h-9 rounded-md bg-surface/10 px-2 text-sm font-medium text-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral [&>option]:text-ink"
            >
              {LANGS.map((l) => (
                <option key={l} value={l}>
                  {NATIVE_NAME[l]}
                </option>
              ))}
            </select>
            {user ? (
              <button
                type="button"
                onClick={doSignOut}
                disabled={signingOut}
                title={user.primaryEmail ?? undefined}
                className="hidden h-9 items-center gap-1.5 rounded-md px-2 text-sm text-surface/75 transition-colors duration-150 hover:bg-surface/10 hover:text-surface disabled:opacity-60 lg:flex"
              >
                <LogOut className="size-4" />
                {signingOut ? t(uiLang, "auth.working") : t(uiLang, "auth.signOut")}
              </button>
            ) : null}
            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className="text-surface hover:bg-surface/10 hover:text-surface lg:hidden"
                onClick={() => setOpen((v) => !v)}
                aria-label="Menu"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            ) : null}
          </div>
        </div>
        {open && user ? (
          <div className="border-t border-surface/10 px-4 py-2 lg:hidden">
            {navLinks.map((l) => (
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
            <div className="mt-2 border-t border-surface/10 px-3 pt-3 pb-1 text-xs text-surface/60">
              {user.displayName ?? user.primaryEmail}
            </div>
            <button
              type="button"
              onClick={doSignOut}
              disabled={signingOut}
              className="flex w-full items-center gap-2 rounded-md px-3 py-3 text-left text-sm text-surface/80 disabled:opacity-60"
            >
              <LogOut className="size-4" />
              {signingOut ? t(uiLang, "auth.working") : t(uiLang, "auth.signOut")}
            </button>
          </div>
        ) : null}
      </nav>
      {children}
      <footer className="no-print border-t border-rule bg-navy px-4 py-3 text-center text-[11px] leading-relaxed text-surface/70 sm:text-xs">
        {t(uiLang, "footer.team")}
      </footer>
    </div>
  );
}
