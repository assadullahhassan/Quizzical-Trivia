import React from "react"

export default function Questions() {
     const [score, setScore] = React.useState(0)
     const [checked, setChecked] = React.useState(true)

  return (
    <main>
        <section className="questions-header">
            <h1>Questions</h1>
            <p>Here are some questions for you!</p>
        </section>
        <section id="spacer"></section>

        <section id="questions" className="questions-container">
            <div className="question">
                <h2>Question 1</h2>
                <p>What is the capital of France?</p>
                <ul>
                    <li className="selected">Berlin</li>
                    <li>Madrid</li>
                    <li>Paris</li>
                    <li>Rome</li>
                </ul>
            </div>
            <section id="spacer"></section>
            <div className="question">
                <h2>Question 2</h2>
                <p>What is the largest planet in our solar system?</p>
                <ul>
                    <li>Earth</li>
                    <li>Jupiter</li>
                    <li>Mars</li>
                    <li>Saturn</li>
                </ul>
            </div>
            <section id="spacer"></section>
            <div className="question">
                <h2>Question 3</h2>
                <p>What is the chemical symbol for gold?</p>
                <ul>
                    <li>Au</li>
                    <li>Ag</li>
                    <li>Fe</li>
                    <li>Hg</li>
                </ul>
            </div>
           <section id="spacer"></section>
        </section>
      
      <section className="check-answers-container">
        <button className="check-btn">Check Answers</button>
        {checked && (
            <div>
                <p className="score">You scored {score}/3 correct answers</p>
            </div>
        )}
      </section>
    </main>
  )
}