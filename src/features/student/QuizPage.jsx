import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CheckCircle, XCircle, Clock, Award } from 'lucide-react'
import { api } from '../../shared/api/client.js'

export default function QuizPage() {
  const { courseId, quizId } = useParams()
  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    api.get(`/courses/${courseId}/quizzes/${quizId}`).then((res) => {
      setQuiz(res)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [courseId, quizId])

  const handleSubmit = async () => {
    setSubmitting(true)
    try {
      const res = await api.post(`/courses/${courseId}/quizzes/${quizId}/submit`, { answers })
      setResult(res)
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="h-96 animate-pulse rounded-xl bg-[var(--border)]" />
  }

  if (!quiz) {
    return <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center">Quiz not found</div>
  }

  if (result) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
            result.passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {result.passed ? (
              <Award size={40} className="text-green-600" />
            ) : (
              <XCircle size={40} className="text-red-600" />
            )}
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-[var(--text)]">
            {result.passed ? 'Congratulations!' : 'Keep Practicing!'}
          </h1>
          <p className="mt-2 text-[var(--text-muted)]">
            You scored {result.score}/{result.totalQuestions} ({result.percentage}%)
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => { setResult(null); setAnswers({}) }}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--bg)]"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h1 className="font-display text-xl font-bold text-[var(--text)]">{quiz.quiz.title}</h1>
        <p className="mt-1 text-[var(--text-muted)]">{quiz.quiz.description}</p>
        <div className="mt-3 flex items-center gap-4 text-sm text-[var(--text-muted)]">
          <span className="flex items-center gap-1"><Clock size={16} /> {quiz.quiz.durationMinutes} min</span>
          <span>{quiz.quiz.totalQuestions} questions</span>
          <span>Pass: {quiz.quiz.passScore}%</span>
        </div>
      </div>

      {quiz.questions.map((question, index) => (
        <div key={question.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="font-medium text-[var(--text)]">
            {index + 1}. {question.questionText}
          </p>
          <div className="mt-4 space-y-2">
            {['A', 'B', 'C', 'D'].map((option) => (
              <label
                key={option}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                  answers[question.id] === option
                    ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                    : 'border-[var(--border)] hover:bg-[var(--bg)]'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => setAnswers({ ...answers, [question.id]: option })}
                  className="accent-[var(--primary)]"
                />
                <span className="font-medium text-[var(--primary)]">{option}.</span>
                <span className="text-[var(--text)]">{question[`option${option.toLowerCase()}`]}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={submitting || Object.keys(answers).length < quiz.questions.length}
        className="w-full rounded-lg bg-[var(--primary)] py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--primary-hover)] disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit Quiz'}
      </button>
    </div>
  )
}
