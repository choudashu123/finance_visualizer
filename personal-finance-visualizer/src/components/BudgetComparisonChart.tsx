'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  budgets: Record<string, number>;
  transactions: { category: string; amount: number }[];
}

export default function BudgetComparisonChart({ budgets, transactions }: Props) {
  const categories = Object.keys(budgets);

  const actuals: Record<string, number> = {};
  for (const txn of transactions) {
    if (!actuals[txn.category]) actuals[txn.category] = 0;
    actuals[txn.category] += txn.amount;
  }

  const data = categories.map((category) => ({
    category,
    budget: budgets[category],
    actual: actuals[category] || 0,
  }));

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">📊 Budget vs. Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#82ca9d" />
          <Bar dataKey="actual" fill="#f87171" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
