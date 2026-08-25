# ROAR-KA

**Rapid Online Assessment of Reading — Karnataka schools pilot**

Classroom screening of word reading in **Kannada, English, and Hindi**. A child sees one word at a time and taps *real* or *made-up*. The test adapts. Teachers get a brief flag: Typical / Watch / Refer.

This is a **screen, not a diagnosis**. Kannada and Hindi item banks are newly written for this pilot and need local validation.

## Who it is for

School teachers in Karnataka (Classes 1–8), for a research pilot and clinical conference in Bengaluru. Built so it can later be considered for scale-up (including pathways such as Sarva Shiksha Abhiyan) after validation and government review.

Concept and design: Hemaraja Nayaka. S · Mr. Sumanth AV · Ms. Spoorthi · Ms. Apoorva · Ms. Jeevitha · Ms. Rashmi · Ms. Bandhavya

Records stay in the teacher’s browser until they export a CSV. Nothing is uploaded.

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
