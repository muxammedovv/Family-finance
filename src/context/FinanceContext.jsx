import { createContext, useCallback, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { generateId } from "../utils/id";
import { currentMonthKey, todayISO } from "../utils/format";
import { buildDemoBudgets, buildDemoSavingsGoals, buildDemoTransactions } from "../data/demoData";

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage("ff_transactions", () => buildDemoTransactions());
  const [budgets, setBudgets] = useLocalStorage("ff_budgets", () => buildDemoBudgets());
  const [savingsGoals, setSavingsGoals] = useLocalStorage("ff_savings_goals", () => buildDemoSavingsGoals());
  const [currency, setCurrency] = useLocalStorage("ff_currency", "UZS");

  // Transactions ------------------------------------------------------
  const addTransaction = useCallback(
    (data) => {
      const record = { id: generateId(), ...data };
      setTransactions((prev) => [record, ...prev]);
      return record;
    },
    [setTransactions]
  );

  const updateTransaction = useCallback(
    (id, data) => {
      setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    },
    [setTransactions]
  );

  const deleteTransaction = useCallback(
    (id) => {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    },
    [setTransactions]
  );

  // Budgets -------------------------------------------------------------
  const upsertBudget = useCallback(
    (category, limit) => {
      setBudgets((prev) => {
        const exists = prev.find((b) => b.category === category);
        if (exists) return prev.map((b) => (b.category === category ? { ...b, limit } : b));
        return [...prev, { id: generateId(), category, limit }];
      });
    },
    [setBudgets]
  );

  const deleteBudget = useCallback(
    (category) => {
      setBudgets((prev) => prev.filter((b) => b.category !== category));
    },
    [setBudgets]
  );

  // Savings goals ---------------------------------------------------------
  const addSavingsGoal = useCallback(
    (data) => {
      const record = { id: generateId(), saved: 0, ...data };
      setSavingsGoals((prev) => [record, ...prev]);
      return record;
    },
    [setSavingsGoals]
  );

  const updateSavingsGoal = useCallback(
    (id, data) => {
      setSavingsGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...data } : g)));
    },
    [setSavingsGoals]
  );

  const deleteSavingsGoal = useCallback(
    (id) => {
      setSavingsGoals((prev) => prev.filter((g) => g.id !== id));
    },
    [setSavingsGoals]
  );

  const contributeToGoal = useCallback(
    (id, amount) => {
      setSavingsGoals((prev) =>
        prev.map((g) => (g.id === id ? { ...g, saved: Math.min(g.target, g.saved + amount) } : g))
      );
    },
    [setSavingsGoals]
  );

  // Derived data ------------------------------------------------------
  const derived = useMemo(() => {
    const monthKey = currentMonthKey(todayISO());
    const monthTransactions = transactions.filter((t) => currentMonthKey(t.date) === monthKey);

    const totalIncome = monthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const totalExpenses = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const balance = totalIncome - totalExpenses;

    const totalSavings = savingsGoals.reduce((sum, g) => sum + Number(g.saved), 0);

    const spendingByCategory = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
        return acc;
      }, {});

    const spentByCategoryFn = (category) => spendingByCategory[category] || 0;

    return {
      monthKey,
      monthTransactions,
      totalIncome,
      totalExpenses,
      balance,
      totalSavings,
      spendingByCategory,
      spentByCategoryFn,
    };
  }, [transactions, savingsGoals]);

  const clearAllData = useCallback(() => {
    setTransactions([]);
    setBudgets([]);
    setSavingsGoals([]);
  }, [setTransactions, setBudgets, setSavingsGoals]);

  const value = useMemo(
    () => ({
      transactions,
      budgets,
      savingsGoals,
      currency,
      setCurrency,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      upsertBudget,
      deleteBudget,
      addSavingsGoal,
      updateSavingsGoal,
      deleteSavingsGoal,
      contributeToGoal,
      clearAllData,
      ...derived,
    }),
    [
      transactions,
      budgets,
      savingsGoals,
      currency,
      setCurrency,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      upsertBudget,
      deleteBudget,
      addSavingsGoal,
      updateSavingsGoal,
      deleteSavingsGoal,
      contributeToGoal,
      clearAllData,
      derived,
    ]
  );

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
}
