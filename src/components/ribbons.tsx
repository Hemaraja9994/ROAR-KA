export function Ribbons({ className = "" }: { className?: string }) {
  return (
    <div className={`ribbon-wrap ${className}`} aria-hidden>
      <svg className="ribbon" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="xMidYMid slice">
        <path
          d="M 720 -80 C 860 40, 980 120, 1280 80"
          stroke="url(#r1)"
          strokeWidth="88"
          strokeLinecap="round"
        />
        <path
          d="M -120 720 C 80 640, 220 780, 480 700 S 820 560, 1280 680"
          stroke="url(#r2)"
          strokeWidth="96"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="r1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f15a3b" />
            <stop offset="60%" stopColor="#c43b8c" />
            <stop offset="100%" stopColor="#5b2fa0" />
          </linearGradient>
          <linearGradient id="r2" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#c43b8c" />
            <stop offset="55%" stopColor="#f15a3b" />
            <stop offset="100%" stopColor="#c43b8c" />
          </linearGradient>
        </defs>
      </svg>
      <svg className="ribbon ribbon-b" viewBox="0 0 1200 800" fill="none" preserveAspectRatio="xMidYMid slice">
        <path
          d="M 900 820 C 1040 640, 1180 520, 1320 360"
          stroke="url(#r3)"
          strokeWidth="64"
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="r3" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#5b2fa0" />
            <stop offset="100%" stopColor="#f15a3b" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function PageHero({
  kicker,
  title,
  lead,
}: {
  kicker?: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="relative overflow-hidden bg-navy text-surface">
      <Ribbons />
      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:py-12">
        {kicker ? (
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-coral">{kicker}</p>
        ) : null}
        <h1 className="mt-2 max-w-3xl font-display text-3xl font-medium tracking-tight sm:text-4xl">
          {title}
        </h1>
        {lead ? <p className="mt-3 max-w-2xl text-sm leading-relaxed text-surface/80 sm:text-base">{lead}</p> : null}
      </div>
    </header>
  );
}

export function StepMark({ n }: { n: number | string }) {
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-md bg-coral font-display text-xl font-medium text-surface">
      {n}
    </span>
  );
}
