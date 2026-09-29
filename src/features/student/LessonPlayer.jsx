import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react'
import { api } from '../../shared/api/client.js'

export default function LessonPlayer() {
  const { courseId, lessonId } = useParams()
  const videoRef = useRef(null)
  const [lesson, setLesson] = useState(null)
  const [lessons, setLessons] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get(`/courses/${courseId}/lessons/${lessonId}`),
      api.get(`/courses/${courseId}/lessons`),
    ]).then(([lessonRes, lessonsRes]) => {
      setLesson(lessonRes)
      setLessons(lessonsRes)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [courseId, lessonId])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    if (videoRef.current) {
      videoRef.current.currentTime = pos * duration
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen()
    }
  }

  const formatTime = (time) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return <div className="h-96 animate-pulse rounded-xl bg-[var(--border)]" />
  }

  if (!lesson) {
    return <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center">Lesson not found</div>
  }

  return (
    <div className="space-y-4">
      {/* Video player */}
      <div className="overflow-hidden rounded-xl bg-black">
        <video
          ref={videoRef}
          className="aspect-video w-full"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={`/api/v1/media/stream?token=${localStorage.getItem('streamToken')}&lessonId=${lessonId}`} type="video/mp4" />
        </video>

        {/* Custom controls */}
        <div className="bg-gray-900 px-4 py-3">
          {/* Progress bar */}
          <div className="mb-3 h-1 cursor-pointer rounded-full bg-gray-700" onClick={handleSeek}>
            <div
              className="h-full rounded-full bg-[var(--primary)]"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={togglePlay} className="text-white hover:text-[var(--primary)]">
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button className="text-white hover:text-[var(--primary)]">
                <SkipBack size={18} />
              </button>
              <button className="text-white hover:text-[var(--primary)]">
                <SkipForward size={18} />
              </button>
              <span className="text-sm text-gray-300">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={toggleMute} className="text-white hover:text-[var(--primary)]">
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <button onClick={toggleFullscreen} className="text-white hover:text-[var(--primary)]">
                <Maximize size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson info */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h1 className="font-display text-xl font-bold text-[var(--text)]">{lesson.title}</h1>
        <p className="mt-2 text-[var(--text-muted)]">{lesson.content}</p>
      </div>

      {/* Lesson list */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="mb-4 font-display text-lg font-bold text-[var(--text)]">Lessons</h2>
        <div className="space-y-2">
          {lessons.map((l, index) => (
            <div
              key={l.id}
              className={`flex items-center gap-3 rounded-lg border border-[var(--border)] p-3 ${
                l.id === lessonId ? 'border-[var(--primary)] bg-[var(--primary)]/5' : ''
              }`}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--border)] text-sm font-medium">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-[var(--text)]">{l.title}</p>
                <p className="text-xs text-[var(--text-muted)]">{l.durationMinutes} min</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
