export const CURRENCIES = {
  UZS: { symbol: "so'm", symbolEn: "UZS", position: "suffix" },
  USD: { symbol: "$", symbolEn: "$", position: "prefix" },
  EUR: { symbol: "€", symbolEn: "€", position: "prefix" },
};

export function formatNumber(amount) {
  const rounded = Math.round(Number(amount) || 0);
  return new Intl.NumberFormat("en-US").format(rounded);
}

export function formatCurrency(amount, currencyCode = "UZS", language = "uz") {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.UZS;
  const symbol = language === "en" ? currency.symbolEn : currency.symbol;
  const number = formatNumber(amount);
  return currency.position === "prefix" ? `${symbol}${number}` : `${number} ${symbol}`;
}

export function formatSignedCurrency(amount, type, currencyCode = "UZS", language = "uz") {
  const sign = type === "income" ? "+" : "-";
  return `${sign}${formatCurrency(Math.abs(amount), currencyCode, language)}`;
}

export function formatDate(dateStr, language = "uz") {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  if (!year || !month || !day) return dateStr;
  return language === "en"
    ? `${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}/${year}`
    : `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`;
}

export function todayISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().slice(0, 10);
}

export function currentMonthKey(dateStr) {
  return (dateStr || todayISO()).slice(0, 7); // "YYYY-MM"
}

// Strips everything but digits, so form state always holds a plain numeric string.
export function parseAmountInput(value) {
  return String(value ?? "").replace(/\D/g, "");
}

// Displays a digit-only string grouped with spaces as thousands separators.
export function formatAmountInput(value) {
  const digits = parseAmountInput(value);
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
