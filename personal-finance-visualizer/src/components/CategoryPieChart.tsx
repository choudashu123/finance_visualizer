import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction } from '@/types/transaction';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56'];

interface Props {
    transactions : Transaction[];
}

export default function CategoryPieChart ({ transactions }: Props) {
    const categoryData = transactions.reduce((acc: Record<string, number>, txn) =>{
        acc[txn.category] = (acc[txn.category] || 0) + txn.amount;
        return acc;
    }, {});
    const data = Object.entries(categoryData).map(([category, amount]) => ({
        name: category,
        value: amount,
    }));

    if (data.length === 0) return null; 

    return (
        <div className="mt-10">
      <h2 className="text-lg font-semibold mb-2 text-center">Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    );
}