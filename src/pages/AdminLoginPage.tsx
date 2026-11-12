import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  UserCheck,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  title: string;
  lastLogin: string;
}

interface AdminLoginPageProps {
  onLoginSuccess: (user: AdminUser) => void;
  onBackToSite: () => void;
}

const DEMO_ACCOUNTS: AdminUser[] = [
  {
    id: 'user-1',
    name: 'Jerin VR',
    email: 'jerin@jerinrealtors.com',
    role: 'Managing Director & Founder',
    title: 'Super Administrator',
    avatar: '/assets/aistudio/image_d9f7a683.png',
    lastLogin: 'Just now',
  },
  {
    id: 'user-2',
    name: 'Marcus Sterling',
    email: 'm.sterling@jerinrealtors.com',
    role: 'Executive Director, Capital Office',
    title: 'Portfolio Manager',
    avatar: '/images/director_portrait_1793437949528.jpg',
    lastLogin: 'Today, 09:15 AM',
  },
  {
    id: 'user-3',
    name: 'Sophia Chen',
    email: 's.chen@jerinrealtors.com',
    role: 'Director of Architectural Due Diligence',
    title: 'Technical Director',
    avatar: '/images/director_portrait_1793437949528.jpg',
    lastLogin: 'Yesterday, 05:40 PM',
  },
];

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onBackToSite,
}) => {
  const [email, setEmail] = useState('jerin@jerinrealtors.com');
  const [password, setPassword] = useState('admin123');
  const [selectedRole, setSelectedRole] = useState('Managing Director & Partner');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please provide both your registered work email and admin passcode.');
      return;
    }

    setIsLoading(true);

    // Realistic authentication flow with session generation
    setTimeout(() => {
      setIsLoading(false);
      // Valid if matching credentials or any aura prime email
      const matchedDemo = DEMO_ACCOUNTS.find(
        (acc) => acc.email.toLowerCase() === email.toLowerCase()
      );

      const user: AdminUser = matchedDemo || {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').replace(/^\w/, (c) => c.toUpperCase()) || 'Administrator',
        email: email,
        role: selectedRole,
        title: 'Executive Admin',
        avatar: '/images/director_portrait_1793437949528.jpg',
        lastLogin: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      if (rememberMe) {
        try {
          localStorage.setItem('aura_prime_admin_session', JSON.stringify(user));
        } catch (err) {
          console.warn('Storage failed', err);
        }
      }

      onLoginSuccess(user);
    }, 450);
  };

  const handleSelectDemo = (account: AdminUser) => {
    setEmail(account.email);
    setPassword('admin123');
    setSelectedRole(account.role);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#111827] to-[#1A162B] text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#6246EA] selection:text-white">
      {/* Top Bar with Return to Public Site */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <img
            src="/images/Jerin-Realty-Logo.png"
            alt="Jerin Realty Logo"
            className="h-14 w-auto object-contain"
          />
          <div>
            <span className="text-[10px] uppercase font-mono block text-slate-400 tracking-wider">
              Management Portal
            </span>
          </div>
        </div>

        <button
          onClick={onBackToSite}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs text-slate-300 hover:text-white transition-all shadow-sm"
        >
          <span>View Public Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-8">
        <div className="bg-[#111827]/90 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Top Accent Glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043]" />

          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6246EA]/20 border border-[#6246EA]/30 text-[#A594FD] text-[11px] font-mono font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Executive Single Sign-On</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-editorial text-white tracking-tight">
              Admin Login Desk
            </h1>
            <p className="text-xs text-slate-400">
              Sign in to manage Bengaluru luxury estates, leads CRM, and media distributions.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@auraprime.com"
                  required
                  className="w-full bg-[#0B0F19]/80 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6246EA] focus:ring-1 focus:ring-[#6246EA] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Access Passcode</span>
                <span className="text-[10px] text-slate-500 font-mono">Demo: admin123</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#0B0F19]/80 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#6246EA] focus:ring-1 focus:ring-[#6246EA] transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Role Assignment */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Designated Access Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-[#0B0F19]/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#6246EA] transition-all"
              >
                <option value="Managing Director & Partner">Managing Director & Partner (Full Admin)</option>
                <option value="Executive Director, Capital Office">Executive Director, Capital Office</option>
                <option value="Senior Portfolio Manager">Senior Portfolio Manager (Inventory Desk)</option>
                <option value="Client Concierge & CRM Lead">Client Concierge & CRM Lead</option>
              </select>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 text-[#6246EA] focus:ring-[#6246EA] bg-slate-900"
                />
                <span>Remember this session</span>
              </label>
              <span className="text-[11px] text-slate-500">256-bit TLS</span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#6246EA] via-[#2878FF] to-[#FF7043] shadow-lg shadow-[#6246EA]/25 hover:shadow-xl hover:shadow-[#6246EA]/35 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Fillers */}
          <div className="mt-6 pt-5 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                1-Click Executive Profiles
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full font-mono">
                Instant Fill
              </span>
            </div>
            <div className="space-y-1.5">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => handleSelectDemo(acc)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between group ${
                    email === acc.email
                      ? 'bg-slate-800/90 border-[#6246EA]/60 text-white'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={acc.avatar}
                      alt={acc.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-white">
                        {acc.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {acc.role}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Security Badges */}
      <div className="max-w-md w-full mx-auto text-center space-y-1.5 text-slate-500 text-[11px]">
        <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> End-to-End Encryption
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Role-Based Access
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Audit Logged
          </span>
        </div>
        <p>© 2026 Jerin Realty Luxury Real Estate Private Limited. Confidential Brokerage Workspace.</p>
      </div>
    </div>
  );
};
