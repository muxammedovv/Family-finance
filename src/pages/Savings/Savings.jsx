import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useFinance } from "../../context/FinanceContext";
import { useToast } from "../../context/ToastContext";
import Modal from "../../components/Modal/Modal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import SavingsGoalForm from "../../components/SavingsGoalForm/SavingsGoalForm";
import ContributeForm from "../../components/ContributeForm/ContributeForm";
import SavingsGoalCard from "../../components/SavingsGoal/SavingsGoal";
import EmptyState from "../../components/EmptyState/EmptyState";
import "./Savings.css";

export default function Savings() {
  const { t } = useLanguage();
  const { savingsGoals, addSavingsGoal, updateSavingsGoal, deleteSavingsGoal, contributeToGoal } = useFinance();
  const { showToast } = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [contributeGoal, setContributeGoal] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const openNew = () => {
    setEditingGoal(null);
    setFormOpen(true);
  };

  const handleSubmit = (data) => {
    if (editingGoal) {
      updateSavingsGoal(editingGoal.id, data);
      showToast(t("toast.goalUpdated"), "success");
    } else {
      addSavingsGoal(data);
      showToast(t("toast.goalAdded"), "success");
    }
    setFormOpen(false);
  };

  const handleContribute = (amount) => {
    contributeToGoal(contributeGoal.id, amount);
    showToast(t("toast.contributionAdded"), "success");
    setContributeGoal(null);
  };

  const handleDelete = () => {
    if (!pendingDelete) return;
    deleteSavingsGoal(pendingDelete.id);
    showToast(t("toast.goalDeleted"), "success");
  };

  return (
    <div className="savings-page">
      <div className="savings-page__head">
        <p className="savings-page__subtitle">{t("savings.subtitle")}</p>
        <button type="button" className="btn btn--primary" onClick={openNew}>
          {t("savings.newGoal")}
        </button>
      </div>

      {savingsGoals.length === 0 ? (
        <div className="card">
          <EmptyState
            title={t("savings.emptyTitle")}
            body={t("savings.emptyBody")}
            actionLabel={t("savings.newGoal")}
            onAction={openNew}
          />
        </div>
      ) : (
        <div className="savings-page__grid">
          {savingsGoals.map((goal) => (
            <SavingsGoalCard
              key={goal.id}
              goal={goal}
              onAddMoney={() => setContributeGoal(goal)}
              onEdit={() => {
                setEditingGoal(goal);
                setFormOpen(true);
              }}
              onDelete={() => setPendingDelete(goal)}
            />
          ))}
        </div>
      )}

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editingGoal ? t("savings.editGoal") : t("savings.newGoal")}
      >
        <SavingsGoalForm initial={editingGoal} onSubmit={handleSubmit} onCancel={() => setFormOpen(false)} />
      </Modal>

      <Modal open={!!contributeGoal} onClose={() => setContributeGoal(null)} title={t("savings.addMoney")} width={380}>
        {contributeGoal && (
          <ContributeForm goal={contributeGoal} onSubmit={handleContribute} onCancel={() => setContributeGoal(null)} />
        )}
      </Modal>

      <ConfirmModal
        open={!!pendingDelete}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleDelete}
        title={t("savings.deleteConfirmTitle")}
        body={t("savings.deleteConfirmBody")}
      />
    </div>
  );
}
