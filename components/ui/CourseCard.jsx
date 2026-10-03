import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, BookOpen, Users, ArrowRight, PlayCircle, CheckCircle2 } from 'lucide-react';
import { Badge } from './Badge';
import { Avatar } from './Avatar';
import { ProgressBar } from './ProgressBar';

export function CourseCard({
  course,
  enrollment = null,
  showEnrollAction = true,
  actionButton = null,
  className = ''
}) {
  const [imageError, setImageError] = useState(false);

  // Calculate total lessons
  let totalLessons = 0;
  course.modules?.forEach(m => {
    totalLessons += (m.lessons || []).length;
  });

  const isCompleted = enrollment?.progressPercentage >= 100 || enrollment?.status === 'completed';
  const isEnrolled = Boolean(enrollment);

  const fallbackThumbnail = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80';

  return (
    <div
      className={`group flex flex-col bg-surface-card hover:bg-surface-hover/80 border border-surface-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1 ${className}`}
    >
      {/* Thumbnail Banner */}
      <Link to={`/courses/${course.id}`} className="relative block aspect-video overflow-hidden bg-slate-900">
        <img
          src={imageError || !course.thumbnail ? fallbackThumbnail : course.thumbnail}
          alt={course.title}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Badges on Top */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <Badge variant="amber" size="sm">
            {course.category}
          </Badge>
          <Badge
            variant={
              course.difficulty === 'Beginner'
                ? 'emerald'
                : course.difficulty === 'Intermediate'
                ? 'sky'
                : 'purple'
            }
            size="sm"
          >
            {course.difficulty}
          </Badge>
        </div>

        {/* Completion Stamp if 100% */}
        {isCompleted && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/90 text-slate-950 text-xs font-bold rounded-lg shadow-lg">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed</span>
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Rating and Students count */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{course.rating || '4.9'}</span>
            <span className="text-slate-500 font-normal">({course.reviewsCount || 48})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            <span>{course.studentsCount || 0} learners</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/courses/${course.id}`} className="group-hover:text-brand-400 transition-colors">
          <h4 className="font-bold text-base text-slate-100 line-clamp-2 leading-snug mb-2">
            {course.title}
          </h4>
        </Link>

        {/* Subtitle/Description excerpt */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {course.subtitle || course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2.5 mt-auto pt-3 border-t border-surface-border/60">
          <Avatar
            src={course.instructorAvatar}
            fallbackText={course.instructorName || 'Instructor'}
            size="sm"
          />
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">
              {course.instructorName}
            </p>
            <p className="text-[11px] text-slate-400 truncate">
              {course.instructorTitle || 'Instructor'}
            </p>
          </div>
        </div>

        {/* Meta Stats: Duration and Lessons */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 mt-3 border-t border-surface-border/60">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>{totalLessons || course.lessonsCount || 6} lessons</span>
          </div>
        </div>

        {/* Enrolled Progress Bar */}
        {isEnrolled && (
          <div className="mt-4 pt-3 border-t border-surface-border/60">
            <ProgressBar
              progress={enrollment.progressPercentage || 0}
              variant={isCompleted ? 'emerald' : 'amber'}
            />
          </div>
        )}

        {/* Action Button */}
        {actionButton ? (
          <div className="mt-4">{actionButton}</div>
        ) : showEnrollAction ? (
          <div className="mt-4">
            {isEnrolled ? (
              <Link
                to={`/learn/${course.id}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-brand-500/10"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Continue Learning</span>
              </Link>
            ) : (
              <Link
                to={`/courses/${course.id}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-surface-subtle hover:bg-slate-700/80 border border-surface-border text-slate-200 hover:text-white font-semibold text-xs tracking-wider transition-colors"
              >
                <span>View Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
