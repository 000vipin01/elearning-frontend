import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { enrollmentService } from '../../services/enrollmentService';
import { progressService } from '../../services/progressService';
import {
  User,
  Mail,
  GraduationCap,
  Calendar,
  BookOpen,
  Award,
  Edit3,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, TextArea } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { ProgressBar } from '../../components/ui/ProgressBar';

export function StudentProfilePage() {
  const { user, updateProfile } = useAuth();
  const toast = useToast();

  const [stats, setStats] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Edit form state
  const [formData, setFormData] = useState({
    name: user?.name || '',
    title: user?.title || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        title: user.title || '',
        bio: user.bio || '',
        avatar: user.avatar || ''
      });
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const [sStats, enrs] = await Promise.all([
        progressService.getStudentStats(user.id),
        enrollmentService.getStudentEnrollments(user.id)
      ]);
      setStats(sStats);
      setEnrollments(enrs);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(formData);
      toast.success('Profile updated successfully!');
      setIsEditModalOpen(false);
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-surface-card border border-surface-border rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <Avatar
            src={user?.avatar}
            fallbackText={user?.name || 'Student'}
            size="2xl"
            className="ring-4 ring-slate-800"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {user?.name}
              </h1>
              <Badge variant="sky" size="sm">
                Enrolled Scholar
              </Badge>
            </div>

            <p className="text-sm font-semibold text-brand-400">
              {user?.title || 'Computer Science Undergraduate'}
            </p>

            <p className="text-xs text-slate-300 max-w-xl leading-relaxed pt-1">
              {user?.bio || 'Dedicated software engineering student focusing on distributed architectures and algorithms.'}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-3 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Enrolled since {user?.joinedDate || '2024'}</span>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsEditModalOpen(true)}
            leftIcon={<Edit3 className="w-4 h-4" />}
            className="shrink-0"
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Learning Stats Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border text-center space-y-1">
          <div className="text-2xl font-black text-white">{stats?.totalEnrolled || 0}</div>
          <div className="text-xs text-slate-400 uppercase font-semibold">Enrolled Courses</div>
        </div>
        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border text-center space-y-1">
          <div className="text-2xl font-black text-emerald-400">{stats?.completedCourses || 0}</div>
          <div className="text-xs text-slate-400 uppercase font-semibold">Graduated Tracks</div>
        </div>
        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border text-center space-y-1">
          <div className="text-2xl font-black text-brand-400">{stats?.hoursSpent || 0}h</div>
          <div className="text-xs text-slate-400 uppercase font-semibold">Study Hours</div>
        </div>
        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border text-center space-y-1">
          <div className="text-2xl font-black text-sky-400">{stats?.averageProgress || 0}%</div>
          <div className="text-xs text-slate-400 uppercase font-semibold">Avg. Completion</div>
        </div>
      </div>

      {/* Enrolled Tracks Summary */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white">Active Curriculum Standing</h3>
        <div className="divide-y divide-surface-border/50">
          {enrollments.map(enr => (
            <div key={enr.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-sm font-bold text-white">{enr.course.title}</div>
                <div className="text-xs text-slate-400">
                  {enr.completedCount} of {enr.totalLessons} lessons completed • {enr.course.duration}
                </div>
              </div>
              <div className="w-full sm:w-48">
                <ProgressBar progress={enr.progressPercentage} variant="amber" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        size="md"
        title="Edit Profile Information"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Degree / Academic Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Senior CS Undergraduate"
          />
          <Input
            label="Avatar Image URL"
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            placeholder="https://..."
          />
          <TextArea
            label="Biography"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={3}
            placeholder="Brief description of your learning goals..."
          />
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={saving}>
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
