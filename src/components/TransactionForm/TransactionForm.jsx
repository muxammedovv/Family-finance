import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { EXPENSE_CATEGORIES } from "../../data/categories";
import { todayISO } from "../../utils/format";
import MoneyInput from "../MoneyInput/MoneyInput";
import "./TransactionForm.css";

const emptyForm = (type = "expense") => ({
  type,
  amount: "",
  description: "",
  category: type === "income" ? "income" : "food",
  date: todayISO(),
});

export default function TransactionForm({ initial, onSubmit, onCancel }) {
  const { t } = useLanguage();
  const [form, setForm] = useState(() => (initial ? { ...initial, amount: String(initial.amount) } : emptyForm()));
  const [errors, setErrors] = useState({});

  const setField = (field, val) => setForm((prev) => ({ ...prev, [field]: val }));

  const handleTypeChange = (type) => {
    setForm((prev) => ({
      ...prev,
      type,
      category: type === "income" ? "income" : prev.category === "income" ? "food" : prev.category,
    }));
  };

  const validate = () => {
    const next = {};
    const amountNum = Number(form.amount);
    if (!form.amount.toString().trim()) next.amount = t("validation.amountRequired");
    else if (Number.isNaN(amountNum) || amountNum <= 0) next.amount = t("validation.amountInvalid");

    if (form.type === "expense" && !form.description.trim()) next.description = t("validation.descriptionRequired");
    if (form.type === "expense" && !form.category) next.category = t("validation.categoryRequired");
    if (!form.date) next.date = t("validation.dateRequired");

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      type: form.type,
      amount: Number(form.amount),
      description: form.type === "income" ? "" : form.description.trim(),
      category: form.type === "income" ? "income" : form.category,
      date: form.date,
    });
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <span className="field__label">{t("form.type")}</span>
        <div className="segmented" role="radiogroup">
          <button
            type="button"
            role="radio"
            aria-checked={form.type === "expense"}
            className={`segmented__option ${form.type === "expense" ? "is-active" : ""}`}
            onClick={() => handleTypeChange("expense")}
          >
            {t("form.typeExpense")}
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={form.type === "income"}
            className={`segmented__option ${form.type === "income" ? "is-active" : ""}`}
            onClick={() => handleTypeChange("income")}
          >
            {t("form.typeIncome")}
          </button>
        </div>
      </div>

      <div className="field">
        <label className="field__label" htmlFor="tx-amount">{t("form.amountLabel")}</label>
        <MoneyInput
          id="tx-amount"
          className={`input ${errors.amount ? "input--error" : ""}`}
          placeholder={t("form.amountPlaceholder")}
          value={form.amount}
          onChange={(val) => setField("amount", val)}
        />
        {errors.amount && <span className="field__error">{errors.amount}</span>}
      </div>

      {form.type === "expense" && (
        <div className="field">
          <label className="field__label" htmlFor="tx-desc">{t("form.descriptionLabel")}</label>
          <input
            id="tx-desc"
            className={`input ${errors.description ? "input--error" : ""}`}
            type="text"
            placeholder={t("form.descriptionPlaceholder")}
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
          />
          {errors.description && <span className="field__error">{errors.description}</span>}
        </div>
      )}

      {form.type === "expense" && (
        <div className="field">
          <label className="field__label" htmlFor="tx-category">{t("form.categoryLabel")}</label>
          <select
            id="tx-category"
            className={`select ${errors.category ? "input--error" : ""}`}
            value={form.category}
            onChange={(e) => setField("category", e.target.value)}
          >
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {t(cat.key)}
              </option>
            ))}
          </select>
          {errors.category && <span className="field__error">{errors.category}</span>}
        </div>
      )}

      <div className="field">
        <label className="field__label" htmlFor="tx-date">{t("form.dateLabel")}</label>
        <input
          id="tx-date"
          className={`input ${errors.date ? "input--error" : ""}`}
          type="date"
          value={form.date}
          onChange={(e) => setField("date", e.target.value)}
        />
        {errors.date && <span className="field__error">{errors.date}</span>}
      </div>

      <div className="transaction-form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          {t("common.cancel")}
        </button>
        <button type="submit" className="btn btn--primary">
          {initial ? t("form.submitSave") : t("form.submitAdd")}
        </button>
      </div>
    </form>
  );
}
