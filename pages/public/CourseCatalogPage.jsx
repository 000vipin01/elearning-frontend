import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import { categoryService } from '../../services/categoryService';
import { enrollmentService } from '../../services/enrollmentService';
import { useAuth } from '../../context/AuthContext';
import { Search, BookOpen, X } from 'lucide-react';
import { CourseCard } from '../../components/ui/CourseCard';
import { Input, Select } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';

export function CourseCatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [cList, catList] = await Promise.all([
          courseService.getCourses({ publishedOnly: true }),
          categoryService.getCategories()
        ]);
        setCourses(cList);
        setCategories(catList);

        if (user && user.role === 'STUDENT') {
          const userEnrs = await enrollmentService.getStudentEnrollments(user.id);
          setEnrollments(userEnrs);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [user]);

  // Update query params when search or category changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== selectedCategory) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle?.toLowerCase().includes(q) ||
        c.instructorName.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        (c.tags && c.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (selectedCategory !== 'All') {
      result = result.filter(c => c.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedDifficulty !== 'All') {
      result = result.filter(c => c.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());
    }

    switch (sortBy) {
      case 'popular':
        result.sort((a, b) => (b.studentsCount || 0) - (a.studentsCount || 0));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return result;
  }, [courses, search, selectedCategory, selectedDifficulty, sortBy]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSortBy('popular');
    setSearchParams({});
  };

  const hasActiveFilters = search || selectedCategory !== 'All' || selectedDifficulty !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-surface-border/60 pb-6">
        <div>
          <Badge variant="amber" size="sm" className="mb-2">Academic Catalog</Badge>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Explore All Courses
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse through university-level software engineering and computer science masterclasses
          </p>
        </div>
        <div className="text-xs text-slate-400">
          Showing <span className="text-brand-400 font-bold">{filteredCourses.length}</span> accredited courses
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-2xl bg-surface-card border border-surface-border space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6">
            <Input
              placeholder="Search by title, instructor, keyword, or topic (e.g. Java, Raft, React)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-2">
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={[
                { label: 'All Categories', value: 'All' },
                ...categories.map(c => ({ label: c.name, value: c.name }))
              ]}
            />
          </div>

          {/* Difficulty Dropdown */}
          <div className="md:col-span-2">
            <Select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              options={[
                { label: 'All Difficulties', value: 'All' },
                { label: 'Beginner', value: 'Beginner' },
                { label: 'Intermediate', value: 'Intermediate' },
                { label: 'Advanced', value: 'Advanced' }
              ]}
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-2">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { label: 'Most Popular', value: 'popular' },
                { label: 'Highest Rated', value: 'rating' },
                { label: 'Newest Releases', value: 'newest' },
                { label: 'Alphabetical (A-Z)', value: 'title-asc' }
              ]}
            />
          </div>
        </div>

        {/* Category Pills Quick Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'All'
                ? 'bg-brand-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-surface-border'
            }`}
          >
            All Tracks
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory.toLowerCase() === cat.name.toLowerCase()
                  ? 'bg-brand-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-surface-border'
              }`}
            >
              {cat.name} ({cat.courseCount})
            </button>
          ))}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center gap-1 shrink-0 ml-auto"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Course Grid or Empty State */}
      {loading ? (
        <LoadingSkeleton variant="card" count={6} />
      ) : filteredCourses.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="w-8 h-8" />}
          title="No Matching Courses Found"
          description="We couldn't find any courses matching your specific search query or active filter criteria."
          actionLabel="Clear All Filters"
          onAction={clearFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => {
            const userEnr = enrollments.find(e => e.courseId === course.id);
            return (
              <CourseCard
                key={course.id}
                course={course}
                enrollment={userEnr}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
