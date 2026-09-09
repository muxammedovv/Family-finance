import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./SavingsGoalForm.css";

export default function SavingsGoalForm({ initial, onSubmit, onCancel }) {
  const { t } = useLanguage();
  const [name, setName] = useState(initial?.name || "");
  const [target, setTarget] = useState(initial ? String(initial.target) : "");
  const [deadline, setDeadline] = useState(initial?.deadline || "");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!name.trim()) next.name = t("validation.goalNameRequired");
    const num = Number(target);
    if (!target.toString().trim() || Number.isNaN(num) || num <= 0) {
      next.target = t("validation.goalAmountInvalid");
    }
    setErrors(next);
    if (Object.keys(next).length) return;

    onSubmit({ name: name.trim(), target: num, deadline: deadline || null });
  };

  return (
    <form className="savings-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label className="field__label" htmlFor="goal-name">{t("savings.goalName")}</label>
        <input
          id="goal-name"
          className={`input ${errors.name ? "input--error" : ""}`}
          type="text"
          placeholder={t("savings.goalNamePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <span className="field__error">{errors.name}</span>}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="goal-target">{t("savings.targetAmount")}</label>
        <input
          id="goal-target"
          className={`input ${errors.target ? "input--error" : ""}`}
          type="number"
          min="0"
          step="10000"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        {errors.target && <span className="field__error">{errors.target}</span>}
      </div>

      <div className="field">
        <label className="field__label" htmlFor="goal-deadline">{t("savings.deadlineOptional")}</label>
        <input
          id="goal-deadline"
          className="input"
          type="date"
          value={deadline || ""}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <div className="savings-form__actions">
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
