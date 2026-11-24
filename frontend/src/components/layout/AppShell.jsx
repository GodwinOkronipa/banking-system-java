import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CreditCard,
  ArrowDownCircle,
  ArrowLeftRight,
  History,
  FileText,
  ShieldCheck,
  LogOut,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';

export function AppShell({ children, isAdmin = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const customerNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Accounts', path: '/accounts', icon: CreditCard },
    { name: 'Deposits & Withdrawals', path: '/deposit', icon: ArrowDownCircle },
    { name: 'Transfers', path: '/transfer', icon: ArrowLeftRight },
    { name: 'Transactions', path: '/transactions', icon: History },
    { name: 'Statements', path: '/statements', icon: FileText },
  ];

  const adminNavItems = [
    { name: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Customers', path: '/admin/customers', icon: ShieldCheck },
    { name: 'Accounts', path: '/admin/accounts', icon: CreditCard },
    { name: 'Transactions', path: '/admin/transactions', icon: History },
  ];

  const navItems = isAdmin ? adminNavItems : customerNavItems;

  const getPageTitle = () => {
    const current = navItems.find((item) => location.pathname.startsWith(item.path));
    return current ? current.name : 'Banking Management';
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col md:flex-row">
      {/* Desktop Navigation Rail (72px wide) */}
      <aside className="hidden md:flex flex-col items-center w-[72px] bg-white border-r border-line py-5 justify-between fixed top-0 bottom-0 left-0 z-20">
        <div className="flex flex-col items-center gap-6 w-full">
          <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            B
          </div>
          <nav className="flex flex-col items-center gap-2 w-full px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={item.name}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-500 font-semibold shadow-xs'
                      : 'text-muted hover:text-ink hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col items-center gap-3 w-full px-2">
          <button
            onClick={() => navigate('/login')}
            title="Log out"
            className="w-11 h-11 rounded-xl flex items-center justify-center text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Page Area */}
      <div className="flex-1 md:pl-[72px] flex flex-col min-h-screen">
        {/* Top Header (72px high) */}
        <header className="h-[72px] bg-white border-b border-line px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-control text-muted hover:text-ink hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-xl font-bold text-ink">{getPageTitle()}</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center relative">
              <Search className="w-4 h-4 text-muted absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 pl-9 pr-4 rounded-control border border-line bg-canvas text-xs focus:outline-none focus:border-brand-500 focus:bg-white transition-colors w-48 lg:w-64"
              />
            </div>
            <button className="w-9 h-9 rounded-control border border-line flex items-center justify-center text-muted hover:text-ink hover:bg-gray-50 transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-line">
              <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-500 font-semibold text-xs flex items-center justify-center border border-brand-500/20">
                JD
              </div>
              <span className="hidden lg:inline text-xs font-semibold text-ink">Jane Doe</span>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-line px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-control text-sm font-medium ${
                    isActive ? 'bg-brand-50 text-brand-500' : 'text-muted hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        )}

        {/* Page Content Body */}
        <main className="p-6 max-w-[1440px] w-full mx-auto flex-1">{children}</main>
      </div>
    </div>
  );
}
