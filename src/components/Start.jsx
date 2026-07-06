import blob from '../assets/blob1.png'
import logo from '../assets/quizzical-logo-trans.png'

export default function Start({ handleStartQuiz }) {
  return (
    <section id="center">
      <img src={blob} alt="Blob" className="blob" />
        <img src={logo} alt="Quizzical Logo" className="logo" />
      <p>Test your knowledge with the fun quizzes!</p>
      <button className="start-btn" onClick={handleStartQuiz}>
        Start Quiz
      </button>
    </section>
  )
}