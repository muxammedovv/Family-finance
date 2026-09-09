import { NavLink } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { navItems } from "../../data/navItems.jsx";
import "./MobileNav.css";

export default function MobileNav() {
  const { t } = useLanguage();

  return (
    <nav className="mobile-nav" aria-label="Primary">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/"}
          className={({ isActive }) => `mobile-nav__link ${isActive ? "is-active" : ""}`}
        >
          <span className="mobile-nav__icon">{item.icon}</span>
          <span className="mobile-nav__label">{t(item.labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  );
}
