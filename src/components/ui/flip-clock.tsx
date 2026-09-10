import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Digit = ({ value }: { value: string }) => {
  return (
    <div className="relative h-5 w-[15px] overflow-hidden rounded-[4px] bg-[var(--mint-text)] shadow-sm">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
          className="absolute inset-0 grid place-items-center font-mono text-[11px] font-bold text-white"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

const Colon = () => (
  <span className="px-px font-mono text-[11px] font-bold leading-none text-[var(--mint-text)]">
    :
  </span>
);

const DigitGroup = ({ value }: { value: string }) => (
  <div className="flex items-center gap-[2px]">
    {value.split("").map((d, i) => (
      <Digit key={`${i}-${d}`} value={d} />
    ))}
  </div>
);

/**
 * FlipCountdown — animated flip-clock counting down to `targetMs`.
 * Renders "DD : HH : MM : SS" (days group only while > 0 days remain).
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
    <span className="inline-flex items-center gap-[3px]" role="timer">
      {d > 0 && (
        <>
          <DigitGroup value={pad(d)} />
          <span className="pr-0.5 font-mono text-[9px] font-bold uppercase leading-none text-[var(--mint-text)]">
            d
          </span>
        </>
      )}
      <DigitGroup value={pad(h)} />
      <Colon />
      <DigitGroup value={pad(m)} />
      <Colon />
      <DigitGroup value={pad(s)} />
    </span>
  );
}

export default FlipCountdown;
