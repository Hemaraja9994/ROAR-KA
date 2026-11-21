# ROAR-KA

**Rapid Online Assessment of Reading — Karnataka schools pilot**

Classroom screening of word reading in **Kannada, English, Hindi, Telugu, Tamil and Malayalam**. A child sees one word at a time and taps *real* or *made-up*. The test adapts. Teachers get a brief flag: Typical / Watch / Refer.

This is a **screen, not a diagnosis**. Kannada and Hindi item banks are newly written for this pilot and need local validation. **Telugu, Tamil and Malayalam banks and interface text are provisional drafts** (Nov 2026): items mirror the Kannada bank's structure and difficulty values and must be reviewed by native-speaker SLPs/teachers and re-calibrated before use. Item lists live in `src/lib/items.ts`; interface text in `src/lib/i18n-te.ts`, `i18n-ta.ts`, `i18n-ml.ts`.

## Who it is for

School teachers in Karnataka (Classes 1–8), for a research pilot and clinical conference in Bengaluru. Built so it can later be considered for scale-up (including pathways such as Sarva Shiksha Abhiyan) after validation and government review.

Concept and design: Hemaraja Nayaka. S · Dr. Amoolya G · Mr. Sumanth AV · Ms. Spoorthi · Ms. Apoorva · Ms. Jeevitha · Ms. Rashmi · Ms. Bandhavya

Teachers create their own account (email + password) and must sign in to use the app. The account stores only name, email and a hashed password. Screening records still stay in the teacher’s browser until they export a CSV — no child data is uploaded.

## Deploying with sign-in (Vercel)

Accounts need a real Postgres database. ROAR-KA uses the free Neon database **roar-ka-db** (region iad1, Washington D.C., same as the Vercel functions), connected to Production and Preview as `DATABASE_URL`. To set this up again in a new Vercel project:

1. **Storage → Connect Database → Neon (free)** and link it to the project. This adds `DATABASE_URL`. The account tables are created automatically on the next build (`migrations/0001_auth.sql`).
2. Optional: `BETTER_AUTH_SECRET` = a long random string. If unset, a stable secret is derived from `DATABASE_URL`, so this step can be skipped.
3. Optional: `BETTER_AUTH_URL` = your public address (e.g. `https://roar-ka.vercel.app`). If unset, the Vercel production domain is used.
4. Redeploy.

Without `DATABASE_URL` the app falls back to a temporary in-memory database and the login page shows an admin warning; accounts made that way can disappear.

## Credits

The scientific frame is **ROAR-CAT** and the **jsCAT** library (Yeatman Lab):

Ma, W. A., Richie-Halford, A., Burkhardt, A. K., Kanopka, K., Chou, C., Domingue, B. W., & Yeatman, J. D. (2025). ROAR-CAT: Rapid Online Assessment of Reading ability with Computerized Adaptive Testing. *Behavior Research Methods, 57*(1), 1–17. https://doi.org/10.3758/s13428-024-02578-y

jsCAT © 2023 Wanjing Anya Ma, Adam Richie-Halford — [yeatmanlab/jsCAT](https://github.com/yeatmanlab/jsCAT) (MIT). Also: [Hemaraja9994/Reading-Screening-Test](https://github.com/Hemaraja9994/Reading-Screening-Test).

This Karnataka language adaptation is **not** the official Stanford ROAR product. English items here are original parallels, not the copyrighted ROAR item bank.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL. `npm run build` produces the Vercel output.

Protocol version: `ROAR-KA-pilot-2026.1`
