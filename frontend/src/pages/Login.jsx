import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.includes('admin')) {
      navigate('/admin/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-12 h-12 rounded-2xl bg-brand-500 mx-auto flex items-center justify-center text-white font-bold text-2xl shadow-sm">
          B
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink">Sign in to your account</h2>
        <p className="mt-1 text-xs text-muted">
          Access your simulated banking portal, accounts and services
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Card>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              icon={Mail}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center text-muted">
                <input type="checkbox" className="rounded border-gray-300 text-brand-500 focus:ring-brand-500 mr-2" />
                Remember me
              </label>
              <a href="#" className="font-semibold text-brand-500 hover:text-brand-600">
                Forgot password?
              </a>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-line text-center text-xs text-muted">
            Do not have an account?{' '}
            <Link to="/register" className="font-semibold text-brand-500 hover:text-brand-600">
              Register here
            </Link>
          </div>
        </Card>

        <div className="mt-4 text-center">
          <p className="text-[11px] text-muted">
            Tip: Use <code className="bg-white px-1.5 py-0.5 rounded border border-line">admin@bank.com</code> for administrator dashboard
          </p>
        </div>
      </div>
    </div>
  );
}
