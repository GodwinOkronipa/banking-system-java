import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Search, Download, Filter, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  const transactions = [
    { id: 1, desc: 'TechCorp Salary Deposit', type: 'DEPOSIT', amount: '+$3,450.00', positive: true, date: 'Nov 24, 2026 09:30 AM', account: 'Checking (...4921)', ref: 'TX-984012' },
    { id: 2, desc: 'Grocery Supermarket', type: 'WITHDRAWAL', amount: '-$124.50', positive: false, date: 'Nov 23, 2026 04:15 PM', account: 'Checking (...4921)', ref: 'TX-984011' },
    { id: 3, desc: 'Transfer to Savings', type: 'TRANSFER_OUT', amount: '-$500.00', positive: false, date: 'Nov 20, 2026 11:00 AM', account: 'Checking (...4921)', ref: 'TX-984010' },
    { id: 4, desc: 'Monthly Interest Payment', type: 'INTEREST', amount: '+$38.20', positive: true, date: 'Nov 15, 2026 12:00 AM', account: 'Savings (...8104)', ref: 'TX-984009' },
    { id: 5, desc: 'Electric & Utility Bill', type: 'WITHDRAWAL', amount: '-$89.00', positive: false, date: 'Nov 12, 2026 02:45 PM', account: 'Checking (...4921)', ref: 'TX-984008' },
    { id: 6, desc: 'ATM Cash Deposit', type: 'DEPOSIT', amount: '+$200.00', positive: true, date: 'Nov 08, 2026 03:10 PM', account: 'Savings (...8104)', ref: 'TX-984007' },
  ];

  const filtered = transactions.filter((t) => {
    const matchesSearch = t.desc.toLowerCase().includes(searchTerm.toLowerCase()) || t.ref.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink">Transaction History</h2>
          <p className="text-xs text-muted mt-1">Review ledger transactions across all associated accounts.</p>
        </div>
        <Button size="sm" variant="secondary" icon={Download}>
          Export CSV
        </Button>
      </div>

      <Card>
        {/* Filter / Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 mb-4 border-b border-line">
          <div className="w-full sm:w-72">
            <Input
              icon={Search}
              placeholder="Search by merchant, description or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-muted flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Type:
            </span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="h-10 rounded-control border border-[#D0D5DD] bg-white px-3 text-xs text-ink focus:outline-none focus:border-brand-500"
            >
              <option value="ALL">All Types</option>
              <option value="DEPOSIT">Deposit</option>
              <option value="WITHDRAWAL">Withdrawal</option>
              <option value="TRANSFER_OUT">Transfer</option>
              <option value="INTEREST">Interest</option>
            </select>
          </div>
        </div>

        {/* Dense Transactions Table */}
        <div className="overflow-x-auto -mx-5 -mb-5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-canvas border-b border-line text-xs font-semibold text-muted">
                <th className="py-3 px-5">Description</th>
                <th className="py-3 px-4">Account</th>
                <th className="py-3 px-4">Reference</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-5 text-right">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-sm">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/75 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-ink flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                      {tx.positive ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
                    </div>
                    {tx.desc}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-muted font-medium">{tx.account}</td>
                  <td className="py-3.5 px-4 font-mono text-xs text-muted">{tx.ref}</td>
                  <td className="py-3.5 px-4 text-xs text-muted">{tx.date}</td>
                  <td className={`py-3.5 px-4 text-right font-bold font-mono ${tx.positive ? 'text-emerald-600' : 'text-ink'}`}>
                    {tx.amount}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Badge variant={tx.positive ? 'active' : 'neutral'}>
                      {tx.type}
                    </Badge>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted text-sm">
                    No transactions match the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
