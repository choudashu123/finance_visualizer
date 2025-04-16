'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Transaction } from '@/types/transaction';

interface Props {
  transactions: Transaction[];
}

export default function DashboardSummary({ transactions }: Props) {
  if (transactions.length === 0) return null;

  const total = transactions.reduce((sum, txn) => sum + txn.amount, 0);

  const categoryTotals: Record<string, number> = {};
  transactions.forEach((txn) => {
    categoryTotals[txn.category] = (categoryTotals[txn.category] || 0) + txn.amount;
  });

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0];

  const mostRecent = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Total Spent</p>
          <p className="text-2xl font-bold text-red-500">${total.toFixed(2)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Top Category</p>
          <p className="text-xl font-medium">{topCategory || 'N/A'}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500">Most Recent</p>
          <p className="text-base">{mostRecent.description}</p>
          <p className="text-xs text-gray-400">{new Date(mostRecent.date).toLocaleDateString()}</p>
        </CardContent>
      </Card>
    </div>
  );
}
