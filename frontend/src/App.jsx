import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';

import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import DepositsWithdrawals from './pages/DepositsWithdrawals';
import Transfers from './pages/Transfers';
import Transactions from './pages/Transactions';
import Statements from './pages/Statements';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer routes wrapped in AppShell */}
        <Route
          path="/dashboard"
          element={
            <AppShell>
              <Dashboard />
            </AppShell>
          }
        />
        <Route
          path="/accounts"
          element={
            <AppShell>
              <Accounts />
            </AppShell>
          }
        />
        <Route
          path="/deposit"
          element={
            <AppShell>
              <DepositsWithdrawals />
            </AppShell>
          }
        />
        <Route
          path="/transfer"
          element={
            <AppShell>
              <Transfers />
            </AppShell>
          }
        />
        <Route
          path="/transactions"
          element={
            <AppShell>
              <Transactions />
            </AppShell>
          }
        />
        <Route
          path="/statements"
          element={
            <AppShell>
              <Statements />
            </AppShell>
          }
        />

        {/* Administrator routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AppShell isAdmin={true}>
              <AdminDashboard />
            </AppShell>
          }
        />
        <Route
          path="/admin/*"
          element={
            <AppShell isAdmin={true}>
              <AdminDashboard />
            </AppShell>
          }
        />

        {/* Default fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
