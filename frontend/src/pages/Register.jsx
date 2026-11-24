import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-12 h-12 rounded-2xl bg-brand-500 mx-auto flex items-center justify-center text-white font-bold text-2xl shadow-sm">
          B
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink">Create customer account</h2>
        <p className="mt-1 text-xs text-muted">
          Register with the banking management system
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Card>
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              icon={User}
              placeholder="Jane Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <Input
              label="Email address"
              type="email"
              icon={Mail}
              placeholder="jane@example.com"
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

            <Input
              label="Confirm Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="primary" className="w-full mt-2">
              Register Account
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-line text-center text-xs text-muted">
            Already registered?{' '}
            <Link to="/login" className="font-semibold text-brand-500 hover:text-brand-600">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
