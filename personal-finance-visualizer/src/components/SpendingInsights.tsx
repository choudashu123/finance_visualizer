interface Props {
    budgets: Record<string, number>;
    transactions: { category: string; amount: number }[];
  }
  
  export default function SpendingInsights({ budgets, transactions }: Props) {
    const insights: string[] = [];
  
    const spending: Record<string, number> = {};
    for (const txn of transactions) {
      spending[txn.category] = (spending[txn.category] || 0) + txn.amount;
    }
  
    for (const category in budgets) {
      const actual = spending[category] || 0;
      const budget = budgets[category];
      if (actual > budget) {
        insights.push(`⚠️ You overspent in ${category} by $${(actual - budget).toFixed(2)}.`);
      } else {
        insights.push(`✅ You’re within budget for ${category}.`);
      }
    }
  
    return (
      <div className="mt-8 p-4 bg-yellow-50 border rounded">
        <h2 className="font-semibold mb-2">🔍 Spending Insights</h2>
        <ul className="list-disc list-inside space-y-1">
          {insights.map((msg, i) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      </div>
    );
  }
  