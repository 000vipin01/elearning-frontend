import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { Button } from '../components/ui/index.js'
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/index.js'
import {
  Bell,
  Mail,
  Smartphone,
  BarChart3,
  Eye,
  Activity,
  Palette,
  Sun,
  Moon,
  Monitor,
  Type,
  AlertTriangle,
  Save,
  Trash2,
  Check,
} from 'lucide-react'

function ToggleSwitch({ enabled, onToggle, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-plum focus-visible:ring-offset-2 ${
        enabled ? 'bg-plum' : 'bg-ink/20'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )
}

function SettingRow({ icon: Icon, title, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mist">
          <Icon className="h-4.5 w-4.5 text-plum" />
        </div>
        <div>
          <p className="text-sm font-medium text-ink">{title}</p>
          {description && <p className="mt-0.5 text-xs text-ink/60">{description}</p>}
        </div>
      </div>
      {children}
    </div>
  )
}

function ThemeOption({ icon: Icon, label, value, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
        selected
          ? 'border-plum bg-mist'
          : 'border-mist bg-white hover:border-ink/20'
      }`}
    >
      <Icon className={`h-6 w-6 ${selected ? 'text-plum' : 'text-ink/40'}`} />
      <span className={`text-sm font-medium ${selected ? 'text-plum' : 'text-ink/60'}`}>
        {label}
      </span>
      {selected && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-plum">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}
    </button>
  )
}

export default function SettingsPage() {
  const { user } = useAuth()

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyReports: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    showActivity: true,
  })

  const [appearance, setAppearance] = useState({
    theme: 'light',
    fontSize: 'medium',
  })

  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleNotificationToggle = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handlePrivacyToggle = (key) => {
    setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSave = () => {
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 3000)
  }

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(false)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-mist">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-ink">Settings</h1>
          <p className="mt-1 text-sm text-ink/60">
            Manage your account preferences and privacy settings
          </p>
        </div>

        {showSaveSuccess && (
          <div className="mb-6 flex items-center gap-2 rounded-lg bg-sage px-4 py-3 text-sm font-medium text-fern">
            <Check className="h-4 w-4" />
            Settings saved successfully!
          </div>
        )}

        {/* Notification Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-plum" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-mist">
            <SettingRow
              icon={Mail}
              title="Email Notifications"
              description="Receive course updates and announcements via email"
            >
              <ToggleSwitch
                enabled={notifications.emailNotifications}
                onToggle={() => handleNotificationToggle('emailNotifications')}
                label="Email Notifications"
              />
            </SettingRow>
            <SettingRow
              icon={Smartphone}
              title="Push Notifications"
              description="Get notified about new content and deadlines"
            >
              <ToggleSwitch
                enabled={notifications.pushNotifications}
                onToggle={() => handleNotificationToggle('pushNotifications')}
                label="Push Notifications"
              />
            </SettingRow>
            <SettingRow
              icon={BarChart3}
              title="Weekly Progress Reports"
              description="Receive a summary of your learning activity every week"
            >
              <ToggleSwitch
                enabled={notifications.weeklyReports}
                onToggle={() => handleNotificationToggle('weeklyReports')}
                label="Weekly Progress Reports"
              />
            </SettingRow>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-plum" />
              Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-mist">
            <SettingRow
              icon={Eye}
              title="Profile Visibility"
              description="Allow other users to see your profile"
            >
              <ToggleSwitch
                enabled={privacy.profileVisibility}
                onToggle={() => handlePrivacyToggle('profileVisibility')}
                label="Profile Visibility"
              />
            </SettingRow>
            <SettingRow
              icon={Activity}
              title="Show Learning Activity"
              description="Display your course progress and achievements publicly"
            >
              <ToggleSwitch
                enabled={privacy.showActivity}
                onToggle={() => handlePrivacyToggle('showActivity')}
                label="Show Learning Activity"
              />
            </SettingRow>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-plum" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-medium text-ink">Theme</p>
                <div className="grid grid-cols-3 gap-3">
                  <ThemeOption
                    icon={Sun}
                    label="Light"
                    value="light"
                    selected={appearance.theme === 'light'}
                    onSelect={(v) => setAppearance((p) => ({ ...p, theme: v }))}
                  />
                  <ThemeOption
                    icon={Moon}
                    label="Dark"
                    value="dark"
                    selected={appearance.theme === 'dark'}
                    onSelect={(v) => setAppearance((p) => ({ ...p, theme: v }))}
                  />
                  <ThemeOption
                    icon={Monitor}
                    label="System"
                    value="system"
                    selected={appearance.theme === 'system'}
                    onSelect={(v) => setAppearance((p) => ({ ...p, theme: v }))}
                  />
                </div>
              </div>
              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-medium text-ink">
                  <Type className="h-4 w-4 text-ink/60" />
                  Font Size
                </p>
                <div className="flex gap-2">
                  {['small', 'medium', 'large'].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setAppearance((p) => ({ ...p, fontSize: size }))}
                      className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                        appearance.fontSize === size
                          ? 'bg-plum text-white'
                          : 'bg-mist text-ink/60 hover:bg-ink/10'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="mb-6 border-tangerine/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-tangerine">
              <AlertTriangle className="h-5 w-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-ink">Delete Account</p>
                <p className="mt-0.5 text-xs text-ink/60">
                  Permanently delete your account and all associated data
                </p>
              </div>
              {!showDeleteConfirm ? (
                <Button variant="danger" size="md" onClick={() => setShowDeleteConfirm(true)}>
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-tangerine">Are you sure?</span>
                  <Button variant="danger" size="sm" onClick={handleDeleteAccount}>
                    Yes, Delete
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button variant="primary" size="lg" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
