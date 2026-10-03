import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-surface-card border border-surface-border rounded-3xl p-8 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400 flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-brand-500">Error 404</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-3">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed mb-8">
          The curriculum, module, or platform resource you requested does not exist or has been relocated within the learning index.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button variant="secondary" onClick={() => navigate(-1)} leftIcon={<ArrowLeft className="w-4 h-4" />} className="w-full sm:w-auto">
            Go Back
          </Button>
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" leftIcon={<Home className="w-4 h-4" />} className="w-full sm:w-auto">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
