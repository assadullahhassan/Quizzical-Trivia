import {useState, useEffect, Fragment} from "react"
import {encode, decode} from 'html-entities';

export default function Questions() {
     const [score, setScore] = useState(0)
     const [checked, setChecked] = useState(true)
     const [questions, setQuestions] = useState([])

     useEffect(() => {
        console.log('Fetching questions from API... 1')
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            .then(response => response.json())
            .then(data => {
                console.log(data.results)
                if (data.results) {
                    const questions = data.results.map((question) => {
                        const answersArr = [...question.incorrect_answers, question.correct_answer]
                        const shuffledAnswers = shuffleArray(answersArr)
                        return {
                            question: question.question,
                            correct_answer: question.correct_answer,
                            incorrect_answers: shuffledAnswers,
                            answers: shuffledAnswers,
                            difficulty: question.difficulty
                        }
                    })

                    console.log('Questions fetched:', questions)
                    setQuestions(questions)
                }
            })
            
        const correctAnswers = ['Paris', 'Jupiter', 'Au']
        const userAnswers = ['Berlin', 'Jupiter', 'Au']

        // let newScore = 0
        // for (let i = 0; i < correctAnswers.length; i++) {
        //     if (correctAnswers[i] === userAnswers[i]) {
        //         newScore++
        //     }
        // }
        // setScore(newScore)
    }, [1])

    const questionsElements = questions.map((question, index) => (
        <Fragment key={index}>
        <div className="question" key={index}>
            <h2>Question {index + 1}</h2>
            <p>{decode(question.question)} <span className={`difficulty difficulty-${question.difficulty}`}> {question.difficulty} </span></p>
            <ul>
                {question.answers.map((answer, index) => (
                    <li onClick={(e) => handleAnswers(e)} key={decode(answer)}>{decode(answer)}</li>
                ))}
            </ul>
        </div>
        <section id="spacer"></section>
        </Fragment>
    ))

    function shuffleArray(array) {
    const shuffled = [...array]; 
    
    for (let i = shuffled.length - 1; i > 0; i--) {
       
        const j = Math.floor(Math.random() * (i + 1));
    
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
    }

    function handleAnswers(event) {
        const selectedAnswer = event.target;
        const allAnswers = selectedAnswer.parentElement.querySelectorAll('li');

        allAnswers.forEach(answer => {
            answer.classList.remove('answer-selected');
        });
        selectedAnswer.classList.add('answer-selected');

    }

  return (
    <main>
        <section className="questions-header">
            <h1>Questions</h1>
            <p>Here are some questions for you!</p>
        </section>
        <section id="spacer"></section>

        <section id="questions" className="questions-container">
            {questionsElements}
        </section>
      
      <section className="check-answers-container">
        <button className="check-btn">Check Answers</button>
        {checked && (
            <div>
                <p className="score">You scored {score}/5 correct answers</p>
            </div>
        )}
      </section>
    </main>
  )
}