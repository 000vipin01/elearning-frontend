import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, Button, Badge } from '../components/ui/index.js'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'

const sampleQuestions = [
  { id: 1, question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'], correct: 0 },
  { id: 2, question: 'Which CSS property is used to change text color?', options: ['font-color', 'text-color', 'color', 'foreground'], correct: 2 },
  { id: 3, question: 'What is the correct JavaScript syntax to change content?', options: ['document.getElement("p").innerHTML = "Hello"', 'document.querySelector("p").innerHTML = "Hello"', 'document.getElementById("p").innerHTML = "Hello"', '#p.innerHTML = "Hello"'], correct: 2 },
]

export default function QuizPage() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [started, setStarted] = useState(false)
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleStart = () => setStarted(true)

  const handleAnswer = (qIndex, optIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optIndex }))
  }

  const handleSubmit = () => setSubmitted(true)

  const score = sampleQuestions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0)
  const percentage = Math.round((score / sampleQuestions.length) * 100)

  return (
    <div className="space-y-6">
      <Link to={`/courses/${courseId}`} className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        Back to Course
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-ink">Quiz</h1>
        <p className="mt-1 text-sm text-ink/60">Course: {courseId}</p>
      </div>

      {!started && (
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-ink">Ready to start?</h2>
            <p className="mt-2 text-sm text-ink/60">
              {sampleQuestions.length} questions • 30 minutes
            </p>
            <Button variant="primary" size="lg" className="mt-6" onClick={handleStart}>
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      )}

      {started && !submitted && (
        <Card>
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <Badge variant="info">Question {currentQ + 1} of {sampleQuestions.length}</Badge>
              <span className="text-sm text-ink/60">
                {Object.keys(answers).length} answered
              </span>
            </div>

            <div className="mb-2 h-2 w-full rounded-full bg-mist">
              <div
                className="h-2 rounded-full bg-plum transition-all"
                style={{ width: `${((currentQ + 1) / sampleQuestions.length) * 100}%` }}
              />
            </div>

            <h3 className="mt-6 text-lg font-semibold text-ink">
              {sampleQuestions[currentQ].question}
            </h3>

            <div className="mt-4 space-y-2">
              {sampleQuestions[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(currentQ, i)}
                  className={`w-full rounded-lg border p-3 text-left text-sm transition-colors ${
                    answers[currentQ] === i
                      ? 'border-plum bg-plum/10 text-plum'
                      : 'border-mist text-ink hover:bg-mist'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <Button
                variant="secondary"
                onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                disabled={currentQ === 0}
              >
                Previous
              </Button>
              {currentQ < sampleQuestions.length - 1 ? (
                <Button variant="primary" onClick={() => setCurrentQ(currentQ + 1)}>
                  Next
                </Button>
              ) : (
                <Button variant="primary" onClick={handleSubmit}>
                  Submit Quiz
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {submitted && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${percentage >= 70 ? 'bg-fern/10' : 'bg-tangerine/10'}`}>
              {percentage >= 70 ? (
                <CheckCircle className="h-10 w-10 text-fern" />
              ) : (
                <XCircle className="h-10 w-10 text-tangerine" />
              )}
            </div>
            <h2 className="mt-4 text-2xl font-bold text-ink">
              {percentage >= 70 ? 'Congratulations!' : 'Keep Practicing!'}
            </h2>
            <p className="mt-2 text-lg text-ink/70">
              You scored <span className="font-bold text-ink">{score}/{sampleQuestions.length}</span> ({percentage}%)
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button variant="secondary" onClick={() => navigate('/')}>
                Back to Dashboard
              </Button>
              <Button variant="primary" onClick={() => { setStarted(false); setAnswers({}); setSubmitted(false); setCurrentQ(0) }}>
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
