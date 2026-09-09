import { useLayoutEffect, useRef } from "react";
import { formatAmountInput, parseAmountInput } from "../../utils/format";

// Text input for money amounts. Displays the value grouped with spaces
// (e.g. "1 000 000") while the underlying value passed to onChange stays a
// plain digit-only string, so callers can keep using Number(value) as before.
export default function MoneyInput({
  id,
  className,
  value,
  onChange,
  placeholder,
  autoFocus,
  onBlur,
}) {
  const inputRef = useRef(null);
  const pendingCursorDigits = useRef(null);

  const handleChange = (e) => {
    const raw = e.target.value;
    const cursorPos = e.target.selectionStart ?? raw.length;
    pendingCursorDigits.current = parseAmountInput(raw.slice(0, cursorPos)).length;
    onChange(parseAmountInput(raw));
  };

  useLayoutEffect(() => {
    const digitsBeforeCursor = pendingCursorDigits.current;
    pendingCursorDigits.current = null;
    if (digitsBeforeCursor === null || !inputRef.current) return;

    const formatted = formatAmountInput(value);
    let seen = 0;
    let pos = formatted.length;
    for (let i = 0; i < formatted.length; i++) {
      if (/\d/.test(formatted[i])) seen++;
      if (seen === digitsBeforeCursor) {
        pos = i + 1;
        break;
      }
    }
    if (digitsBeforeCursor === 0) pos = 0;
    inputRef.current.setSelectionRange(pos, pos);
  }, [value]);

  return (
    <input
      ref={inputRef}
      id={id}
      className={className}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      placeholder={placeholder}
      value={formatAmountInput(value)}
      onChange={handleChange}
      onBlur={onBlur}
      autoFocus={autoFocus}
    />
  );
}
