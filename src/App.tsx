import React, { useState } from 'react'
import { fetchQuizQuestions } from './API'

// Components
import QuestionCard from './components/QuestionCard'
// Types
import { QuestionState, Difficulty } from './API'

type AnswerObject = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10

const App: React.FC = () => {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  console.log(questions);
  
  const startTrivia = async () => {
    try {
      setLoading(true)
      setGameOver(false)

      const newQuestion = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      )

      setQuestions(newQuestion)
      setScore(0)
      setUserAnswers([])
      setNumber(0)
      setLoading(false)

    } catch (error) {
      console.log(error.message)
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // user answer
      const answer = e.currentTarget.value
      // check answer against correct answer
      const correct = questions[number].correct_answer === answer
      // add score if correct answer
      if (correct) setScore(prev => prev + 1)
      //save answer in array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = number + 1
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }

  return (
    <div className="app">

      <h1>QUIZ APP</h1>

      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
         <button className="app__start" onClick={startTrivia}>
             Start Quiz
         </button>
      ) : null}

      {!gameOver ? <p className="app__score">Score: {score}</p> : null}

      {loading && <p>Loading qiestion.....</p>}

      {!loading && !gameOver && (
        <QuestionCard
         questionNumber={number + 1}
         totalQuestions={TOTAL_QUESTIONS}
         question={questions[number].question}
         answers={questions[number].answers}
         userAnswer={userAnswers ? userAnswers[number] : undefined}
         callback={checkAnswer}
        />
      )}
      
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className="app__next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
      
    </div>
  )
}

export default App
