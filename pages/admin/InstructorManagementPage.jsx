import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { userService } from '../../services/userService';
import { courseService } from '../../services/courseService';
import { storageService } from '../../services/storageService';
import {
  UserCheck,
  Search,
  Star,
  BookOpen,
  Users,
  ShieldAlert,
  Building,
  CheckCircle2,
  XCircle,
  Eye
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Table } from '../../components/ui/EmptyState';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';

export function InstructorManagementPage() {
  const { user: currentAdmin } = useAuth();
  const toast = useToast();

  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Inspect Instructor Modal
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [instructorCourses, setInstructorCourses] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [insts, allCourses] = await Promise.all([
        userService.getInstructors(),
        courseService.getCourses()
      ]);
      setInstructors(insts);
      setCourses(allCourses);
    } catch (err) {
      toast.error('Failed to load instructors');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (inst) => {
    try {
      const updated = await userService.toggleUserStatus(inst.id, currentAdmin);
      toast.success(`Instructor status changed to ${updated.status}`);
      loadData();
    } catch (err) {
      toast.error('Failed to change instructor status');
    }
  };

  const handleInspect = (inst) => {
    setSelectedInstructor(inst);
    const myCourses = courses.filter(c => c.instructorId === inst.id);
    setInstructorCourses(myCourses);
  };

  const filtered = instructors.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.email.toLowerCase().includes(search.toLowerCase()) ||
    (i.title && i.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border/60 pb-6">
        <div>
          <Badge variant="rose" size="sm" className="mb-2">Faculty Governance</Badge>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Instructor Roster & Governance
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Oversee faculty appointments, academic accreditations, and review authored curriculum performance
          </p>
        </div>
        <div className="text-xs text-slate-400">
          Total Faculty: <strong className="text-white">{instructors.length}</strong>
        </div>
      </div>

      {/* Search */}
      <div className="w-full sm:w-80">
        <Input
          placeholder="Search instructor by name or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSkeleton variant="table" count={5} />
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-surface-border text-xs text-slate-400">
          No instructors found.
        </div>
      ) : (
        <Table headers={['Faculty Member', 'Department / Focus', 'Authored Courses', 'Status', 'Actions']}>
          {filtered.map(inst => {
            const authoredCount = courses.filter(c => c.instructorId === inst.id).length;

            return (
              <tr key={inst.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={inst.avatar} fallbackText={inst.name} size="sm" />
                    <div>
                      <div className="font-bold text-slate-200">{inst.name}</div>
                      <div className="text-xs text-slate-400">{inst.email}</div>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-4 text-xs text-slate-300">
                  <div className="font-semibold text-slate-200">{inst.title || 'Faculty Instructor'}</div>
                  <span className="text-slate-500">{inst.institution || 'Computer Science Department'}</span>
                </td>

                <td className="py-4 px-4">
                  <span className="font-bold text-brand-400 text-sm">{authoredCount}</span>
                  <span className="text-xs text-slate-400 ml-1">courses</span>
                </td>

                <td className="py-4 px-4">
                  <Badge variant={inst.status === 'active' ? 'emerald' : 'default'} size="sm">
                    {inst.status === 'active' ? 'Accredited' : 'Suspended'}
                  </Badge>
                </td>

                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleInspect(inst)}
                      leftIcon={<Eye className="w-3.5 h-3.5" />}
                    >
                      Inspect
                    </Button>
                    <Button
                      variant={inst.status === 'active' ? 'danger' : 'emerald'}
                      size="sm"
                      onClick={() => handleToggleStatus(inst)}
                    >
                      {inst.status === 'active' ? 'Disable' : 'Approve'}
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </Table>
      )}

      {/* Inspect Instructor Modal */}
      {selectedInstructor && (
        <Modal
          isOpen={Boolean(selectedInstructor)}
          onClose={() => setSelectedInstructor(null)}
          title="Faculty Profile & Performance"
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-surface-border">
              <Avatar src={selectedInstructor.avatar} fallbackText={selectedInstructor.name} size="lg" />
              <div>
                <h3 className="font-bold text-white text-base">{selectedInstructor.name}</h3>
                <p className="text-xs text-slate-400">{selectedInstructor.title}</p>
                <p className="text-[11px] text-brand-400 mt-1">{selectedInstructor.institution}</p>
              </div>
            </div>

            {selectedInstructor.bio && (
              <div className="text-xs text-slate-300 bg-slate-900/60 p-4 rounded-xl border border-surface-border leading-relaxed">
                {selectedInstructor.bio}
              </div>
            )}

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Authored Curricula ({instructorCourses.length})
              </h4>
              <div className="space-y-2">
                {instructorCourses.map(c => (
                  <div key={c.id} className="p-3.5 rounded-xl bg-slate-900 border border-surface-border flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{c.title}</div>
                      <span className="text-slate-400">{c.category} • {c.duration}</span>
                    </div>
                    <Badge variant={c.published ? 'emerald' : 'default'} size="sm">
                      {c.published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
