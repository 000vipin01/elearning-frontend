import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { GraduationCap, User, Mail, Lock, BookOpen, AlertCircle } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export function RegisterPage() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role')?.toUpperCase() === 'INSTRUCTOR' ? 'INSTRUCTOR' : 'STUDENT';

  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState(initialRole);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your full legal name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid institutional or personal email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setIsLoading(true);
    try {
      const newUser = await register({
        name,
        email,
        password,
        role,
        title: title.trim() || (role === 'INSTRUCTOR' ? 'Adjunct Professor' : 'Computer Science Undergraduate')
      });

      toast.success(`Account registered! Welcome to NexusLMS, ${newUser.name}.`);

      if (role === 'INSTRUCTOR') {
        navigate('/instructor/dashboard', { replace: true });
      } else {
        navigate('/student/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Registration failed.');
      toast.error(err.message || 'Registration error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7 stroke-[2.5]" />
            </div>
          </Link>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Create an Academic Account
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Join the community of students and engineering scholars
          </p>
        </div>

        <div className="bg-surface-card border border-surface-border rounded-3xl p-6 sm:p-8 shadow-2xl">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Picker Tabs */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Registering As <span className="text-rose-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-900 border border-surface-border">
                <button
                  type="button"
                  onClick={() => setRole('STUDENT')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                    role === 'STUDENT'
                      ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Student Learner
                </button>
                <button
                  type="button"
                  onClick={() => setRole('INSTRUCTOR')}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                    role === 'INSTRUCTOR'
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Faculty Instructor
                </button>
              </div>
            </div>

            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jordan Hayes"
              icon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. j.hayes@university.edu"
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <Input
              label={role === 'INSTRUCTOR' ? 'Academic Department / Specialization' : 'Degree / Current Focus'}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={role === 'INSTRUCTOR' ? 'e.g. Associate Professor, AI Lab' : 'e.g. Senior CS Student'}
              icon={<BookOpen className="w-4 h-4" />}
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full mt-2 font-bold"
            >
              Complete Registration
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-surface-border/60 text-center text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-400 font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
