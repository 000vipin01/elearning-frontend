import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { learningStats } from '../data/mockData.js'
import { Button } from '../components/ui/index.js'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/index.js'
import { Badge } from '../components/ui/index.js'
import {
  User,
  Mail,
  Calendar,
  BookOpen,
  Clock,
  Flame,
  Award,
  Edit3,
  Save,
  X,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react'

function getInitials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function StatCard({ icon: Icon, label, value, suffix }) {
  return (
    <Card className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-mist">
        <Icon className="h-6 w-6 text-plum" />
      </div>
      <div>
        <p className="text-sm text-ink/60">{label}</p>
        <p className="text-2xl font-bold text-ink">
          {value}
          {suffix && <span className="ml-1 text-sm font-normal text-ink/60">{suffix}</span>}
        </p>
      </div>
    </Card>
  )
}

export default function ProfilePage() {
  const { user } = useAuth()

  const [isEditing, setIsEditing] = useState(false)
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 3000)
  }

  const handleCancelEdit = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: '',
    })
    setIsEditing(false)
  }

  const handleChangePassword = () => {
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-mist">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-6">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-plum text-3xl font-bold text-white">
              {getInitials(user.name)}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
                <h1 className="text-2xl font-bold text-ink">{user.name}</h1>
                <Badge variant="info" className="capitalize">{user.role}</Badge>
              </div>
              <div className="mt-2 flex flex-col items-center gap-1 text-sm text-ink/60 sm:flex-row sm:gap-4">
                <span className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Member since {formatDate(user.memberSince)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Row */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard icon={BookOpen} label="Courses Enrolled" value={learningStats.totalCoursesEnrolled} />
          <StatCard icon={Clock} label="Hours Learned" value={learningStats.totalLearningHours} suffix="hrs" />
          <StatCard icon={Flame} label="Current Streak" value={learningStats.currentStreak} suffix="days" />
          <StatCard icon={Award} label="Average Score" value={learningStats.averageScore} suffix="%" />
        </div>

        {/* Edit Profile Section */}
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-plum" />
              Profile Information
            </CardTitle>
            {!isEditing && (
              <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
                <Edit3 className="h-4 w-4" />
                Edit
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {showSaveSuccess && (
              <div className="mb-4 rounded-lg bg-sage px-4 py-3 text-sm font-medium text-fern">
                Profile updated successfully!
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-mist bg-white px-3.5 py-2.5 text-sm text-ink placeholder-ink/40 transition-colors focus:border-plum focus:outline-none focus:ring-2 focus:ring-plum/20 disabled:bg-mist/50 disabled:text-ink/60"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full rounded-lg border border-mist bg-white px-3.5 py-2.5 text-sm text-ink placeholder-ink/40 transition-colors focus:border-plum focus:outline-none focus:ring-2 focus:ring-plum/20 disabled:bg-mist/50 disabled:text-ink/60"
                />
              </div>
              <div>
                <label htmlFor="bio" className="mb-1.5 block text-sm font-medium text-ink">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                  className="w-full resize-none rounded-lg border border-mist bg-white px-3.5 py-2.5 text-sm text-ink placeholder-ink/40 transition-colors focus:border-plum focus:outline-none focus:ring-2 focus:ring-plum/20 disabled:bg-mist/50 disabled:text-ink/60"
                />
              </div>
              {isEditing && (
                <div className="flex gap-3 pt-2">
                  <Button variant="primary" size="md" onClick={handleSaveProfile}>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button variant="secondary" size="md" onClick={handleCancelEdit}>
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Change Password Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-plum" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="mb-1.5 block text-sm font-medium text-ink">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-lg border border-mist bg-white px-3.5 py-2.5 pr-10 text-sm text-ink placeholder-ink/40 transition-colors focus:border-plum focus:outline-none focus:ring-2 focus:ring-plum/20"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
                  >
                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium text-ink">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-lg border border-mist bg-white px-3.5 py-2.5 pr-10 text-sm text-ink placeholder-ink/40 transition-colors focus:border-plum focus:outline-none focus:ring-2 focus:ring-plum/20"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-ink">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-lg border border-mist bg-white px-3.5 py-2.5 pr-10 text-sm text-ink placeholder-ink/40 transition-colors focus:border-plum focus:outline-none focus:ring-2 focus:ring-plum/20"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink"
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="pt-2">
                <Button variant="primary" size="md" onClick={handleChangePassword}>
                  <Lock className="h-4 w-4" />
                  Update Password
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
