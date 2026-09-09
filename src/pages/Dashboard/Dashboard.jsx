import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useFinance } from "../../context/FinanceContext";
import SummaryCard from "../../components/SummaryCard/SummaryCard";
import ExpenseChart from "../../components/ExpenseChart/ExpenseChart";
import TransactionList from "../../components/TransactionList/TransactionList";
import EmptyState from "../../components/EmptyState/EmptyState";
import { formatCurrency } from "../../utils/format";
import "./Dashboard.css";

function useGreetingKey() {
  return useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "greeting.morning";
    if (hour < 18) return "greeting.afternoon";
    return "greeting.evening";
  }, []);
}

export default function Dashboard() {
  const { t, language } = useLanguage();
  const { totalIncome, totalExpenses, balance, totalSavings, currency, transactions } = useFinance();
  const greetingKey = useGreetingKey();

  const recent = transactions.slice(0, 6);

  return (
    <div className="dashboard">
      <div className="dashboard__greeting">
        <h2 className="dashboard__greeting-title">{t(greetingKey)}</h2>
        <p className="dashboard__greeting-subtitle">{t("greeting.subtitle")}</p>
      </div>

      <div className="dashboard__summary">
        <SummaryCard
          label={t("dashboard.totalIncome")}
          value={totalIncome}
          formatter={(v) => formatCurrency(v, currency, language)}
          tone="income"
        />
        <SummaryCard
          label={t("dashboard.totalExpenses")}
          value={totalExpenses}
          formatter={(v) => formatCurrency(v, currency, language)}
          tone="expense"
        />
        <SummaryCard
          label={t("dashboard.balance")}
          value={balance}
          formatter={(v) => formatCurrency(v, currency, language)}
          tone="balance"
        />
        <SummaryCard
          label={t("dashboard.savingsTotal")}
          value={totalSavings}
          formatter={(v) => formatCurrency(v, currency, language)}
          tone="savings"
        />
      </div>

      <div className="dashboard__grid">
        <section className="card dashboard__panel">
          <div className="dashboard__panel-head">
            <div>
              <h3 className="dashboard__panel-title">{t("dashboard.spendingOverview")}</h3>
              <p className="dashboard__panel-subtitle">{t("dashboard.spendingOverviewSubtitle")}</p>
            </div>
          </div>
          <ExpenseChart />
        </section>

        <section className="card dashboard__panel">
          <div className="dashboard__panel-head">
            <h3 className="dashboard__panel-title">{t("dashboard.recentTransactions")}</h3>
            <Link to="/transactions" className="link-btn">{t("common.viewAll")}</Link>
          </div>
          {recent.length === 0 ? (
            <EmptyState title={t("transactions.emptyTitle")} body={t("transactions.emptyBody")} />
          ) : (
            <TransactionList transactions={recent} />
          )}
        </section>
      </div>
    </div>
  );
}
