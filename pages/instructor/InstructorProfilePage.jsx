import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { courseService } from '../../services/courseService';
import {
  User,
  Mail,
  Award,
  BookOpen,
  Users,
  Edit3,
  Calendar,
  Sparkles,
  Building
} from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input, TextArea } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

export function InstructorProfilePage() {
  const { user, updateProfile } = useAuth();
  const toast = useToast();

  const [courses, setCourses] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    title: user?.title || '',
    institution: user?.institution || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    expertise: (user?.expertise || []).join(', ')
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        title: user.title || '',
        institution: user.institution || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        expertise: (user.expertise || []).join(', ')
      });
      loadCourses();
    }
  }, [user]);

  const loadCourses = async () => {
    try {
      const list = await courseService.getCourses({ instructorId: user.id });
      setCourses(list);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile({
        name: formData.name.trim(),
        title: formData.title.trim(),
        institution: formData.institution.trim(),
        bio: formData.bio.trim(),
        avatar: formData.avatar.trim(),
        expertise: formData.expertise.split(',').map(s => s.trim()).filter(Boolean)
      });
      toast.success('Instructor profile updated successfully');
      setIsEditModalOpen(false);
    } catch (err) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const totalLearners = courses.reduce((acc, curr) => acc + (curr.studentsCount || 0), 0);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Profile Card */}
      <div className="bg-surface-card border border-surface-border rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <Avatar
            src={user?.avatar}
            fallbackText={user?.name || 'Instructor'}
            size="2xl"
            className="ring-4 ring-slate-800"
          />

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {user?.name}
              </h1>
              <Badge variant="amber" size="sm">
                Faculty Instructor
              </Badge>
            </div>

            <p className="text-sm font-semibold text-brand-400">
              {user?.title || 'Distinguished Software Systems Professor'}
            </p>

            <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Building className="w-3.5 h-3.5" />
              <span>{user?.institution || 'Department of Computer Science'}</span>
            </p>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed pt-2">
              {user?.bio || 'Passionate educator committed to engineering excellence and scalable systems.'}
            </p>

            {/* Expertise tags */}
            {user?.expertise?.length > 0 && (
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-2">
                {user.expertise.map((exp, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-surface-border"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            )}
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

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border text-center space-y-1">
          <div className="text-2xl font-black text-white">{courses.length}</div>
          <div className="text-xs text-slate-400 uppercase font-semibold">Authored Courses</div>
        </div>
        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border text-center space-y-1">
          <div className="text-2xl font-black text-brand-400">{totalLearners}</div>
          <div className="text-xs text-slate-400 uppercase font-semibold">Total Students</div>
        </div>
        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border text-center space-y-1">
          <div className="text-2xl font-black text-emerald-400">4.92</div>
          <div className="text-xs text-slate-400 uppercase font-semibold">Average Rating</div>
        </div>
        <div className="p-5 rounded-2xl bg-surface-card border border-surface-border text-center space-y-1">
          <div className="text-2xl font-black text-sky-400">100%</div>
          <div className="text-xs text-slate-400 uppercase font-semibold">Faculty Approval</div>
        </div>
      </div>

      {/* Authored Courses List */}
      <div className="bg-surface-card border border-surface-border rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white">Authored Curricula</h3>
        <div className="divide-y divide-surface-border/50">
          {courses.map(course => (
            <div key={course.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant={course.published ? 'emerald' : 'default'} size="sm">
                    {course.published ? 'Published' : 'Draft'}
                  </Badge>
                  <span className="text-xs text-brand-400 font-semibold">{course.category}</span>
                </div>
                <h4 className="font-bold text-sm text-white">{course.title}</h4>
                <p className="text-xs text-slate-400">
                  {course.modules?.length || 0} modules • {course.studentsCount || 0} enrolled students
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.location.href = `/instructor/courses/${course.id}/builder`}
                >
                  Curriculum Builder
                </Button>
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
        title="Edit Faculty Profile"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Academic Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Lead Distributed Systems Architect"
          />
          <Input
            label="Institution / Department"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            placeholder="e.g. Department of Computer Science & Engineering"
          />
          <Input
            label="Avatar Image URL"
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
          />
          <Input
            label="Areas of Expertise (Comma separated)"
            value={formData.expertise}
            onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
            placeholder="e.g. Distributed Systems, Java, Spring Boot, Microservices"
          />
          <TextArea
            label="Academic Biography"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={4}
          />
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={saving}>
              Save Profile
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
