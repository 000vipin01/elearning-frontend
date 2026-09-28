import { BookOpen } from 'lucide-react'
import CourseCard from './CourseCard.jsx'

export default function EnrolledCourses({ enrollments = [] }) {
  if (enrollments.length === 0) {
    return (
      <section>
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-plum" />
          <h2 className="text-lg font-semibold text-ink">Enrolled Courses</h2>
        </div>
        <p className="text-sm text-ink/60">No enrolled courses yet.</p>
      </section>
    )
  }

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-plum" />
        <h2 className="text-lg font-semibold text-ink">Enrolled Courses</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {enrollments.map((enrollment) => (
          <CourseCard
            key={enrollment.id}
            course={enrollment.course}
          />
        ))}
      </div>
    </section>
  )
}
