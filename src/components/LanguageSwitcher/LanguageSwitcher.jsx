import { useLanguage } from "../../context/LanguageContext";
import "./LanguageSwitcher.css";

const OPTIONS = [
  { code: "uz", label: "UZ" },
  { code: "en", label: "EN" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="lang-switch segmented" role="radiogroup" aria-label="Language">
      {OPTIONS.map((opt) => (
        <button
          key={opt.code}
          type="button"
          role="radio"
          aria-checked={language === opt.code}
          className={`segmented__option ${language === opt.code ? "is-active" : ""}`}
          onClick={() => setLanguage(opt.code)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
