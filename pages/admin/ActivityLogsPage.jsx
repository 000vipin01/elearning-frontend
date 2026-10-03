import React, { useState, useEffect } from 'react';
import { activityService } from '../../services/activityService';
import {
  Activity,
  Search,
  Filter,
  Clock,
  User,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { Input, Select } from '../../components/ui/Input';
import { Table } from '../../components/ui/EmptyState';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';

export function ActivityLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const list = await activityService.getActivities(100);
      setLogs(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = logs.filter(log => {
    const matchesRole = roleFilter === 'ALL' || log.role === roleFilter;
    const matchesSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border/60 pb-6">
        <div>
          <Badge variant="rose" size="sm" className="mb-2">Security Audit</Badge>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Platform Activity & Audit Logs
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Immutable chronological record of logins, course updates, student enrollments, and governance decisions
          </p>
        </div>
        <div className="text-xs text-slate-400">
          Showing <strong className="text-white">{filtered.length}</strong> audited events
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-8">
          <Input
            placeholder="Search audit trail by user, action, or details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
        <div className="sm:col-span-4">
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={[
              { label: 'All Roles', value: 'ALL' },
              { label: 'Student Actions', value: 'STUDENT' },
              { label: 'Instructor Actions', value: 'INSTRUCTOR' },
              { label: 'Admin Actions', value: 'ADMIN' }
            ]}
          />
        </div>
      </div>

      {/* Logs Table */}
      {loading ? (
        <LoadingSkeleton variant="table" count={8} />
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-surface-border text-xs text-slate-400">
          No activity logs match your filter criteria.
        </div>
      ) : (
        <Table headers={['Timestamp', 'User Identity', 'Role', 'Action', 'Event Details']}>
          {filtered.map(log => (
            <tr key={log.id} className="hover:bg-slate-900/40 transition-colors">
              <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                {new Date(log.timestamp).toLocaleString()}
              </td>

              <td className="py-3.5 px-4 font-semibold text-slate-200 text-xs">
                {log.user}
              </td>

              <td className="py-3.5 px-4">
                <Badge
                  variant={
                    log.role === 'ADMIN' ? 'rose' : log.role === 'INSTRUCTOR' ? 'amber' : 'sky'
                  }
                  size="sm"
                >
                  {log.role}
                </Badge>
              </td>

              <td className="py-3.5 px-4 font-bold text-xs text-white">
                {log.action}
              </td>

              <td className="py-3.5 px-4 text-xs text-slate-300 max-w-md truncate">
                {log.details}
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
}
