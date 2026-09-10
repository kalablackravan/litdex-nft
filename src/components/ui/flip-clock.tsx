import { useEffect, useState } from "react";

/**
 * CountdownText — clean monospace countdown to `targetMs`.
 * Renders one continuous string like "1D 04:22:09" (days omitted under 24h),
 * matching the site's existing mono label typography — no boxed digits.
 */
export function FlipCountdown({ targetMs }: { targetMs: number }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const total = Math.max(0, Math.floor((targetMs - now) / 1000));
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <span
      role="timer"
      className="font-mono text-[11px] font-bold uppercase tracking-widest text-[var(--mint-text)] tabular-nums"
    >
      {d > 0 ? `${d}D ${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(h)}:${pad(m)}:${pad(s)}`}
    </span>
  );
}

export default FlipCountdown;
