import { useLanguage } from "../../context/LanguageContext";
import { useFinance } from "../../context/FinanceContext";
import { formatCurrency, formatDate } from "../../utils/format";
import "./SavingsGoal.css";

export default function SavingsGoal({ goal, onAddMoney, onEdit, onDelete }) {
  const { t, language } = useLanguage();
  const { currency } = useFinance();
  const percent = goal.target > 0 ? Math.min(100, (goal.saved / goal.target) * 100) : 0;
  const isComplete = goal.saved >= goal.target;
  const remaining = Math.max(0, goal.target - goal.saved);

  return (
    <div className="savings-goal card">
      <div className="savings-goal__head">
        <h3 className="savings-goal__name">{goal.name}</h3>
        <div className="savings-goal__row-actions">
          <button type="button" className="link-btn" onClick={onEdit}>{t("common.edit")}</button>
          <button type="button" className="link-btn link-btn--danger" onClick={onDelete}>{t("common.delete")}</button>
        </div>
      </div>

      {goal.deadline && (
        <span className="savings-goal__deadline">{formatDate(goal.deadline, language)}</span>
      )}

      <div className="savings-goal__amounts">
        <span className="savings-goal__saved tabular-nums">{formatCurrency(goal.saved, currency, language)}</span>
        <span className="savings-goal__target tabular-nums">
          {t("savings.targetShort")}: {formatCurrency(goal.target, currency, language)}
        </span>
      </div>

      <div className="savings-goal__track">
        <div className="savings-goal__fill" style={{ width: `${percent}%` }} />
      </div>

      <div className="savings-goal__footer">
        {isComplete ? (
          <span className="badge badge--good">{t("savings.completed")}</span>
        ) : (
          <span className="savings-goal__remaining">
            {t("savings.remainingToGoal", { amount: formatCurrency(remaining, currency, language) })}
          </span>
        )}
        <span className="savings-goal__percent tabular-nums">{Math.round(percent)}%</span>
      </div>

      {!isComplete && (
        <button type="button" className="btn btn--ghost btn--sm savings-goal__add" onClick={onAddMoney}>
          {t("savings.addMoney")}
        </button>
      )}
    </div>
  );
}
