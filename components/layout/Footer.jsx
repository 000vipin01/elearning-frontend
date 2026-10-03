import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-surface-border text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-brand-500/20">
                <GraduationCap className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                Nexus<span className="text-brand-500">LMS</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              An enterprise-grade academic learning management system delivering rigorous computer science, software engineering, and systems curricula to universities and continuous learners worldwide.
            </p>
            <div className="flex items-center gap-3 text-slate-400 pt-2">
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Academic Tracks */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-200 mb-4">
              Curriculum Tracks
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/courses?category=Software+Engineering" className="hover:text-brand-400 transition-colors">Software Engineering</Link></li>
              <li><Link to="/courses?category=Computer+Science" className="hover:text-brand-400 transition-colors">Algorithms & DSA</Link></li>
              <li><Link to="/courses?category=Data+Science+%26+AI" className="hover:text-brand-400 transition-colors">Data Science & AI</Link></li>
              <li><Link to="/courses?category=Cloud+%26+DevOps" className="hover:text-brand-400 transition-colors">Cloud & Kubernetes</Link></li>
              <li><Link to="/courses?category=Cybersecurity" className="hover:text-brand-400 transition-colors">Offensive Security</Link></li>
            </ul>
          </div>

          {/* Quick Portals */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-200 mb-4">
              Portals & Roles
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/login" className="hover:text-brand-400 transition-colors">Student Learning Portal</Link></li>
              <li><Link to="/login" className="hover:text-brand-400 transition-colors">Faculty Instructor Studio</Link></li>
              <li><Link to="/login" className="hover:text-brand-400 transition-colors">Administrator Console</Link></li>
              <li><Link to="/about" className="hover:text-brand-400 transition-colors">Accreditation Standards</Link></li>
            </ul>
          </div>

          {/* Presentation Support */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-slate-200 mb-4">
              College Project
            </h5>
            <ul className="space-y-2.5 text-xs">
              <li className="text-slate-400">Live Presentation Ready</li>
              <li className="text-slate-400">Mock API & Architecture</li>
              <li className="text-slate-400">Multi-Role RBAC System</li>
              <li className="text-slate-400">RESTful Service Contracts</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-surface-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 NexusLMS Project. Designed for Academic Software Engineering Demonstration.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with precision for live evaluation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
