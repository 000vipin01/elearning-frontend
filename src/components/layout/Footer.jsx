import { GraduationCap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-semibold text-gray-900">E-Learning</span>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} E-Learning Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
