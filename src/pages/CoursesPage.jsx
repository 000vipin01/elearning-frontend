import { useState, useMemo } from 'react'
import { Search, BookOpen } from 'lucide-react'
import CourseCard from '../components/dashboard/CourseCard.jsx'
import { enrolledCourses } from '../data/mockData.js'

const additionalCourses = [
  {
    id: 5,
    title: 'Machine Learning A-Z',
    instructor: 'Dr. Aisha Patel',
    thumbnail: null,
    progress: 0,
    totalLessons: 36,
    completedLessons: 0,
    lastAccessed: null,
    category: 'Data Science',
    status: 'not-started',
  },
  {
    id: 6,
    title: 'React & Modern Frontend',
    instructor: 'Marcus Thompson',
    thumbnail: null,
    progress: 0,
    totalLessons: 22,
    completedLessons: 0,
    lastAccessed: null,
    category: 'Web Development',
    status: 'not-started',
  },
  {
    id: 7,
    title: 'Cloud Architecture Basics',
    instructor: 'Sofia Lindqvist',
    thumbnail: null,
    progress: 0,
    totalLessons: 20,
    completedLessons: 0,
    lastAccessed: null,
    category: 'Computer Science',
    status: 'not-started',
  },
  {
    id: 8,
    title: 'Product Design Thinking',
    instructor: 'Daniel Okafor',
    thumbnail: null,
    progress: 0,
    totalLessons: 16,
    completedLessons: 0,
    lastAccessed: null,
    category: 'Design',
    status: 'not-started',
  },
]

const allCourses = [...enrolledCourses, ...additionalCourses]

const categories = ['All Categories', ...new Set(allCourses.map((c) => c.category))]

export default function CoursesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'All Categories' || course.category === category
      return matchesSearch && matchesCategory
    })
  }, [search, category])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink">All Courses</h1>
        <p className="mt-1 text-sm text-ink/60">
          Browse our catalog and find your next learning adventure
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" />
          <input
            type="text"
            placeholder="Search courses or instructors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-mist bg-white py-2 pl-10 pr-4 text-sm text-ink placeholder:text-ink/40 focus:border-plum focus:outline-none focus:ring-1 focus:ring-plum"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-mist bg-white px-3 py-2 text-sm text-ink focus:border-plum focus:outline-none focus:ring-1 focus:ring-plum"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-mist bg-white py-16">
          <BookOpen className="h-12 w-12 text-ink/20" />
          <p className="mt-4 text-sm text-ink/60">No courses match your search criteria</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}
