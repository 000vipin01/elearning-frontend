import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { GraduationCap, Sparkles, Lock, Mail, AlertCircle } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export function LoginPage() {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const redirectAfterLogin = (role) => {
    // Check if user came from a protected route
    const fromPath = location.state?.from?.pathname;
    if (fromPath && !fromPath.startsWith('/login') && !fromPath.startsWith('/register')) {
      navigate(fromPath, { replace: true });
      return;
    }

    if (role === 'ADMIN') navigate('/admin/dashboard', { replace: true });
    else if (role === 'INSTRUCTOR') navigate('/instructor/dashboard', { replace: true });
    else navigate('/student/dashboard', { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const loggedUser = await login(email, password);
      toast.success(`Welcome back, ${loggedUser.name}!`);
      redirectAfterLogin(loggedUser.role);
    } catch (err) {
      setError(err.message || 'Login failed. Please verify credentials.');
      toast.error(err.message || 'Authentication error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
    setIsLoading(true);
    try {
      const loggedUser = await login(demoEmail, demoPassword);
      toast.success(`Logged in as ${loggedUser.role}: ${loggedUser.name}`);
      redirectAfterLogin(loggedUser.role);
    } catch (err) {
      setError(err.message || 'Failed to authenticate demo account.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full">
        {/* Brand Icon & Heading */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7 stroke-[2.5]" />
            </div>
          </Link>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Sign In to Nexus<span className="text-brand-500">LMS</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access your courses, faculty studio, or administration portal
          </p>
        </div>

        {/* 1-Click Demo Accounts Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-surface-subtle/80 border border-surface-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-400">
              <Sparkles className="w-4 h-4" />
              <span>1-Click Presentation Accounts</span>
            </div>
            <Badge variant="amber" size="sm">College Demo</Badge>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('student@elearn.com', 'student123')}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-sky-500/30 text-left transition-colors group"
            >
              <div className="text-xs font-bold text-sky-400">Student</div>
              <div className="text-[10px] text-slate-400 truncate">student@elearn.com</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('instructor@elearn.com', 'instructor123')}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-left transition-colors group"
            >
              <div className="text-xs font-bold text-amber-400">Instructor</div>
              <div className="text-[10px] text-slate-400 truncate">instructor@elearn.com</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin@elearn.com', 'admin123')}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-rose-500/30 text-left transition-colors group"
            >
              <div className="text-xs font-bold text-rose-400">Admin</div>
              <div className="text-[10px] text-slate-400 truncate">admin@elearn.com</div>
            </button>
          </div>
        </div>

        {/* Main Login Card */}
        <div className="bg-surface-card border border-surface-border rounded-3xl p-6 sm:p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@elearn.com"
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 select-none">
                <input type="checkbox" defaultChecked className="rounded border-surface-border bg-slate-900 text-brand-500 focus:ring-brand-500/40" />
                <span>Remember session</span>
              </label>
              <span className="text-brand-400 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full mt-2 font-bold"
            >
              Sign In to Account
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-surface-border/60 text-center text-xs text-slate-400">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-brand-400 font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
