import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { PageHero } from "@/components/ribbons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { authClient } from "@/lib/auth/client";
import { getAuthStatus } from "@/lib/auth/status";
import { t } from "@/lib/i18n";
import { useApp } from "@/lib/store";

/**
 * Teacher sign-in / sign-up form (email + password).
 * Email acts as the username. Records are not touched — they stay on the device.
 */
export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const uiLang = useApp((s) => s.uiLang);
  const teacher = useApp((s) => s.teacher);
  const setTeacher = useApp((s) => s.setTeacher);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [noDb, setNoDb] = useState(false);

  useEffect(() => {
    getAuthStatus()
      .then((s) => setNoDb(!s.database && !import.meta.env.DEV))
      .catch(() => {});
  }, []);

  const isSignup = mode === "signup";

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password || (isSignup && (!name.trim() || !password2))) {
      setError(t(uiLang, "auth.errFields"));
      return;
    }
    if (isSignup && password.length < 8) {
      setError(t(uiLang, "auth.errShort"));
      return;
    }
    if (isSignup && password !== password2) {
      setError(t(uiLang, "auth.errMismatch"));
      return;
    }
    setBusy(true);
    try {
      const res = isSignup
        ? await authClient.signUp.email({ name: name.trim(), email: cleanEmail, password })
        : await authClient.signIn.email({ email: cleanEmail, password });
      if (res.error) {
        setError(t(uiLang, isSignup ? "auth.errSignup" : "auth.errLogin"));
        setBusy(false);
        return;
      }
      // Prefill the teacher name on the screening form for a new account.
      if (isSignup && !teacher.name.trim()) setTeacher({ name: name.trim() });
      await navigate({ to: "/" });
    } catch {
      setError(t(uiLang, isSignup ? "auth.errSignup" : "auth.errLogin"));
      setBusy(false);
    }
  }

  return (
    <div>
      <PageHero
        kicker={t(uiLang, "app.place")}
        title={t(uiLang, isSignup ? "auth.signupTitle" : "auth.loginTitle")}
        lead={t(uiLang, isSignup ? "auth.signupLead" : "auth.loginLead")}
      />
      <main className="enter mx-auto max-w-md px-4 py-8">
        {noDb ? (
          <p className="mb-4 rounded-md bg-refer/10 px-3 py-2 text-sm text-refer">
            {t(uiLang, "auth.noDb")}
          </p>
        ) : null}
        <Card>
          <form onSubmit={submit} className="grid gap-4" noValidate>
            {isSignup ? (
              <div>
                <Label htmlFor="au-name">{t(uiLang, "auth.name")}</Label>
                <Input
                  id="au-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
            ) : null}
            <div>
              <Label htmlFor="au-email">{t(uiLang, "auth.email")}</Label>
              <Input
                id="au-email"
                type="email"
                inputMode="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete={isSignup ? "email" : "username"}
              />
            </div>
            <div>
              <Label htmlFor="au-pw">{t(uiLang, "auth.password")}</Label>
              <Input
                id="au-pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isSignup ? "new-password" : "current-password"}
              />
              {isSignup ? (
                <p className="mt-1.5 text-xs text-dust">{t(uiLang, "auth.passwordHint")}</p>
              ) : null}
            </div>
            {isSignup ? (
              <div>
                <Label htmlFor="au-pw2">{t(uiLang, "auth.password2")}</Label>
                <Input
                  id="au-pw2"
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  autoComplete="new-password"
                />
              </div>
            ) : null}
            {error ? (
              <p className="text-sm text-refer" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" size="lg" disabled={busy}>
              {busy
                ? t(uiLang, "auth.working")
                : t(uiLang, isSignup ? "auth.signUp" : "auth.signIn")}
            </Button>
          </form>
        </Card>
        <p className="mt-5 text-center text-sm">
          <Link
            to={isSignup ? "/login" : "/signup"}
            className="text-ink-soft underline underline-offset-4 hover:text-ink"
          >
            {t(uiLang, isSignup ? "auth.toLogin" : "auth.toSignup")}
          </Link>
        </p>
      </main>
    </div>
  );
}
