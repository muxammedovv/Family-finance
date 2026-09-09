import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { useLanguage } from "../../context/LanguageContext";
import "./Header.css";

export default function Header({ title }) {
  const { t } = useLanguage();

  return (
    <header className="header">
      <h1 className="header__title">{title}</h1>

      <div className="header__actions">
        <LanguageSwitcher />
        <ThemeToggle />
        <div className="header__profile" title={t("header.profile")}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="6.5" r="3.2" stroke="currentColor" strokeWidth="1.4" />
            <path d="M3.8 17c.6-3.4 3.3-5.5 6.2-5.5s5.6 2.1 6.2 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </header>
  );
}
