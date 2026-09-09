import { useLanguage } from "../../context/LanguageContext";
import { useFinance } from "../../context/FinanceContext";
import { getCategoryById } from "../../data/categories";
import { formatCurrency } from "../../utils/format";
import "./BudgetProgress.css";

export default function BudgetProgress({ budget, onEdit, onDelete }) {
  const { t, language } = useLanguage();
  const { currency, spentByCategoryFn } = useFinance();
  const category = getCategoryById(budget.category);
  const spent = spentByCategoryFn(budget.category);
  const percent = budget.limit > 0 ? Math.min(999, (spent / budget.limit) * 100) : 0;
  const remaining = budget.limit - spent;

  let state = "normal";
  if (percent >= 100) state = "over";
  else if (percent >= 80) state = "near";

  return (
    <div className="budget-progress">
      <div className="budget-progress__head">
        <div className="budget-progress__label">
          <span className="budget-progress__dot" style={{ background: category.color }} />
          <span>{t(category.key)}</span>
          {state === "near" && <span className="badge badge--warning">{t("budget.warningNear")}</span>}
          {state === "over" && <span className="badge badge--critical">{t("budget.warningOver")}</span>}
        </div>
        <div className="budget-progress__row-actions">
          <button type="button" className="link-btn" onClick={onEdit}>
            {t("common.edit")}
          </button>
          <button type="button" className="link-btn link-btn--danger" onClick={onDelete}>
            {t("common.delete")}
          </button>
        </div>
      </div>

      <div className={`budget-progress__track budget-progress__track--${state}`}>
        <div
          className="budget-progress__fill"
          style={{ width: `${Math.min(100, percent)}%` }}
        />
      </div>

      <div className="budget-progress__meta">
        <span>
          <strong className="tabular-nums">{formatCurrency(spent, currency, language)}</strong>
          <span className="budget-progress__meta-muted"> / {formatCurrency(budget.limit, currency, language)}</span>
        </span>
        <span className={`budget-progress__remaining tabular-nums ${remaining < 0 ? "is-negative" : ""}`}>
          {remaining >= 0
            ? `${formatCurrency(remaining, currency, language)} ${t("budget.remaining").toLowerCase()}`
            : `${formatCurrency(Math.abs(remaining), currency, language)} ${t("budget.excess")}`}
        </span>
      </div>
    </div>
  );
}
