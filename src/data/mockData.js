export const currentUser = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  role: 'student',
  avatar: null,
  memberSince: '2025-09-15',
}

export const enrolledCourses = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    instructor: 'Dr. Sarah Chen',
    thumbnail: null,
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    lastAccessed: '2026-09-26',
    category: 'Web Development',
    status: 'in-progress',
  },
  {
    id: 2,
    title: 'Data Structures & Algorithms',
    instructor: 'Prof. Michael Rivera',
    thumbnail: null,
    progress: 45,
    totalLessons: 32,
    completedLessons: 14,
    lastAccessed: '2026-09-25',
    category: 'Computer Science',
    status: 'in-progress',
  },
  {
    id: 3,
    title: 'UI/UX Design Fundamentals',
    instructor: 'Emily Watson',
    thumbnail: null,
    progress: 100,
    totalLessons: 18,
    completedLessons: 18,
    lastAccessed: '2026-09-20',
    category: 'Design',
    status: 'completed',
  },
  {
    id: 4,
    title: 'Python for Data Science',
    instructor: 'Dr. James Park',
    thumbnail: null,
    progress: 20,
    totalLessons: 28,
    completedLessons: 6,
    lastAccessed: '2026-09-27',
    category: 'Data Science',
    status: 'in-progress',
  },
]

export const continueLearning = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    currentLesson: 'CSS Flexbox & Grid',
    lessonNumber: 19,
    totalLessons: 24,
    progress: 75,
    estimatedTime: '15 min remaining',
  },
  {
    id: 4,
    title: 'Python for Data Science',
    currentLesson: 'Pandas DataFrame Basics',
    lessonNumber: 7,
    totalLessons: 28,
    progress: 20,
    estimatedTime: '25 min remaining',
  },
]

export const recentCourses = [
  {
    id: 4,
    title: 'Python for Data Science',
    instructor: 'Dr. James Park',
    lastViewed: '2 hours ago',
    category: 'Data Science',
  },
  {
    id: 1,
    title: 'Introduction to Web Development',
    instructor: 'Dr. Sarah Chen',
    lastViewed: '5 hours ago',
    category: 'Web Development',
  },
  {
    id: 2,
    title: 'Data Structures & Algorithms',
    instructor: 'Prof. Michael Rivera',
    lastViewed: '1 day ago',
    category: 'Computer Science',
  },
]

export const upcomingQuizzes = [
  {
    id: 1,
    courseId: 1,
    courseTitle: 'Introduction to Web Development',
    title: 'JavaScript Fundamentals Quiz',
    dueDate: '2026-09-28',
    duration: 30,
    totalQuestions: 20,
    status: 'pending',
  },
  {
    id: 2,
    courseId: 2,
    courseTitle: 'Data Structures & Algorithms',
    title: 'Sorting Algorithms Assessment',
    dueDate: '2026-09-30',
    duration: 45,
    totalQuestions: 15,
    status: 'pending',
  },
  {
    id: 3,
    courseId: 4,
    courseTitle: 'Python for Data Science',
    title: 'NumPy Basics Check',
    dueDate: '2026-10-02',
    duration: 20,
    totalQuestions: 10,
    status: 'pending',
  },
]

export const learningStats = {
  totalCoursesEnrolled: 4,
  coursesCompleted: 1,
  totalLearningHours: 47,
  currentStreak: 12,
  averageScore: 85,
  weeklyGoal: 10,
  weeklyProgress: 6,
  monthlyProgress: [
    { week: 'Week 1', hours: 8 },
    { week: 'Week 2', hours: 12 },
    { week: 'Week 3', hours: 9 },
    { week: 'Week 4', hours: 18 },
  ],
}
