// Expense categories. `key` maps to i18n categories.*, `color` maps to the
// validated categorical palette defined in src/styles/global.css.
export const EXPENSE_CATEGORIES = [
  { id: "food", key: "categories.food", color: "var(--series-1)" },
  { id: "transport", key: "categories.transport", color: "var(--series-2)" },
  { id: "utilities", key: "categories.utilities", color: "var(--series-3)" },
  { id: "education", key: "categories.education", color: "var(--series-4)" },
  { id: "health", key: "categories.health", color: "var(--series-5)" },
  { id: "shopping", key: "categories.shopping", color: "var(--series-6)" },
  { id: "other", key: "categories.other", color: "var(--series-7)" },
];

export const INCOME_CATEGORY = { id: "income", key: "categories.income", color: "var(--status-good)" };

export function getCategoryById(id) {
  if (id === "income") return INCOME_CATEGORY;
  return EXPENSE_CATEGORIES.find((c) => c.id === id) || EXPENSE_CATEGORIES[EXPENSE_CATEGORIES.length - 1];
}
