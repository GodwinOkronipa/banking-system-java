import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ArrowDownLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function DepositsWithdrawals() {
  const [tab, setTab] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [accountId, setAccountId] = useState('1');
  const [description, setDescription] = useState('');
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;
    const ref = 'TX-' + Math.floor(100000 + Math.random() * 900000);
    setSuccessMsg({
      type: tab.toUpperCase(),
      amount: `$${parseFloat(amount).toFixed(2)}`,
      reference: ref,
    });
    setAmount('');
    setDescription('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex bg-white p-1 rounded-control border border-line">
        <button
          onClick={() => { setTab('deposit'); setSuccessMsg(null); }}
          className={`flex-1 py-2.5 rounded text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
            tab === 'deposit' ? 'bg-brand-50 text-brand-500' : 'text-muted hover:text-ink'
          }`}
        >
          <ArrowDownLeft className="w-4 h-4 text-emerald-600" /> Deposit Funds
        </button>
        <button
          onClick={() => { setTab('withdraw'); setSuccessMsg(null); }}
          className={`flex-1 py-2.5 rounded text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
            tab === 'withdraw' ? 'bg-brand-50 text-brand-500' : 'text-muted hover:text-ink'
          }`}
        >
          <ArrowUpRight className="w-4 h-4 text-red-600" /> Withdraw Funds
        </button>
      </div>

      <Card
        title={tab === 'deposit' ? 'Deposit to Account' : 'Withdraw from Account'}
        subtitle={tab === 'deposit' ? 'Add funds securely to your selected bank account' : 'Withdraw funds subject to available balance checks'}
      >
        {successMsg && (
          <div className="mb-5 p-4 rounded-control bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold text-sm">Transaction Successful!</div>
              <div className="text-xs mt-0.5">
                Processed {successMsg.type} of <span className="font-bold">{successMsg.amount}</span>. Reference: <code className="bg-emerald-100 px-1 py-0.5 rounded">{successMsg.reference}</code>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">Select Account</label>
            <select
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              className="w-full h-10 rounded-control border border-[#D0D5DD] bg-white px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="1">Savings Account (•••• 9201) — $18,320.50</option>
              <option value="2">Checking Account (•••• 9202) — $6,240.30</option>
            </select>
          </div>

          <Input
            label="Amount (USD)"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <Input
            label="Description / Purpose (Optional)"
            placeholder="e.g. Salary, ATM, Bill payment"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button type="submit" variant="primary" className="w-full mt-2">
            Confirm {tab === 'deposit' ? 'Deposit' : 'Withdrawal'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
