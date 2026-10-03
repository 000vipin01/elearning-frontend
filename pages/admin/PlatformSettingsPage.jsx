import React, { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import { storageService } from '../../services/storageService';
import {
  Settings,
  RotateCcw,
  Save,
  ShieldCheck,
  Server,
  Mail,
  AlertTriangle,
  Bell,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input, TextArea } from '../../components/ui/Input';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';

export function PlatformSettingsPage() {
  const toast = useToast();

  const [settings, setSettings] = useState(storageService.getSettings());
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSaving(true);
    storageService.setSettings(settings);
    setTimeout(() => {
      setSaving(false);
      toast.success('Platform configuration saved successfully');
    }, 100);
  };

  const handleConfirmReset = () => {
    setIsResetting(true);
    storageService.resetAllDemoData();
    setIsResetting(false);
    setIsResetConfirmOpen(false);
    toast.success('All demo data restored to initial pristine state!');
    setTimeout(() => {
      window.location.reload();
    }, 400);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border/60 pb-6">
        <div>
          <Badge variant="rose" size="sm" className="mb-2">System Infrastructure</Badge>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Platform Settings & Diagnostics
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Global environment flags, student self-registration toggles, and demo database state controls
          </p>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSaveSettings} className="bg-surface-card border border-surface-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="space-y-4">
          <Input
            label="Platform Instance Name"
            value={settings.platformName || ''}
            onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Academic Term Designation"
              value={settings.academicTerm || ''}
              onChange={(e) => setSettings({ ...settings, academicTerm: e.target.value })}
            />

            <Input
              label="Support & Registrar Email"
              type="email"
              value={settings.supportEmail || ''}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
            />
          </div>

          <TextArea
            label="Broadcast Announcement Banner"
            value={settings.announcementBanner || ''}
            onChange={(e) => setSettings({ ...settings, announcementBanner: e.target.value })}
            rows={2}
          />

          {/* Feature Toggles */}
          <div className="pt-4 border-t border-surface-border/60 space-y-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-surface-border flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-white">Open Student Self-Registration</span>
                <p className="text-xs text-slate-400">Allow prospective students to create accounts without admin pre-approval</p>
              </div>
              <input
                type="checkbox"
                checked={settings.allowRegistration}
                onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })}
                className="w-5 h-5 rounded bg-slate-800 text-brand-500 border-surface-border cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-surface-border flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-white">Maintenance Mode</span>
                <p className="text-xs text-slate-400">Temporarily restrict public access during term rollover</p>
              </div>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="w-5 h-5 rounded bg-slate-800 text-brand-500 border-surface-border cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-surface-border/60 flex justify-end">
          <Button type="submit" variant="primary" size="md" isLoading={saving} leftIcon={<Save className="w-4 h-4" />}>
            Save Platform Configurations
          </Button>
        </div>
      </form>

      {/* College Project Evaluation Box: Reset Demo Data */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/30 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">College Demonstration: Reset Demo Data</h3>
            <p className="text-xs text-slate-400">
              Restore the entire LMS database (12 courses, 8 faculty, 21 students, enrollments, progress, and audit logs) back to pristine default state.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-start">
          <Button
            variant="danger"
            size="md"
            onClick={() => setIsResetConfirmOpen(true)}
            leftIcon={<RotateCcw className="w-4 h-4" />}
          >
            Reset All Demo Data
          </Button>
        </div>
      </div>

      {/* Confirm Reset Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        title="Confirm Factory Reset of Demo Data"
        message="This will overwrite all course modifications, newly created courses, and student enrollments with the initial pristine dataset. Ideal for repeated live demonstrations."
        confirmText="Confirm Complete Reset"
        cancelText="Cancel"
        isDanger={true}
        isLoading={isResetting}
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
}
