'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';

const categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Rent', 'Other']

interface Props {
    budgets: Record<string, number>;
    onSetBudget: (category: string, amount: number) => void;
}

export default function BudgetForm({ onSetBudget, budgets }: Props) {
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!category || !amount) return;
      onSetBudget(category, parseFloat(amount));
      setAmount('');
    };
    return (
            <div className="space-y-4 p-4 bg-white rounded-xl shadow max-w-md mx-auto">
              <h2 className="text-lg font-semibold">Set Budget</h2>
        
              <form onSubmit={handleSubmit} className="space-y-4">
                <Select onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.trim()}>
                        {cat.trim()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
        
                <Input
                  type="number"
                  placeholder="Budget Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
        
                <Button type="submit">Set Budget</Button>
              </form>
        
              {Object.keys(budgets).length > 0 && (
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Current Budgets</h3>
                  <ul className="space-y-1">
                    {Object.entries(budgets).map(([cat, amt]) => (
                      <li key={cat} className="flex justify-between">
                        <span>{cat}</span>
                        <span className="font-semibold">${amt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        }