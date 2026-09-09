import { useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useFinance } from "../../context/FinanceContext";
import { useToast } from "../../context/ToastContext";
import Modal from "../../components/Modal/Modal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import BudgetForm from "../../components/BudgetForm/BudgetForm";
import BudgetProgress from "../../components/BudgetProgress/BudgetProgress";
import EmptyState from "../../components/EmptyState/EmptyState";
import { EXPENSE_CATEGORIES } from "../../data/categories";
import "./Budget.css";

export default function Budget() {
  const { t } = useLanguage();
  const { budgets, upsertBudget, deleteBudget } = useFinance();
  const { showToast } = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const availableCategories = useMemo(
    () => EXPENSE_CATEGORIES.filter((cat) => !budgets.some((b) => b.category === cat.id)),
    [budgets]
  );

  const openNew = () => {
    setEditingBudget(null);
    setFormOpen(true);
  };

  const openEdit = (budget) => {
    setEditingBudget(budget);
    setFormOpen(true);
  };

  const handleSubmit = ({ category, limit }) => {
    upsertBudget(category, limit);
    setFormOpen(false);
    showToast(t("toast.budgetSaved"), "success");
  };

  const handleDelete = () => {
    if (!pendingDelete) return;
    deleteBudget(pendingDelete.category);
    showToast(t("toast.budgetDeleted"), "success");
  };

  return (
    <div className="budget-page">
      <div className="budget-page__head">
        <p className="budget-page__subtitle">{t("budget.subtitle")}</p>
        <button
          type="button"
          className="btn btn--primary"
          onClick={openNew}
          disabled={availableCategories.length === 0}
        >
          {t("budget.addBudget")}
        </button>
      </div>

      <div className="card budget-page__list">
        {budgets.length === 0 ? (
          <EmptyState
            title={t("budget.noBudgetTitle")}
            body={t("budget.noBudgetBody")}
            actionLabel={t("budget.addBudget")}
            onAction={openNew}
          />
        ) : (
          <>
            {budgets.map((budget) => (
              <BudgetProgress
                key={budget.id}
                budget={budget}
                onEdit={() => openEdit(budget)}
                onDelete={() => setPendingDelete(budget)}
              />
            ))}
            {availableCategories.length === 0 && (
              <p className="budget-page__all-set">{t("budget.allBudgeted")}</p>
            )}
          </>
        )}
      </div>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingBudget ? t("budget.editBudget") : t("budget.setBudget")}
      >
        <BudgetForm
          initial={editingBudget}
          availableCategories={availableCategories}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
        />
      </Modal>

      <ConfirmModal
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        title={t("budget.deleteConfirmTitle")}
        body={t("budget.deleteConfirmBody")}
      />
    </div>
  );
}
