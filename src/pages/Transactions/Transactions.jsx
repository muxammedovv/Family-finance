import { useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useFinance } from "../../context/FinanceContext";
import { useToast } from "../../context/ToastContext";
import Modal from "../../components/Modal/Modal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionList from "../../components/TransactionList/TransactionList";
import EmptyState from "../../components/EmptyState/EmptyState";
import { EXPENSE_CATEGORIES } from "../../data/categories";
import "./Transactions.css";

export default function Transactions() {
  const { t } = useLanguage();
  const { transactions, addTransaction, deleteTransaction } = useFinance();
  const { showToast } = useToast();

  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  const filtered = useMemo(() => {
    return transactions.filter((tx) => {
      if (typeFilter !== "all" && tx.type !== typeFilter) return false;
      if (categoryFilter !== "all" && tx.category !== categoryFilter) return false;
      return true;
    });
  }, [transactions, typeFilter, categoryFilter]);

  const handleAdd = (data) => {
    addTransaction(data);
    setFormOpen(false);
    showToast(t("toast.transactionAdded"), "success");
  };

  const handleDelete = () => {
    if (!pendingDelete) return;
    deleteTransaction(pendingDelete.id);
    showToast(t("toast.transactionDeleted"), "success");
  };

  const hasAnyTransactions = transactions.length > 0;

  return (
    <div className="transactions-page">
      <div className="transactions-page__toolbar card">
        <div className="transactions-page__filters">
          <div className="segmented" role="radiogroup">
            {[
              { id: "all", label: t("transactions.filterAll") },
              { id: "income", label: t("transactions.filterIncome") },
              { id: "expense", label: t("transactions.filterExpense") },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={typeFilter === opt.id}
                className={`segmented__option ${typeFilter === opt.id ? "is-active" : ""}`}
                onClick={() => setTypeFilter(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <select
            className="select transactions-page__category-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label={t("transactions.filterCategory")}
          >
            <option value="all">{t("transactions.filterCategory")}</option>
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>{t(cat.key)}</option>
            ))}
          </select>
        </div>

        <button type="button" className="btn btn--primary" onClick={() => setFormOpen(true)}>
          {t("common.addTransaction")}
        </button>
      </div>

      <div className="card transactions-page__list-card">
        <div className="transactions-page__list-head">
          <span className="transactions-page__count">
            {t("transactions.resultsCount", { count: filtered.length })}
          </span>
        </div>

        {filtered.length === 0 ? (
          hasAnyTransactions ? (
            <EmptyState title={t("transactions.noResultsTitle")} body={t("transactions.noResultsBody")} />
          ) : (
            <EmptyState
              title={t("transactions.emptyTitle")}
              body={t("transactions.emptyBody")}
              actionLabel={t("common.addTransaction")}
              onAction={() => setFormOpen(true)}
            />
          )
        ) : (
          <TransactionList transactions={filtered} onDelete={setPendingDelete} />
        )}
      </div>

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={t("transactions.newTransaction")}>
        <TransactionForm onSubmit={handleAdd} onCancel={() => setFormOpen(false)} />
      </Modal>

      <ConfirmModal
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        title={t("transactions.deleteConfirmTitle")}
        body={t("transactions.deleteConfirmBody")}
      />
    </div>
  );
}
