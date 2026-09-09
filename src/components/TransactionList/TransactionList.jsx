import { useLanguage } from "../../context/LanguageContext";
import { useFinance } from "../../context/FinanceContext";
import { getCategoryById } from "../../data/categories";
import { formatDate, formatSignedCurrency } from "../../utils/format";
import "./TransactionList.css";

export default function TransactionList({ transactions, onDelete }) {
  const { t, language } = useLanguage();
  const { currency } = useFinance();

  return (
    <ul className="transaction-list">
      {transactions.map((tx) => {
        const category = getCategoryById(tx.category);
        return (
          <li key={tx.id} className="transaction-row">
            <span className="transaction-row__dot" style={{ background: category.color }} aria-hidden="true" />
            <div className="transaction-row__main">
              <span className="transaction-row__desc">{tx.description || t(category.key)}</span>
              <span className="transaction-row__meta">
                {t(category.key)} · {formatDate(tx.date, language)}
              </span>
            </div>
            <span className={`transaction-row__amount ${tx.type === "income" ? "is-income" : "is-expense"} tabular-nums`}>
              {formatSignedCurrency(tx.amount, tx.type, currency, language)}
            </span>
            {onDelete && (
              <button
                type="button"
                className="transaction-row__delete"
                onClick={() => onDelete(tx)}
                aria-label={t("common.delete")}
                title={t("common.delete")}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 4h10M6.5 4V2.5h3V4M4.5 4l.6 9a1 1 0 0 0 1 .95h3.8a1 1 0 0 0 1-.95l.6-9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
