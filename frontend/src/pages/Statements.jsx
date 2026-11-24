import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Download, Printer, Calendar, FileText } from 'lucide-react';

export default function Statements() {
  const [account, setAccount] = useState('1');
  const [startDate, setStartDate] = useState('2026-11-01');
  const [endDate, setEndDate] = useState('2026-11-24');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-ink">Account Statements</h2>
          <p className="text-xs text-muted mt-1">Generate official periodic statements with opening and closing balances.</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" icon={Printer} onClick={() => window.print()}>
            Print
          </Button>
          <Button size="sm" variant="primary" icon={Download}>
            Download PDF
          </Button>
        </div>
      </div>

      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 pb-6 border-b border-line">
          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">Select Account</label>
            <select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="w-full h-10 rounded-control border border-[#D0D5DD] bg-white px-3 text-sm text-ink focus:outline-none focus:border-brand-500"
            >
              <option value="1">Savings Account (•••• 9201)</option>
              <option value="2">Checking Account (•••• 9202)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full h-10 rounded-control border border-[#D0D5DD] bg-white px-3 text-sm text-ink focus:outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full h-10 rounded-control border border-[#D0D5DD] bg-white px-3 text-sm text-ink focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        {/* Statement Sheet Simulation */}
        <div className="bg-canvas/50 border border-line rounded-control p-6 space-y-6">
          <div className="flex items-start justify-between border-b border-line pb-4">
            <div>
              <div className="text-lg font-bold text-ink">OFFICIAL ACCOUNT STATEMENT</div>
              <div className="text-xs text-muted mt-0.5">Java Banking Management System Ltd.</div>
            </div>
            <div className="text-right text-xs">
              <div className="font-semibold text-ink">Statement Period</div>
              <div className="text-muted">{startDate} to {endDate}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <span className="text-xs text-muted">Customer Name</span>
              <div className="font-semibold text-ink text-sm">Jane Doe</div>
            </div>
            <div>
              <span className="text-xs text-muted">Account Number</span>
              <div className="font-mono font-semibold text-ink text-sm">1000849201</div>
            </div>
            <div>
              <span className="text-xs text-muted">Opening Balance</span>
              <div className="font-bold text-ink text-sm font-mono">$15,480.00</div>
            </div>
            <div>
              <span className="text-xs text-muted">Closing Balance</span>
              <div className="font-bold text-emerald-600 text-sm font-mono">$18,320.50</div>
            </div>
          </div>

          <div className="text-xs font-semibold text-muted tracking-wider uppercase pt-2">Transaction Ledger</div>
          <div className="overflow-x-auto border border-line rounded-control bg-white">
            <table className="w-full text-left text-xs">
              <thead className="bg-canvas border-b border-line text-muted">
                <tr>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Reference</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3 text-right">Debit (-)</th>
                  <th className="py-2.5 px-3 text-right">Credit (+)</th>
                  <th className="py-2.5 px-3 text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line font-mono">
                <tr>
                  <td className="py-2 px-3">Nov 08, 2026</td>
                  <td className="py-2 px-3 text-muted">TX-984007</td>
                  <td className="py-2 px-3 font-sans font-medium">ATM Cash Deposit</td>
                  <td className="py-2 px-3 text-right">-</td>
                  <td className="py-2 px-3 text-right text-emerald-600">+$200.00</td>
                  <td className="py-2 px-3 text-right font-bold">$15,680.00</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Nov 15, 2026</td>
                  <td className="py-2 px-3 text-muted">TX-984009</td>
                  <td className="py-2 px-3 font-sans font-medium">Monthly Interest Payment</td>
                  <td className="py-2 px-3 text-right">-</td>
                  <td className="py-2 px-3 text-right text-emerald-600">+$38.20</td>
                  <td className="py-2 px-3 text-right font-bold">$15,718.20</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Nov 20, 2026</td>
                  <td className="py-2 px-3 text-muted">TX-984010</td>
                  <td className="py-2 px-3 font-sans font-medium">Transfer from Checking</td>
                  <td className="py-2 px-3 text-right">-</td>
                  <td className="py-2 px-3 text-right text-emerald-600">+$2,602.30</td>
                  <td className="py-2 px-3 text-right font-bold">$18,320.50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
}
