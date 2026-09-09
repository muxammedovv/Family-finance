import { NavLink } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { navItems } from "../../data/navItems.jsx";
import "./Sidebar.css";

export default function Sidebar() {
  const { t } = useLanguage();

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__brand-mark">FF</span>
        <span className="sidebar__brand-name">Family Finance</span>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) => `sidebar__link ${isActive ? "is-active" : ""}`}
          >
            <span className="sidebar__link-icon">{item.icon}</span>
            <span>{t(item.labelKey)}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
