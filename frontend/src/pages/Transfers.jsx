import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ArrowLeftRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Transfers() {
  const [sourceAccount, setSourceAccount] = useState('1');
  const [destAccount, setDestAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleTransfer = (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (destAccount === '1000849201' && sourceAccount === '1') {
      setError('Cannot transfer funds to the same account.');
      return;
    }

    setSuccess({
      amount: `$${parseFloat(amount).toFixed(2)}`,
      dest: destAccount,
      ref: 'TRF-' + Math.floor(100000 + Math.random() * 900000),
    });
    setDestAccount('');
    setAmount('');
    setDescription('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card
        title="Transfer Funds"
        subtitle="Instantly send funds between internal accounts with atomic transaction guarantee"
      >
        {success && (
          <div className="mb-5 p-4 rounded-control bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <div className="font-semibold text-sm">Transfer Completed Successfully</div>
              <div className="text-xs mt-0.5">
                Sent <span className="font-bold">{success.amount}</span> to account <span className="font-mono">{success.dest}</span>. Reference: <code className="bg-emerald-100 px-1 rounded">{success.ref}</code>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-5 p-4 rounded-control bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <div className="text-xs font-semibold">{error}</div>
          </div>
        )}

        <form onSubmit={handleTransfer} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-ink mb-1.5">Source Account</label>
            <select
              value={sourceAccount}
              onChange={(e) => setSourceAccount(e.target.value)}
              className="w-full h-10 rounded-control border border-[#D0D5DD] bg-white px-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="1">Savings Account (•••• 9201) — $18,320.50</option>
              <option value="2">Checking Account (•••• 9202) — $6,240.30</option>
            </select>
          </div>

          <Input
            label="Destination Account Number"
            placeholder="e.g. 1000849202"
            value={destAccount}
            onChange={(e) => setDestAccount(e.target.value)}
            required
          />

          <Input
            label="Transfer Amount (USD)"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <Input
            label="Transfer Description / Reference Note"
            placeholder="e.g. Rent, Reimbursement, Gift"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button type="submit" variant="primary" className="w-full mt-2" icon={ArrowLeftRight}>
            Execute Fund Transfer
          </Button>
        </form>
      </Card>
    </div>
  );
}
