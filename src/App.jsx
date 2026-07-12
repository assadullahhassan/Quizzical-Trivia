import { useState } from 'react'
import Start from './components/Start'
import Questions from './components/Questions'
import Footer from './components/Footer'

import './App.css'

function App() {
const [quizStarted, setQuizStarted] = useState(false)

function handleStartQuiz() {
  setQuizStarted(true)
}

  return (
    <>
      {quizStarted ? <Questions /> : <Start handleStartQuiz={handleStartQuiz} />}
      <section id="spacer"></section>
      {!quizStarted && <Footer />}
    </>
  )
}

export default App
