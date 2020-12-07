import React, { useState } from 'react'
import { fetchQuizQuestions } from './API'

// Components
import QuestionCard from './components/QuestionCard'
// Types
import { Difficulty } from './API'

const TOTAL_QUESTIONS = 10

const App: React.FC = () => {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY));
  
  const startTrivia = async () => {
    try {
    } catch (error) {
      console.log(error.message)
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {}

  const nextQuestion = () => {}

  return (
    <div className="app">
      <h1>QUIZ APP</h1>
      <button className="app__start" onClick={startTrivia}>
        Start Quiz
      </button>
      <p className="app__score">Score:</p>
      <p>Loading qiestion.....</p>
      {/*<QuestionCard
         questionNumber={number + 1}
         totalQuestions={TOTAL_QUESTIONS}
         question={questions[number].question}
         answers={questions[number].answers}
         userAnswer={userAnswers ? userAnswers[number] : undefined}
         callback={checkAnswer}
      />*/}
      <button className="app__next" onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  )
}

export default App
