import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { userService } from '../../services/userService';
import { storageService } from '../../services/storageService';
import {
  Users,
  Search,
  PlusCircle,
  Edit2,
  Trash2,
  Shield,
  UserCheck,
  UserX,
  Mail,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input, Select, TextArea } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Table } from '../../components/ui/EmptyState';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';

export function UserManagementPage() {
  const { user: currentAdmin } = useAuth();
  const toast = useToast();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Add / Edit Modal state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT',
    title: '',
    bio: '',
    status: 'active'
  });

  // View User Details Modal state
  const [inspectUser, setInspectUser] = useState(null);
  const [userEnrollments, setUserEnrollments] = useState([]);

  // Delete Confirm
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const list = await userService.getUsers();
      setUsers(list);
    } catch (err) {
      toast.error('Failed to load user directory');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddUser = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      password: 'password123',
      role: 'STUDENT',
      title: '',
      bio: '',
      status: 'active'
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEditUser = (u) => {
    setEditingUser(u);
    setFormData({
      name: u.name,
      email: u.email,
      password: '',
      role: u.role,
      title: u.title || '',
      bio: u.bio || '',
      status: u.status || 'active'
    });
    setIsFormModalOpen(true);
  };

  const handleOpenInspectUser = (u) => {
    setInspectUser(u);
    const allEnrs = storageService.getEnrollments().filter(e => e.userId === u.id);
    const courses = storageService.getCourses();
    const populated = allEnrs.map(enr => ({
      ...enr,
      courseTitle: courses.find(c => c.id === enr.courseId)?.title || 'Course'
    }));
    setUserEnrollments(populated);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error('Name and email are required');
      return;
    }

    try {
      if (editingUser) {
        await userService.updateUser(editingUser.id, formData, currentAdmin);
        toast.success(`User ${formData.name} updated successfully`);
      } else {
        await userService.createUser(formData, currentAdmin);
        toast.success(`Created user ${formData.name}`);
      }
      setIsFormModalOpen(false);
      loadUsers();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    }
  };

  const handleToggleStatus = async (targetUser) => {
    try {
      const updated = await userService.toggleUserStatus(targetUser.id, currentAdmin);
      toast.success(`User ${updated.name} status changed to ${updated.status}`);
      loadUsers();
    } catch (err) {
      toast.error('Failed to change user status');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await userService.deleteUser(deleteTarget.id, currentAdmin);
      toast.success(`User ${deleteTarget.name} removed permanently`);
      setDeleteTarget(null);
      loadUsers();
    } catch (err) {
      toast.error(err.message || 'Failed to delete user');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      (u.title && u.title.toLowerCase().includes(search.toLowerCase()));
    return matchesRole && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border/60 pb-6">
        <div>
          <Badge variant="rose" size="sm" className="mb-2">Access Control</Badge>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            User Directory & Roles
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage student learners, faculty instructors, and platform administrators
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={handleOpenAddUser}
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          Add New User
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-surface-card border border-surface-border space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6">
            <Input
              placeholder="Search user by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="md:col-span-3">
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={[
                { label: 'All Roles', value: 'ALL' },
                { label: 'Students', value: 'STUDENT' },
                { label: 'Faculty Instructors', value: 'INSTRUCTOR' },
                { label: 'Administrators', value: 'ADMIN' }
              ]}
            />
          </div>

          <div className="md:col-span-3">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { label: 'All Statuses', value: 'ALL' },
                { label: 'Active', value: 'active' },
                { label: 'Suspended / Inactive', value: 'suspended' }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <LoadingSkeleton variant="table" count={6} />
      ) : filteredUsers.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-surface-border text-xs text-slate-400">
          No users found matching current filters.
        </div>
      ) : (
        <Table headers={['User Identity', 'Role Assignment', 'Academic Status', 'Joined Date', 'Actions']}>
          {filteredUsers.map(u => (
            <tr key={u.id} className="hover:bg-slate-900/40 transition-colors">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <Avatar src={u.avatar} fallbackText={u.name} size="sm" />
                  <div>
                    <div className="font-bold text-slate-200">{u.name}</div>
                    <div className="text-xs text-slate-400">{u.email}</div>
                  </div>
                </div>
              </td>

              <td className="py-4 px-4">
                <Badge
                  variant={
                    u.role === 'ADMIN' ? 'rose' : u.role === 'INSTRUCTOR' ? 'amber' : 'sky'
                  }
                  size="sm"
                >
                  {u.role}
                </Badge>
              </td>

              <td className="py-4 px-4">
                <button
                  onClick={() => handleToggleStatus(u)}
                  title="Click to toggle status"
                  className="focus:outline-none"
                >
                  <Badge variant={u.status === 'active' ? 'emerald' : 'default'} size="sm">
                    {u.status || 'active'}
                  </Badge>
                </button>
              </td>

              <td className="py-4 px-4 text-xs text-slate-400 whitespace-nowrap">
                {u.joinedDate || '2024-01-01'}
              </td>

              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => handleOpenInspectUser(u)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="View User Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenEditUser(u)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Edit User"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(u)}
                    disabled={u.id === currentAdmin?.id}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 disabled:opacity-20 transition-colors"
                    title="Delete User"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}

      {/* Add / Edit User Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingUser ? `Edit Account: ${editingUser.name}` : 'Create New Account'}
        size="md"
      >
        <form onSubmit={handleSaveUser} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          {!editingUser && (
            <Input
              label="Temporary Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          )}

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="System Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              options={[
                { label: 'Student Learner', value: 'STUDENT' },
                { label: 'Faculty Instructor', value: 'INSTRUCTOR' },
                { label: 'Administrator', value: 'ADMIN' }
              ]}
            />

            <Select
              label="Account Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              options={[
                { label: 'Active', value: 'active' },
                { label: 'Suspended', value: 'suspended' }
              ]}
            />
          </div>

          <Input
            label="Academic Title / Major"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Senior CS Undergraduate or Adjunct Professor"
          />

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="secondary" onClick={() => setIsFormModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingUser ? 'Save Changes' : 'Create User'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* View User Details Modal */}
      {inspectUser && (
        <Modal
          isOpen={Boolean(inspectUser)}
          onClose={() => setInspectUser(null)}
          title="User Account Details"
          size="md"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-surface-border">
              <Avatar src={inspectUser.avatar} fallbackText={inspectUser.name} size="lg" />
              <div>
                <h3 className="font-bold text-white text-base">{inspectUser.name}</h3>
                <p className="text-xs text-slate-400">{inspectUser.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={inspectUser.role === 'ADMIN' ? 'rose' : inspectUser.role === 'INSTRUCTOR' ? 'amber' : 'sky'} size="sm">
                    {inspectUser.role}
                  </Badge>
                  <span className="text-[11px] text-slate-500">Joined: {inspectUser.joinedDate}</span>
                </div>
              </div>
            </div>

            {inspectUser.role === 'STUDENT' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Enrolled Courses ({userEnrollments.length})
                </h4>
                {userEnrollments.length === 0 ? (
                  <p className="text-xs text-slate-500">No active course enrollments.</p>
                ) : (
                  <div className="space-y-2">
                    {userEnrollments.map(enr => (
                      <div key={enr.id} className="p-3 rounded-xl bg-slate-900 border border-surface-border flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200">{enr.courseTitle}</span>
                        <Badge variant={enr.progressPercentage >= 100 ? 'emerald' : 'amber'} size="sm">
                          {enr.progressPercentage}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Delete User Confirm */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Permanently Delete User Account?"
        message={`Are you sure you want to permanently remove ${deleteTarget?.name} (${deleteTarget?.email})? This action cannot be undone.`}
        confirmText="Delete Account"
        cancelText="Cancel"
        isDanger={true}
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
