import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import MobileNav from "../MobileNav/MobileNav";
import { useLanguage } from "../../context/LanguageContext";
import "./Layout.css";

const TITLE_BY_PATH = {
  "/": "dashboard.title",
  "/transactions": "transactions.title",
  "/budget": "budget.title",
  "/savings": "savings.title",
  "/settings": "settings.title",
};

export default function Layout() {
  const { t } = useLanguage();
  const location = useLocation();
  const titleKey = TITLE_BY_PATH[location.pathname] || "dashboard.title";

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__main">
        <Header title={t(titleKey)} />
        <main className="app-shell__content">
          <div className="page-enter" key={location.pathname}>
            <Outlet />
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
