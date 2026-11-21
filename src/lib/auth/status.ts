import { createServerFn } from "@tanstack/react-start";

/**
 * Tells the login page whether accounts are saved in a real database.
 * Without DATABASE_URL the app falls back to a temporary in-memory database,
 * so accounts can vanish — the login page shows an admin warning in that case.
 */
export const getAuthStatus = createServerFn({ method: "GET" }).handler(async () => {
  return { database: Boolean(process.env.DATABASE_URL?.trim()) };
});
