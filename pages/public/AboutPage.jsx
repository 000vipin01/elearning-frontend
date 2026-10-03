import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Server } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Footer } from '../../components/layout/Footer';

export function AboutPage() {
  const architecturalLayers = [
    {
      title: 'UI Presentation Layer',
      desc: 'React 18 single-page application engineered with Tailwind CSS, custom design tokens, and role-guarded routing.',
      tech: ['React Router v6', 'Context API', 'Lucide React', 'Plus Jakarta Typography']
    },
    {
      title: 'Service Abstraction & REST Adapter',
      desc: 'Decoupled domain services (auth, course, user, enrollment, progress) implementing RESTful API contracts ready for backend integration.',
      tech: ['Clean Architecture', 'Predictable Latency Simulation', 'Strict Type Checking']
    },
    {
      title: 'Local Database & Storage Layer',
      desc: 'Robust localStorage persistence engine with schema seeding, relational queries, audit trails, and atomic state resets.',
      tech: ['localStorage Engine', 'Initial Data Seed', 'Real-Time Audit Logging']
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-slate-100">
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="amber" size="sm">System Documentation</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Academic LMS Architecture & Engineering Specifications
          </h1>
          <p className="text-base text-slate-300 leading-relaxed">
            NexusLMS is built as a complete, presentation-ready educational platform designed to showcase role-based access control, modular curriculum builder mechanics, and clean service-layer abstractions.
          </p>
        </div>

        {/* 3 Pillars / Roles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-surface-card border border-surface-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="text-lg font-bold text-white">Student Portal</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tailored for focused learning: instant course enrollment, real-time module navigation, interactive video/code lessons, granular completion tracking, and profile statistics.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-surface-card border border-surface-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="text-lg font-bold text-white">Faculty Studio</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering educators to author multi-module curricula, add text and video lessons, configure preview lectures, monitor enrolled student cohorts, and inspect analytics.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-surface-card border border-surface-border space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="text-lg font-bold text-white">Administration Command</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Complete governance: user directory, instructor credential verification, course moderation, academic taxonomy management, real-time activity audit logs, and demo resets.
            </p>
          </div>
        </div>

        {/* Architecture Separation */}
        <div className="bg-surface-card border border-surface-border rounded-3xl p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border/60 pb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Three-Tier Decoupled Architecture</h2>
              <p className="text-xs text-slate-400 mt-1">Ready for zero-rewrite transition to a production backend (Spring Boot, Node.js, Go)</p>
            </div>
            <Badge variant="emerald" size="sm">Backend Pluggable</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {architecturalLayers.map((layer, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-surface-border space-y-3">
                <h4 className="font-bold text-sm text-slate-200">{layer.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{layer.desc}</p>
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {layer.tech.map((t, ti) => (
                    <span key={ti} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-brand-500/5 border border-brand-500/20 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 font-bold text-brand-400">
              <Server className="w-4 h-4" />
              <span>Future REST API Endpoints Specification</span>
            </div>
            <p className="text-slate-400">
              The services in <code className="text-brand-300">src/services/</code> map 1:1 to standard endpoints:
              <br />
              <code className="text-slate-300">POST /api/login</code>, <code className="text-slate-300">POST /api/register</code>, <code className="text-slate-300">GET /api/courses</code>, <code className="text-slate-300">POST /api/courses</code>, <code className="text-slate-300">POST /api/enroll</code>, <code className="text-slate-300">GET /api/progress</code>, <code className="text-slate-300">POST /api/upload</code>.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <Link to="/courses">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore Course Catalog
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
