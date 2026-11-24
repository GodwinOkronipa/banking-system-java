import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Plus,
  ArrowRight,
  DollarSign
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('30 days');

  const summary = [
    { title: 'Total Balance', amount: '$24,560.80', change: '+12.4%', positive: true, icon: DollarSign },
    { title: 'Savings Account', amount: '$18,320.50', change: '+4.2%', positive: true, icon: CreditCard },
    { title: 'Checking Account', amount: '$6,240.30', change: '-1.8%', positive: false, icon: CreditCard },
  ];

  const recentTransactions = [
    { id: 1, desc: 'TechCorp Salary Deposit', type: 'DEPOSIT', amount: '+$3,450.00', positive: true, date: 'Today, 09:30 AM', account: 'Checking (...4921)' },
    { id: 2, desc: 'Grocery Supermarket', type: 'WITHDRAWAL', amount: '-$124.50', positive: false, date: 'Yesterday, 04:15 PM', account: 'Checking (...4921)' },
    { id: 3, desc: 'Transfer to Savings', type: 'TRANSFER_OUT', amount: '-$500.00', positive: false, date: 'Nov 20, 2026', account: 'Savings (...8104)' },
    { id: 4, desc: 'Monthly Interest Payment', type: 'INTEREST', amount: '+$38.20', positive: true, date: 'Nov 15, 2026', account: 'Savings (...8104)' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink">Welcome back, Jane</h2>
          <p className="text-xs text-muted mt-1">Here is the latest snapshot of your personal finances.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => navigate('/deposit')}>
            <ArrowDownLeft className="w-4 h-4 mr-1.5 text-emerald-600" /> Deposit
          </Button>
          <Button size="sm" variant="secondary" onClick={() => navigate('/deposit')}>
            <ArrowUpRight className="w-4 h-4 mr-1.5 text-red-600" /> Withdraw
          </Button>
          <Button size="sm" variant="primary" onClick={() => navigate('/transfer')}>
            Transfer Funds
          </Button>
        </div>
      </div>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summary.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} className="relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">{item.title}</span>
                <div className="w-8 h-8 rounded-control bg-brand-50 text-brand-500 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-bold text-ink tracking-tight">{item.amount}</div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className={`text-xs font-semibold ${item.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                    {item.change}
                  </span>
                  <span className="text-xs text-muted">vs last month</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Balance Over Time Card */}
      <Card
        title="Balance over time"
        subtitle="Historical financial trajectory"
        action={
          <div className="flex items-center gap-1 bg-canvas p-1 rounded-control text-xs font-medium text-muted">
            {['24 hours', '7 days', '30 days', '12 months'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  period === p ? 'bg-white text-ink font-semibold shadow-xs' : 'hover:text-ink'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        }
      >
        <div className="py-6 flex flex-col justify-between">
          <div className="h-44 w-full flex items-end gap-2 pt-6">
            {[35, 42, 40, 58, 62, 55, 68, 74, 70, 85, 82, 95].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full bg-brand-500/15 group-hover:bg-brand-500 rounded-t transition-colors duration-200"
                  style={{ height: `${val}%` }}
                />
                <span className="text-[10px] text-muted">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-muted pt-4 border-t border-line mt-4">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-brand-500 inline-block"></span> Main Balance Trend
            </span>
            <span className="font-semibold text-ink">Peak Balance: $25,100.00</span>
          </div>
        </div>
      </Card>

      {/* Recent Transactions Section */}
      <Card
        title="Recent Transactions"
        subtitle="Latest movements across all accounts"
        action={
          <Button size="sm" variant="ghost" onClick={() => navigate('/transactions')}>
            View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        }
      >
        <div className="divide-y divide-line -mx-5 -mb-5">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50/60 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${tx.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {tx.positive ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-sm font-semibold text-ink">{tx.desc}</div>
                  <div className="text-xs text-muted">{tx.account} • {tx.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-bold font-mono ${tx.positive ? 'text-emerald-600' : 'text-ink'}`}>
                  {tx.amount}
                </div>
                <Badge variant={tx.positive ? 'active' : 'neutral'} className="mt-0.5">
                  {tx.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
