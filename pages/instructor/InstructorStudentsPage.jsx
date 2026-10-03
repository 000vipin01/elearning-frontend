import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { courseService } from '../../services/courseService';
import { enrollmentService } from '../../services/enrollmentService';
import { storageService } from '../../services/storageService';
import {
  Users,
  Search,
  BookOpen,
  CheckCircle2,
  Clock,
  Mail,
  GraduationCap
} from 'lucide-react';
import { Input, Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Table } from '../../components/ui/EmptyState';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';

export function InstructorStudentsPage() {
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      setLoading(true);
      try {
        const myCourses = await courseService.getCourses({ instructorId: user.id });
        setCourses(myCourses);

        const myCourseIds = new Set(myCourses.map(c => c.id));
        const allEnrollments = storageService.getEnrollments().filter(e => myCourseIds.has(e.courseId));
        const allUsers = storageService.getUsers();

        const enriched = allEnrollments.map(enr => {
          const student = allUsers.find(u => u.id === enr.userId) || {
            name: 'Enrolled Learner',
            email: 'student@example.edu',
            avatar: ''
          };
          const course = myCourses.find(c => c.id === enr.courseId) || { title: 'Unknown Course' };
          return {
            ...enr,
            student,
            course
          };
        });

        setEnrollments(enriched);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  const filtered = enrollments.filter(enr => {
    const matchesCourse = selectedCourseId === 'ALL' || enr.courseId === selectedCourseId;
    const matchesSearch =
      enr.student.name.toLowerCase().includes(search.toLowerCase()) ||
      enr.student.email.toLowerCase().includes(search.toLowerCase()) ||
      enr.course.title.toLowerCase().includes(search.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border/60 pb-6">
        <div>
          <Badge variant="amber" size="sm" className="mb-2">Cohort Intelligence</Badge>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Student Enrollments & Progress
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Inspect active learners across your authored courses, completion rates, and learning progress
          </p>
        </div>
        <div className="text-xs text-slate-400">
          Total Learners: <strong className="text-white">{enrollments.length}</strong>
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-7">
          <Input
            placeholder="Search student by name, email, or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="sm:col-span-5">
          <Select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            options={[
              { label: 'All My Courses', value: 'ALL' },
              ...courses.map(c => ({ label: c.title, value: c.id }))
            ]}
          />
        </div>
      </div>

      {/* Students Table */}
      {loading ? (
        <LoadingSkeleton variant="table" count={5} />
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-surface-border bg-surface-card/40 text-xs text-slate-400">
          No students found matching the selected filter criteria.
        </div>
      ) : (
        <Table headers={['Student Details', 'Enrolled Course', 'Curriculum Progress', 'Status', 'Enrolled Date']}>
          {filtered.map(enr => {
            const isCompleted = enr.progressPercentage >= 100 || enr.status === 'completed';

            return (
              <tr key={enr.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={enr.student.avatar}
                      fallbackText={enr.student.name}
                      size="sm"
                    />
                    <div>
                      <div className="font-bold text-slate-200">{enr.student.name}</div>
                      <div className="text-xs text-slate-400">{enr.student.email}</div>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4 font-medium text-slate-300 max-w-xs truncate">
                  {enr.course.title}
                </td>

                <td className="py-4 px-4 w-48">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Progress</span>
                      <span className="font-bold text-slate-200">{enr.progressPercentage}%</span>
                    </div>
                    <ProgressBar
                      progress={enr.progressPercentage}
                      showLabel={false}
                      variant={isCompleted ? 'emerald' : 'amber'}
                    />
                  </div>
                </td>

                <td className="py-4 px-4">
                  <Badge variant={isCompleted ? 'emerald' : 'sky'} size="sm">
                    {isCompleted ? 'Graduated' : 'Active'}
                  </Badge>
                </td>

                <td className="py-4 px-4 text-xs text-slate-400 whitespace-nowrap">
                  {new Date(enr.enrolledAt).toLocaleDateString()}
                </td>
              </tr>
            );
          })}
        </Table>
      )}
    </div>
  );
}
