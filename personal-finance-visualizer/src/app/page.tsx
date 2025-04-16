'use client';

import { useEffect, useState } from 'react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import ExpensesBarChart from '@/components/ExpensesBarChart';
import { Transaction } from '@/types/transaction';
import CategoryPieChart from '@/components/CategoryPieChart';
import DashboardSummary from '@/components/DashboardSummary';
import BudgetForm from '@/components/BudgetForm';
import BudgetComparisonChart from '@/components/BudgetComparisonChart';
import SpendingInsights from '@/components/SpendingInsights';

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load existing transactions on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/transactions');
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      }
    };

    fetchData();
  }, []);

  // Add new transaction
  const handleAdd = async (txn: Transaction) => {
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(txn),
      });

      const savedTxn = await res.json();
      setTransactions((prev) => [savedTxn, ...prev]);
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  };

  // Delete transaction by ID
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/transactions/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setTransactions((prev) => prev.filter((t) => t._id !== id 
          && t.id !== id));
      }
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };
  const [budgets, setBudgets] = useState<Record<string, number>>({});
  useEffect(() => {
    fetch('/api/budgets')
      .then(res => res.json())
      .then(data => {
        const loaded = Object.fromEntries(data.map((b: any) => [b.category, b.amount]));
        setBudgets(loaded);
      })
      .catch(err => console.error('Failed to fetch budgets:', err));
  }, []);
  

const handleSetBudget = async (category: string, amount: number) => {
  setBudgets((prev) => ({ ...prev, [category]: amount }));
  await fetch('/api/budgets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, amount }),
  });
};



  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">💰 Personal Finance Tracker</h1>

      <TransactionForm onAdd={handleAdd} />

      <TransactionList transactions={transactions} onDelete={handleDelete} />
      <DashboardSummary transactions={transactions} />

      <BudgetForm onSetBudget={handleSetBudget} budgets={budgets} />

      <ExpensesBarChart transactions={transactions} />
      <CategoryPieChart transactions={transactions} />
      <BudgetComparisonChart budgets={budgets} transactions={transactions} />
      <SpendingInsights budgets={budgets} transactions={transactions} />

    </main>
  );
}
