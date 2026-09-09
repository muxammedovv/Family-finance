import { useEffect, useRef, useState } from "react";
import "./SummaryCard.css";

// Animates the displayed number counting up to `value` on mount/update —
// a subtle, purposeful transition rather than an instant jump.
function useCountUp(value, duration = 500) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(null);
  const fromRef = useRef(0);

  useEffect(() => {
    fromRef.current = display;
    startRef.current = null;
    let frame;

    const step = (timestamp) => {
      if (startRef.current === null) startRef.current = timestamp;
      const progress = Math.min(1, (timestamp - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(fromRef.current + (value - fromRef.current) * eased);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return display;
}

export default function SummaryCard({ label, value, formatter, tone = "neutral", icon }) {
  const animated = useCountUp(value);

  return (
    <div className={`summary-card summary-card--${tone}`}>
      <div className="summary-card__top">
        <span className="summary-card__label">{label}</span>
        {icon && <span className="summary-card__icon" aria-hidden="true">{icon}</span>}
      </div>
      <div className="summary-card__value tabular-nums">{formatter(animated)}</div>
    </div>
  );
}
