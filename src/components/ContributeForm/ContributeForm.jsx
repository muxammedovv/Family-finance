import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useFinance } from "../../context/FinanceContext";
import { formatCurrency } from "../../utils/format";
import MoneyInput from "../MoneyInput/MoneyInput";
import "./ContributeForm.css";

export default function ContributeForm({ goal, onSubmit, onCancel }) {
  const { t, language } = useLanguage();
  const { currency } = useFinance();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const remaining = Math.max(0, goal.target - goal.saved);

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = Number(amount);
    if (!amount.toString().trim() || Number.isNaN(num) || num <= 0) {
      setError(t("validation.contributionInvalid"));
      return;
    }
    onSubmit(num);
  };

  return (
    <form className="contribute-form" onSubmit={handleSubmit} noValidate>
      <p className="contribute-form__hint">
        {t("savings.remainingToGoal", { amount: formatCurrency(remaining, currency, language) })}
      </p>
      <div className="field">
        <label className="field__label" htmlFor="contribute-amount">{t("savings.contributionAmount")}</label>
        <MoneyInput
          id="contribute-amount"
          className={`input ${error ? "input--error" : ""}`}
          autoFocus
          value={amount}
          onChange={setAmount}
        />
        {error && <span className="field__error">{error}</span>}
      </div>
      <div className="contribute-form__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          {t("common.cancel")}
        </button>
        <button type="submit" className="btn btn--primary">
          {t("savings.addMoney")}
        </button>
      </div>
    </form>
  );
}
