import { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { useFinance } from "../../context/FinanceContext";
import { useToast } from "../../context/ToastContext";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { CURRENCIES } from "../../utils/format";
import "./Settings.css";

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { currency, setCurrency, clearAllData } = useFinance();
  const { showToast } = useToast();

  const [clearOpen, setClearOpen] = useState(false);

  const handleClear = () => {
    clearAllData();
    showToast(t("toast.dataCleared"), "success");
  };

  return (
    <div className="settings-page">
      <section className="card settings-section">
        <h3 className="settings-section__title">{t("settings.language")}</h3>
        <div className="segmented settings-section__control">
          <button
            type="button"
            className={`segmented__option ${language === "uz" ? "is-active" : ""}`}
            onClick={() => setLanguage("uz")}
          >
            O'zbekcha
          </button>
          <button
            type="button"
            className={`segmented__option ${language === "en" ? "is-active" : ""}`}
            onClick={() => setLanguage("en")}
          >
            English
          </button>
        </div>
      </section>

      <section className="card settings-section">
        <h3 className="settings-section__title">{t("settings.theme")}</h3>
        <div className="segmented settings-section__control">
          <button
            type="button"
            className={`segmented__option ${theme === "light" ? "is-active" : ""}`}
            onClick={() => setTheme("light")}
          >
            {t("settings.themeLight")}
          </button>
          <button
            type="button"
            className={`segmented__option ${theme === "dark" ? "is-active" : ""}`}
            onClick={() => setTheme("dark")}
          >
            {t("settings.themeDark")}
          </button>
        </div>
      </section>

      <section className="card settings-section">
        <h3 className="settings-section__title">{t("settings.currency")}</h3>
        <select
          className="select settings-section__currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          {Object.keys(CURRENCIES).map((code) => (
            <option key={code} value={code}>
              {code} — {CURRENCIES[code].symbol}
            </option>
          ))}
        </select>
      </section>

      <section className="card settings-section settings-section--danger">
        <h3 className="settings-section__title">{t("settings.dataManagement")}</h3>
        <div className="settings-section__danger-row">
          <div>
            <p className="settings-section__danger-label">{t("settings.clearData")}</p>
            <p className="settings-section__danger-desc">{t("settings.clearDataDesc")}</p>
          </div>
          <button type="button" className="btn btn--danger" onClick={() => setClearOpen(true)}>
            {t("settings.clearData")}
          </button>
        </div>
      </section>

      <section className="card settings-section">
        <h3 className="settings-section__title">{t("settings.about")}</h3>
        <p className="settings-section__about">{t("settings.aboutText")}</p>
      </section>

      <ConfirmModal
        open={clearOpen}
        onClose={() => setClearOpen(false)}
        onConfirm={handleClear}
        title={t("settings.clearDataConfirmTitle")}
        body={t("settings.clearDataConfirmBody")}
      />
    </div>
  );
}
