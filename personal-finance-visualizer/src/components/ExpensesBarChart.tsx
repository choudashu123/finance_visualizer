'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from '@/types/transaction';
import { useMemo } from 'react';

interface Props {
  transactions: Transaction[];
}

export default function ExpensesBarChart({ transactions }: Props) {
  const monthlyTotals = useMemo(() => {
    const map = new Map<string, number>();
    transactions.forEach(({ amount, date }) => {
      const month = new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });
      map.set(month, (map.get(month) || 0) + amount);
    });
    return Array.from(map.entries()).map(([name, total]) => ({ name, total }));
  }, [transactions]);

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyTotals}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
