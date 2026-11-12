import React, { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userName: string, email: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'buyer' | 'owner' | 'investor'>('buyer');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = mode === 'register' ? (name || 'Client') : (email.split('@')[0] || 'Client');
    setSuccess(true);
    setTimeout(() => {
      onLoginSuccess(finalName, email || 'client@auraprime.in');
      setSuccess(false);
      onClose();
    }, 1200);
  };

  const handleQuickDemo = () => {
    setEmail('siddharth.narayan@auraprime.in');
    setName('Dr. Siddharth Narayan');
    onLoginSuccess('Dr. Siddharth Narayan', 'siddharth.narayan@auraprime.in');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#17213A]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden">
        {/* Header with Royal Purple gradient */}
        <div className="px-6 py-6 bg-gradient-to-r from-[#6246EA] to-[#2878FF] text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200 block">
              Jerin Realtors Private Access
            </span>
            <h2 className="text-xl font-bold font-editorial tracking-tight mt-0.5">
              {mode === 'signin' ? 'Welcome Back' : 'Create Private Portfolio Account'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-purple-100 p-2 bg-purple-50/50">
          <button
            onClick={() => setMode('signin')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'signin'
                ? 'bg-white text-[#6246EA] shadow-sm'
                : 'text-[#727B91] hover:text-[#17213A]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-white text-[#6246EA] shadow-sm'
                : 'text-[#727B91] hover:text-[#17213A]'
            }`}
          >
            Register Account
          </button>
        </div>

        {success ? (
          <div className="p-10 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#12A878] flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-[#17213A]">Authenticated Successfully</h3>
            <p className="text-xs text-[#727B91]">Loading your personalized Bengaluru estate showroom...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label className="text-xs font-bold text-[#727B91] uppercase block mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#727B91] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Singhal"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-purple-50/60 border border-purple-200 rounded-xl pl-9 pr-3 py-2 text-sm text-[#17213A] focus:outline-none focus:ring-2 focus:ring-[#6246EA]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#727B91] uppercase block mb-1">
                    I Am A
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['buyer', 'owner', 'investor'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`py-1.5 text-xs font-bold rounded-xl capitalize border transition-all ${
                          role === r
                            ? 'bg-[#6246EA] text-white border-[#6246EA]'
                            : 'bg-purple-50/60 border-purple-200 text-[#727B91]'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-bold text-[#727B91] uppercase block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#727B91] absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-purple-50/60 border border-purple-200 rounded-xl pl-9 pr-3 py-2 text-sm text-[#17213A] focus:outline-none focus:ring-2 focus:ring-[#6246EA]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#727B91] uppercase block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#727B91] absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-purple-50/60 border border-purple-200 rounded-xl pl-9 pr-3 py-2 text-sm text-[#17213A] focus:outline-none focus:ring-2 focus:ring-[#6246EA]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#6246EA] to-[#2878FF] shadow-lg hover:shadow-xl transition-all"
            >
              {mode === 'signin' ? 'Sign In to Private Portal' : 'Create Account'}
            </button>

            {/* Quick Demo Fill */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleQuickDemo}
                className="text-xs font-semibold text-[#6246EA] hover:underline"
              >
                Instant 1-Click Demo Login (Pre-authenticated)
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
