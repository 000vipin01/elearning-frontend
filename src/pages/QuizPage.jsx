import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Clock, FileQuestion, Calendar, CheckCircle, XCircle, RotateCcw, ArrowLeft, ArrowRight, Trophy } from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '../components/ui/index.js'
import { upcomingQuizzes } from '../data/mockData.js'

const sampleQuestions = {
  1: [
    {
      question: 'Which of the following is NOT a JavaScript data type?',
      options: ['String', 'Boolean', 'Float', 'Undefined'],
      correct: 2,
    },
    {
      question: 'What does the "===" operator do in JavaScript?',
      options: ['Assigns a value', 'Compares value only', 'Compares value and type', 'None of the above'],
      correct: 2,
    },
    {
      question: 'Which method is used to add an element to the end of an array?',
      options: ['shift()', 'unshift()', 'push()', 'pop()'],
      correct: 2,
    },
    {
      question: 'What is the output of typeof null in JavaScript?',
      options: ['"null"', '"undefined"', '"object"', '"number"'],
      correct: 2,
    },
  ],
  2: [
    {
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
      correct: 1,
    },
    {
      question: 'Which sorting algorithm has the best average-case time complexity?',
      options: ['Bubble Sort', 'Selection Sort', 'Merge Sort', 'Insertion Sort'],
      correct: 2,
    },
    {
      question: 'What is the worst-case time complexity of quicksort?',
      options: ['O(n log n)', 'O(n)', 'O(n²)', 'O(log n)'],
      correct: 2,
    },
    {
      question: 'Which data structure uses FIFO ordering?',
      options: ['Stack', 'Queue', 'Tree', 'Graph'],
      correct: 1,
    },
  ],
  3: [
    {
      question: 'What does NumPy stand for?',
      options: ['Number Python', 'Numerical Python', 'NumPy Python', 'None of the above'],
      correct: 1,
    },
    {
      question: 'Which function is used to create a NumPy array?',
      options: ['np.create()', 'np.array()', 'np.make()', 'np.list()'],
      correct: 1,
    },
    {
      question: 'What is the default data type of a NumPy array?',
      options: ['int32', 'float64', 'int64', 'object'],
      correct: 1,
    },
    {
      question: 'Which method returns the shape of a NumPy array?',
      options: ['array.dim()', 'array.shape()', 'array.size()', 'array.type()'],
      correct: 1,
    },
  ],
}

function getQuestions(quizId) {
  return sampleQuestions[quizId] || sampleQuestions[1]
}

export default function QuizPage() {
  const { courseId, quizId } = useParams()
  const quiz = upcomingQuizzes.find((q) => q.id === Number(quizId) && q.courseId === Number(courseId))

  const [quizState, setQuizState] = useState('not-started')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [score, setScore] = useState(0)

  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-xl font-semibold text-ink">Quiz not found</h2>
        <Link to="/" className="mt-4">
          <Button variant="primary">Back to Dashboard</Button>
        </Link>
      </div>
    )
  }

  const questions = getQuestions(quiz.id)
  const totalQuestions = questions.length

  const startQuiz = () => {
    setQuizState('in-progress')
    setCurrentQuestion(0)
    setAnswers({})
    setScore(0)
  }

  const selectAnswer = (optionIndex) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }))
  }

  const goToQuestion = (index) => {
    setCurrentQuestion(index)
  }

  const submitQuiz = () => {
    let correct = 0
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) correct++
    })
    setScore(correct)
    setQuizState('completed')
  }

  const retakeQuiz = () => {
    setQuizState('not-started')
    setCurrentQuestion(0)
    setAnswers({})
    setScore(0)
  }

  const percentage = Math.round((score / totalQuestions) * 100)
  const passed = percentage >= 70

  // Not started state
  if (quizState === 'not-started') {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-ink">{quiz.title}</h1>
          <p className="mt-1 text-sm text-ink/60">{quiz.courseTitle}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quiz Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-lg bg-mist/50 p-4">
                <Clock className="h-5 w-5 text-plum" />
                <div>
                  <p className="text-xs text-ink/50">Duration</p>
                  <p className="text-sm font-semibold text-ink">{quiz.duration} min</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-mist/50 p-4">
                <FileQuestion className="h-5 w-5 text-plum" />
                <div>
                  <p className="text-xs text-ink/50">Questions</p>
                  <p className="text-sm font-semibold text-ink">{quiz.totalQuestions}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-mist/50 p-4">
                <Calendar className="h-5 w-5 text-plum" />
                <div>
                  <p className="text-xs text-ink/50">Due Date</p>
                  <p className="text-sm font-semibold text-ink">
                    {new Date(quiz.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-cream bg-cream/30 p-4">
              <p className="text-sm text-ink/70">
                <span className="font-semibold text-ink">Instructions:</span> Answer all questions before submitting.
                You can navigate between questions. A score of 70% or higher is required to pass.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="primary" size="lg" onClick={startQuiz}>
                Start Quiz
              </Button>
              <Link to="/">
                <Button variant="secondary" size="lg">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Completed state
  if (quizState === 'completed') {
    return (
      <div className="mx-auto max-w-2xl space-y-6">
        <Card>
          <CardContent className="flex flex-col items-center py-12 text-center">
            <div className={`flex h-20 w-20 items-center justify-center rounded-full ${passed ? 'bg-fern/10' : 'bg-tangerine/10'}`}>
              <Trophy className={`h-10 w-10 ${passed ? 'text-fern' : 'text-tangerine'}`} />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-ink">
              {passed ? 'Congratulations!' : 'Keep Practicing!'}
            </h2>
            <p className="mt-2 text-sm text-ink/60">
              {passed
                ? 'You passed the quiz. Great job!'
                : 'You did not pass this time. Review the material and try again.'}
            </p>

            <div className="mt-6 flex items-center gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-ink">{percentage}%</p>
                <p className="text-xs text-ink/50">Score</p>
              </div>
              <div className="h-10 w-px bg-mist" />
              <div className="text-center">
                <p className="text-3xl font-bold text-ink">{score}/{totalQuestions}</p>
                <p className="text-xs text-ink/50">Correct</p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <Button variant="primary" onClick={retakeQuiz}>
                <RotateCcw className="h-4 w-4" />
                Retake Quiz
              </Button>
              <Link to="/">
                <Button variant="secondary">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Answer review */}
        <Card>
          <CardHeader>
            <CardTitle>Answer Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.map((q, i) => {
              const userAnswer = answers[i]
              const isCorrect = userAnswer === q.correct
              return (
                <div key={i} className="rounded-lg border border-mist p-4">
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-fern" />
                    ) : (
                      <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-tangerine" />
                    )}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-ink">{q.question}</p>
                      <p className="text-xs text-ink/60">
                        Your answer: <span className={isCorrect ? 'text-fern' : 'text-tangerine'}>{q.options[userAnswer]}</span>
                        {!isCorrect && (
                          <span className="ml-2 text-fern">Correct: {q.options[q.correct]}</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    )
  }

  // In-progress state
  const question = questions[currentQuestion]
  const isLastQuestion = currentQuestion === totalQuestions - 1

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink">{quiz.title}</h1>
          <p className="text-sm text-ink/60">{quiz.courseTitle}</p>
        </div>
        <Badge variant="info">
          Question {currentQuestion + 1} of {totalQuestions}
        </Badge>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-mist">
        <div
          className="h-2 rounded-full bg-plum transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question card */}
      <Card>
        <CardContent className="space-y-6 pt-6">
          <h2 className="text-lg font-semibold text-ink">{question.question}</h2>

          <div className="space-y-3">
            {question.options.map((option, i) => {
              const isSelected = answers[currentQuestion] === i
              return (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                    isSelected
                      ? 'border-plum bg-plum/5 font-medium text-plum'
                      : 'border-mist text-ink/70 hover:border-plum/30 hover:bg-mist/30'
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-medium ${
                      isSelected ? 'border-plum bg-plum text-white' : 'border-ink/20 text-ink/50'
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={() => goToQuestion(currentQuestion - 1)}
          disabled={currentQuestion === 0}
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => goToQuestion(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === currentQuestion
                  ? 'bg-plum'
                  : answers[i] !== undefined
                    ? 'bg-fern'
                    : 'bg-ink/20'
              }`}
            />
          ))}
        </div>

        {isLastQuestion ? (
          <Button variant="primary" onClick={submitQuiz}>
            Submit Quiz
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={() => goToQuestion(currentQuestion + 1)}
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
