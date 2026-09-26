import { GraduationCap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-mist bg-white">
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-plum" />
            <span className="text-sm font-semibold text-ink">E-Learning</span>
          </div>
          <p className="text-sm text-ink/60">
            &copy; {new Date().getFullYear()} E-Learning Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
