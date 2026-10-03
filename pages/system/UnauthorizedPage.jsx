import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, ArrowLeft, LayoutDashboard, Home } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

export function UnauthorizedPage() {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const getDashboardPath = () => {
    if (role === 'ADMIN') return '/admin/dashboard';
    if (role === 'INSTRUCTOR') return '/instructor/dashboard';
    return '/student/dashboard';
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-surface-card border border-rose-500/30 rounded-3xl p-8 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-rose-400">Access Denied (403)</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-3">
          Restricted Academic Zone
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">
          Your current account role does not have authorization to view or manipulate this specific portal.
        </p>

        {user && (
          <div className="p-3 mb-6 rounded-xl bg-slate-900 border border-surface-border inline-flex items-center gap-2 text-xs">
            <span className="text-slate-400">Current Role:</span>
            <Badge variant="rose" size="sm">
              {role}
            </Badge>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="secondary" onClick={() => navigate(-1)} leftIcon={<ArrowLeft className="w-4 h-4" />} className="w-full sm:w-auto">
            Go Back
          </Button>
          {user ? (
            <Link to={getDashboardPath()} className="w-full sm:w-auto">
              <Button variant="primary" leftIcon={<LayoutDashboard className="w-4 h-4" />} className="w-full sm:w-auto">
                My Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/login" className="w-full sm:w-auto">
              <Button variant="primary" leftIcon={<Home className="w-4 h-4" />} className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
