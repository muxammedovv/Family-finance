import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useLanguage } from "../../context/LanguageContext";
import { useFinance } from "../../context/FinanceContext";
import { EXPENSE_CATEGORIES } from "../../data/categories";
import { formatCurrency } from "../../utils/format";
import EmptyState from "../EmptyState/EmptyState";
import "./ExpenseChart.css";

function ChartTooltip({ active, payload, currency, language }) {
  if (!active || !payload || !payload.length) return null;
  const item = payload[0];
  return (
    <div className="expense-chart__tooltip">
      <span className="expense-chart__tooltip-dot" style={{ background: item.payload.color }} />
      <span className="expense-chart__tooltip-label">{item.name}</span>
      <span className="expense-chart__tooltip-value tabular-nums">
        {formatCurrency(item.value, currency, language)}
      </span>
    </div>
  );
}

export default function ExpenseChart() {
  const { t, language } = useLanguage();
  const { spendingByCategory, totalExpenses, currency } = useFinance();

  const data = useMemo(() => {
    return EXPENSE_CATEGORIES.map((cat) => ({
      id: cat.id,
      name: t(cat.key),
      value: spendingByCategory[cat.id] || 0,
      color: cat.color,
    })).filter((d) => d.value > 0);
  }, [spendingByCategory, t]);

  if (!totalExpenses || data.length === 0) {
    return (
      <EmptyState
        title={t("dashboard.noCategorySpending")}
      />
    );
  }

  return (
    <div className="expense-chart">
      <div className="expense-chart__viz">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={88}
              paddingAngle={data.length > 1 ? 2 : 0}
              startAngle={90}
              endAngle={-270}
              stroke="var(--surface)"
              strokeWidth={2}
              isAnimationActive
              animationDuration={600}
            >
              {data.map((entry) => (
                <Cell key={entry.id} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip currency={currency} language={language} />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="expense-chart__center">
          <span className="expense-chart__center-label">{t("common.expenses")}</span>
          <span className="expense-chart__center-value tabular-nums">
            {formatCurrency(totalExpenses, currency, language)}
          </span>
        </div>
      </div>

      <ul className="expense-chart__legend">
        {data
          .slice()
          .sort((a, b) => b.value - a.value)
          .map((entry) => {
            const percent = totalExpenses ? Math.round((entry.value / totalExpenses) * 100) : 0;
            return (
              <li key={entry.id} className="expense-chart__legend-row">
                <span className="expense-chart__legend-dot" style={{ background: entry.color }} />
                <span className="expense-chart__legend-name">{entry.name}</span>
                <span className="expense-chart__legend-percent tabular-nums">{percent}%</span>
                <span className="expense-chart__legend-value tabular-nums">
                  {formatCurrency(entry.value, currency, language)}
                </span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
