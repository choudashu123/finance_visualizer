'use client';

import { Transaction } from '@/types/transaction';
import { Button } from '@/components/ui/button';

interface Props {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionList({ transactions, onDelete }: Props) {
  return (
    <div className="mt-6 space-y-2">
      {transactions.length === 0 && (
        <p className="text-center text-gray-500">No transactions yet.</p>
      )}
      {transactions.map((txn) => (
        <div
          key={txn._id || txn.id}
          className="p-4 bg-gray-50 border rounded flex justify-between items-center"
        >
          <div>
            <p className="font-medium">{txn.description}</p>
            <p className="text-sm text-gray-500">{txn.date}</p>
          </div>
          <div className="text-right space-y-1">
            <p className="font-bold text-red-600">${typeof txn.amount === 'number' ? txn.amount.toFixed(2) : '0.00'}</p>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => {
                const id = txn._id || txn.id;
                if (id) {
                  onDelete(id);
                } else {
                  console.warn('Transaction ID is missing');
                }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
