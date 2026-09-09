import { HashRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { FinanceProvider } from "./context/FinanceContext";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";
import Budget from "./pages/Budget/Budget";
import Savings from "./pages/Savings/Savings";
import Settings from "./pages/Settings/Settings";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          <FinanceProvider>
            <HashRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/savings" element={<Savings />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Routes>
            </HashRouter>
          </FinanceProvider>
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
