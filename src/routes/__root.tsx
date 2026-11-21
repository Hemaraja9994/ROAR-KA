import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AppShell } from "@/components/app-shell";
import { rehydrateApp, useApp } from "@/lib/store";
import appCss from "../styles.css?url";

const APP_NAME = "ROAR-KA";

function RootInner() {
  const uiLang = useApp((s) => s.uiLang);

  useEffect(() => {
    rehydrateApp();
  }, []);

  useEffect(() => {
    document.documentElement.lang = uiLang;
  }, [uiLang]);

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "theme-color", content: "#0B1F4D" },
      {
        name: "description",
        content:
          "ROAR-KA: Rapid Online Assessment of Reading for Karnataka schools — Kannada, English, Hindi, Telugu, Tamil, Malayalam classroom screening.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Literata:opsz,wght@7..72,500;7..72,600&family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Noto+Sans+Kannada:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@500;600;700&family=Noto+Serif+Kannada:wght@500;600;700&family=Noto+Sans+Telugu:wght@400;500;600;700&family=Noto+Serif+Telugu:wght@500;600;700&family=Noto+Sans+Tamil:wght@400;500;600;700&family=Noto+Serif+Tamil:wght@500;600;700&family=Noto+Sans+Malayalam:wght@400;500;600;700&family=Noto+Serif+Malayalam:wght@500;600;700&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <RootInner />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
