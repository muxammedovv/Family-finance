import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { EXPENSE_CATEGORIES } from "../../data/categories";
import MoneyInput from "../MoneyInput/MoneyInput";
import "./BudgetForm.css";

export default function BudgetForm({ initial, availableCategories, onSubmit, onCancel }) {
  const { t } = useLanguage();
  const [category, setCategory] = useState(initial?.category || availableCategories[0]?.id || "food");
  const [limit, setLimit] = useState(initial ? String(initial.limit) : "");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = Number(limit);
    if (!limit.toString().trim() || Number.isNaN(num) || num <= 0) {
      setError(t("validation.budgetAmountInvalid"));
      return;
    }
    onSubmit({ category, limit: num });
  };

  return (
    <form className="budget-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label className="field__label" htmlFor="budget-category">{t("budget.selectCategory")}</label>
        <select
          id="budget-category"
          className="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={!!initial}
        >
          {(initial ? EXPENSE_CATEGORIES : availableCategories).map((cat) => (
            <option key={cat.id} value={cat.id}>
              {t(cat.key)}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="budget-limit">{t("budget.monthlyLimit")}</label>
        <MoneyInput
          id="budget-limit"
          className={`input ${error ? "input--error" : ""}`}
          value={limit}
          onChange={setLimit}
        />
        {error && <span className="field__error">{error}</span>}
      </div>

      <div className="budget-form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          {t("common.cancel")}
        </button>
        <button type="submit" className="btn btn--primary">
          {t("common.save")}
        </button>
      </div>
    </form>
  );
}
