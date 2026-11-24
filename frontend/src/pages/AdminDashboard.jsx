import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Users, CreditCard, Activity, Percent, ShieldCheck } from 'lucide-react';

export default function AdminDashboard() {
  const [interestRate, setInterestRate] = useState('4.5');
  const [rateApplied, setRateApplied] = useState(false);

  const stats = [
    { title: 'Total Customers', value: '1,420', icon: Users },
    { title: 'Active Accounts', value: '2,890', icon: CreditCard },
    { title: 'Transaction Volume', value: '$3.4M', icon: Activity },
    { title: 'Base Interest Rate', value: `${interestRate}%`, icon: Percent },
  ];

  const accounts = [
    { id: 1, customer: 'Jane Doe', number: '1000849201', type: 'SAVINGS', balance: '$18,320.50', status: 'ACTIVE' },
    { id: 2, customer: 'John Smith', number: '1000849202', type: 'CHECKING', balance: '$4,150.20', status: 'ACTIVE' },
    { id: 3, customer: 'Alice Johnson', number: '1000849203', type: 'SAVINGS', balance: '$0.00', status: 'FROZEN' },
  ];

  const handleApplyInterest = (e) => {
    e.preventDefault();
    setRateApplied(true);
    setTimeout(() => setRateApplied(false), 4000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-ink">Administrator Control Portal</h2>
          <p className="text-xs text-muted mt-1">System-wide monitoring, user governance, and financial policy configuration.</p>
        </div>
        <Badge variant="active" className="text-xs">SYSTEM OPERATIONAL</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Card key={idx}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">{s.title}</span>
                <div className="w-8 h-8 rounded-control bg-brand-50 text-brand-500 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-ink mt-3">{s.value}</div>
            </Card>
          );
        })}
      </div>

      {/* Customer Accounts Oversight */}
      <Card title="System Bank Accounts" subtitle="Manage account states and security restrictions">
        <div className="overflow-x-auto -mx-5 -mb-5">
          <table className="w-full text-left border-collapse text-sm">
            <thead className="bg-canvas border-b border-line text-xs font-semibold text-muted">
              <tr>
                <th className="py-3 px-5">Customer</th>
                <th className="py-3 px-4">Account Number</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4 text-right">Balance</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {accounts.map((acc) => (
                <tr key={acc.id} className="hover:bg-gray-50/75 transition-colors">
                  <td className="py-3 px-5 font-semibold text-ink">{acc.customer}</td>
                  <td className="py-3 px-4 font-mono text-xs">{acc.number}</td>
                  <td className="py-3 px-4 text-xs font-medium text-muted">{acc.type}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-ink">{acc.balance}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge variant={acc.status.toLowerCase()}>{acc.status}</Badge>
                  </td>
                  <td className="py-3 px-5 text-right space-x-2">
                    {acc.status === 'ACTIVE' ? (
                      <Button size="sm" variant="danger">Freeze</Button>
                    ) : (
                      <Button size="sm" variant="outline">Activate</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Interest Rate Configuration */}
      <Card title="Interest Rate Management" subtitle="Configure annual percentage rate for savings accounts">
        {rateApplied && (
          <div className="mb-4 p-3 rounded-control bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            Annual interest rate updated and simulated credits computed!
          </div>
        )}
        <form onSubmit={handleApplyInterest} className="flex flex-col sm:flex-row items-end gap-3 max-w-lg">
          <div className="flex-1 w-full">
            <Input
              label="Annual Percentage Rate (%)"
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              required
            />
          </div>
          <Button type="submit" variant="primary">
            Update & Apply
          </Button>
        </form>
      </Card>
    </div>
  );
}
