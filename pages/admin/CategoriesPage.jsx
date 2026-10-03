import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { categoryService } from '../../services/categoryService';
import {
  FolderTree,
  PlusCircle,
  Edit2,
  Trash2,
  BookOpen,
  Folder
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input, TextArea } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { Table } from '../../components/ui/EmptyState';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';

export function CategoriesPage() {
  const { user: currentAdmin } = useAuth();
  const toast = useToast();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add / Edit Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  // Delete Confirm
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const list = await categoryService.getCategories();
      setCategories(list);
    } catch (err) {
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, description: cat.description || '' });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, formData, currentAdmin);
        toast.success(`Category "${formData.name}" updated`);
      } else {
        await categoryService.createCategory(formData, currentAdmin);
        toast.success(`Category "${formData.name}" created`);
      }
      setIsModalOpen(false);
      loadCategories();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await categoryService.deleteCategory(deleteTarget.id, currentAdmin);
      toast.success(`Category "${deleteTarget.name}" deleted`);
      setDeleteTarget(null);
      loadCategories();
    } catch (err) {
      toast.error('Failed to delete category');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border/60 pb-6">
        <div>
          <Badge variant="rose" size="sm" className="mb-2">Taxonomy Engine</Badge>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Academic Disciplines & Categories
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Organize engineering curricula, define track taxonomies, and manage catalog classifications
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={handleOpenAdd}
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          Add New Discipline
        </Button>
      </div>

      {/* Categories Table */}
      {loading ? (
        <LoadingSkeleton variant="table" count={5} />
      ) : (
        <Table headers={['Category Name', 'Slug Identifier', 'Active Course Offerings', 'Description', 'Actions']}>
          {categories.map(cat => (
            <tr key={cat.id} className="hover:bg-slate-900/40 transition-colors">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-surface-border text-brand-400 flex items-center justify-center shrink-0">
                    <Folder className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-white text-sm">{cat.name}</span>
                </div>
              </td>

              <td className="py-4 px-4 font-mono text-xs text-slate-400">
                {cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}
              </td>

              <td className="py-4 px-4">
                <Badge variant="amber" size="sm">
                  {cat.courseCount} courses
                </Badge>
              </td>

              <td className="py-4 px-4 text-xs text-slate-400 max-w-sm truncate">
                {cat.description || 'No description provided'}
              </td>

              <td className="py-4 px-4 text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Edit Category"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(cat)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}

      {/* Add / Edit Category Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Category' : 'Create Academic Discipline'}
        size="sm"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Discipline Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Distributed Systems & Reliability"
            required
            autoFocus
          />

          <TextArea
            label="Scope Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            placeholder="Curriculum focus and industry relevance..."
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editingCategory ? 'Save Changes' : 'Create Category'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Category Confirm */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        title="Delete Taxonomy Category?"
        message={`Are you sure you want to delete category "${deleteTarget?.name}"?`}
        confirmText="Delete"
        cancelText="Cancel"
        isDanger={true}
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
