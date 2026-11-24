import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Plus, CreditCard, ShieldAlert } from 'lucide-react';

export default function Accounts() {
  const [showModal, setShowModal] = useState(false);
  const [accountType, setAccountType] = useState('SAVINGS');

  const accounts = [
    { id: 1, number: '1000849201', type: 'SAVINGS', balance: '$18,320.50', status: 'ACTIVE', created: 'Jan 15, 2026' },
    { id: 2, number: '1000849202', type: 'CHECKING', balance: '$6,240.30', status: 'ACTIVE', created: 'Feb 10, 2026' },
    { id: 3, number: '1000849203', type: 'SAVINGS', balance: '$0.00', status: 'FROZEN', created: 'Oct 04, 2026' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-ink">My Bank Accounts</h2>
          <p className="text-xs text-muted mt-1">Manage and view balances across your active accounts.</p>
        </div>
        <Button onClick={() => setShowModal(true)} icon={Plus}>
          Open New Account
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {accounts.map((acc) => (
          <Card key={acc.id} className="relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <Badge variant={acc.status.toLowerCase()}>{acc.status}</Badge>
              </div>
              <div className="text-xs font-semibold text-muted tracking-wider uppercase">{acc.type} ACCOUNT</div>
              <div className="text-lg font-mono font-bold text-ink mt-0.5">•••• •••• {acc.number.slice(-4)}</div>
            </div>

            <div className="pt-6 mt-6 border-t border-line">
              <span className="text-xs text-muted">Available Balance</span>
              <div className="text-2xl font-bold text-ink mt-0.5">{acc.balance}</div>
              <div className="text-[11px] text-muted mt-2">Opened on {acc.created}</div>
            </div>
          </Card>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-line rounded-card max-w-md w-full p-6 shadow-modal">
            <h3 className="text-lg font-bold text-ink">Open a New Bank Account</h3>
            <p className="text-xs text-muted mt-1 mb-4">Choose account type to configure your new deposit account.</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink mb-2">Account Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAccountType('SAVINGS')}
                    className={`p-3 rounded-control border text-left transition-colors ${
                      accountType === 'SAVINGS'
                        ? 'border-brand-500 bg-brand-50 text-brand-600'
                        : 'border-[#D0D5DD] hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold text-sm">Savings</div>
                    <div className="text-xs opacity-75 mt-0.5">Earns annual interest</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType('CHECKING')}
                    className={`p-3 rounded-control border text-left transition-colors ${
                      accountType === 'CHECKING'
                        ? 'border-brand-500 bg-brand-50 text-brand-600'
                        : 'border-[#D0D5DD] hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold text-sm">Checking</div>
                    <div className="text-xs opacity-75 mt-0.5">Everyday transactions</div>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-line">
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setShowModal(false)}>
                  Create Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
