import {useState, useEffect, Fragment, useRef} from "react"
import {encode, decode} from 'html-entities';
import { clsx } from "clsx"

export default function Questions() {
     const [score, setScore] = useState(0)
     const [checked, setChecked] = useState(false)
     const [questions, setQuestions] = useState([])
     const [areAllQuestionsAnswered, setAreAllQuestionsAnswered] = useState(false)
     const [count, setCount] = useState(1)


    console.log('Are all questions answered?', areAllQuestionsAnswered);

    const hasRenderedOnce = useRef(false);

     useEffect(() => {

        if (hasRenderedOnce.current) {
            
            return;
        }
        hasRenderedOnce.current = true;
        console.log(`Fetching questions from API...${count} `)
        console.log('Count value:', count)
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
            
            
    }, [count])

    const questionsElements = questions.map((question, index) => (
        <Fragment key={index}>
        <div className="question" key={index}>
            <h2>Question {index + 1}</h2>
            <p>{decode(question.question)} <span className={`difficulty difficulty-${question.difficulty}`}> {question.difficulty} </span></p>
            <ul>
                {question.answers.map((answer, index) => (
                    
                    <li  
                    className={clsx({answer_success: checked && answer === question.correct_answer, answer_error: checked && answer === question.selected_answer && answer !== question.correct_answer})}
                    
                    aria-disabled="true"
                    onClick={(e) => handleAnswers(e)}
                     key={decode(answer)}>{decode(answer)}</li>
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

        console.log('Selected answer:', selectedAnswer.textContent);

        setQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            const questionIndex = Array.from(document.querySelectorAll('.question')).indexOf(selectedAnswer.closest('.question'));
            updatedQuestions[questionIndex].selected_answer = selectedAnswer.textContent;
            return updatedQuestions;
        });

        console.log('Updated questions:', questions);

        setAreAllQuestionsAnswered(Array.from(document.querySelectorAll('.question')).every(question => {
            return question.querySelector('.answer-selected') !== null;
        }));
        console.log('Are all questions answered?', areAllQuestionsAnswered);
    }

    function handleCheckAnswers() {
        const allQuestions = document.querySelectorAll('.question');
        let newScore = 0;

        allQuestions.forEach((question, index) => {
            const selectedAnswer = question.querySelector('.answer-selected');
            const correctAnswer = questions[index].correct_answer;

            if (selectedAnswer && selectedAnswer.textContent === correctAnswer) {
                newScore++;
            }
        });
        setChecked(true);
        setScore(newScore);
    }

    function startOver() {
        // setScore(0)
        // setChecked(false)
        // setQuestions([])
        // setAreAllQuestionsAnswered(false)
        // hasRenderedOnce.current = false;
        // setCount(prevCount => prevCount++)
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
        {!checked && <button onClick={handleCheckAnswers} disabled={!areAllQuestionsAnswered} className="check-btn">Check Answers</button>}
    
       {checked && <button onClick={startOver} className="startOver"> Next questions</button>}
        {checked && (
            <div>
                <p className="score">You scored {score}/5 correct answers</p>
            </div>
        )}
      </section>
    </main>
  )
}