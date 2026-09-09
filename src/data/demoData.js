import { generateId } from "../utils/id";

// Realistic demo data for a household in Uzbekistan, generated relative to
// "today" so the dashboard always looks current when the app first launches.

function isoDate(year, month, day) {
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function shiftMonth(date, delta) {
  const d = new Date(date.getFullYear(), date.getMonth() + delta, 1);
  return d;
}

function daysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function buildDemoTransactions() {
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonth = shiftMonth(thisMonth, -1);
  const lastMonthDays = daysInMonth(lastMonth);
  const todayDay = now.getDate();

  const tx = (day, type, category, description, amount, monthDate = thisMonth) => ({
    id: generateId(),
    type,
    category,
    description,
    amount,
    date: isoDate(monthDate.getFullYear(), monthDate.getMonth() + 1, day),
  });

  // Expenses below carry an "ideal" day-of-month (as if spread across a full
  // month). We proportionally compress that onto [1, todayDay] so the demo
  // never shows a transaction dated in the future, however early in the
  // month the app is first launched.
  const scaleDay = (idealDay) => Math.min(todayDay, Math.max(1, Math.round((idealDay / 27) * todayDay)));

  const list = [
    // Current month income
    tx(1, "income", "income", "Oylik maosh", 8000000),
    tx(Math.min(5, todayDay), "income", "income", "Qo'shimcha daromad", 500000),

    // Current month expenses (ideal day, compressed to fit within today)
    tx(scaleDay(2), "expense", "utilities", "Elektr to'lovi", 240000),
    tx(scaleDay(2), "expense", "utilities", "Gaz to'lovi", 165000),
    tx(scaleDay(3), "expense", "food", "Oylik oziq-ovqat", 620000),
    tx(scaleDay(4), "expense", "transport", "Benzin", 300000),
    tx(scaleDay(6), "expense", "food", "Non mahsulotlari", 185000),
    tx(scaleDay(7), "expense", "health", "Dorixona", 95000),
    tx(scaleDay(8), "expense", "shopping", "Kiyim-kechak", 420000),
    tx(scaleDay(10), "expense", "transport", "Taksi xizmati", 84000),
    tx(scaleDay(12), "expense", "education", "Bolalar uchun kurs to'lovi", 350000),
    tx(scaleDay(14), "expense", "food", "Bozor", 275000),
    tx(scaleDay(16), "expense", "other", "Sartaroshxona", 60000),
    tx(scaleDay(18), "expense", "utilities", "Internet to'lovi", 120000),
    tx(scaleDay(20), "expense", "food", "Oziq-ovqat do'koni", 340000),
    tx(scaleDay(22), "expense", "health", "Shifokor ko'rigi", 150000),
    tx(scaleDay(24), "expense", "transport", "Metro/avtobus", 45000),
    tx(scaleDay(26), "expense", "shopping", "Uy jihozlari", 210000),

    // Previous month, for historical context
    tx(1, "income", "income", "Oylik maosh", 7800000, lastMonth),
    tx(3, "expense", "food", "Oylik oziq-ovqat", 580000, lastMonth),
    tx(5, "expense", "utilities", "Elektr to'lovi", 230000, lastMonth),
    tx(9, "expense", "transport", "Benzin", 280000, lastMonth),
    tx(13, "expense", "shopping", "Kiyim-kechak", 360000, lastMonth),
    tx(17, "expense", "education", "Kurs to'lovi", 350000, lastMonth),
    tx(21, "expense", "health", "Dorixona", 110000, lastMonth),
    tx(Math.min(27, lastMonthDays), "expense", "other", "Boshqa xarajatlar", 90000, lastMonth),
  ];

  return list.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function buildDemoBudgets() {
  return [
    { id: generateId(), category: "food", limit: 1500000 },
    { id: generateId(), category: "transport", limit: 600000 },
    { id: generateId(), category: "utilities", limit: 600000 },
    { id: generateId(), category: "shopping", limit: 500000 },
    { id: generateId(), category: "health", limit: 300000 },
  ];
}

export function buildDemoSavingsGoals() {
  const now = new Date();
  const deadline = new Date(now.getFullYear(), now.getMonth() + 4, 1);
  const deadline2 = new Date(now.getFullYear(), now.getMonth() + 8, 1);
  return [
    {
      id: generateId(),
      name: "Yangi telefon uchun",
      target: 5000000,
      saved: 2800000,
      deadline: isoDate(deadline.getFullYear(), deadline.getMonth() + 1, 1),
    },
    {
      id: generateId(),
      name: "Oilaviy dam olish",
      target: 12000000,
      saved: 4300000,
      deadline: isoDate(deadline2.getFullYear(), deadline2.getMonth() + 1, 1),
    },
  ];
}
