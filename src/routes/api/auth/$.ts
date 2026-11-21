import { createFileRoute } from "@tanstack/react-router";
import { auth } from "@/lib/auth/server";

/** Better Auth endpoints (sign-up, sign-in, session, sign-out) at /api/auth/*. */
export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => auth.handler(request),
      POST: ({ request }) => auth.handler(request),
    },
  },
});
