import { BookOpen } from 'lucide-react'
import CourseCard from './CourseCard.jsx'
import { enrolledCourses } from '../../data/mockData.js'

export default function EnrolledCourses() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">Enrolled Courses</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {enrolledCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}
