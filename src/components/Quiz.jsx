import React from 'react';
import { nanoid } from 'nanoid';
import he from 'he';
import Question from './Question';

function Quiz() {
    const [questions, setQuestions] = React.useState([]);
    const [checked, setChecked] = React.useState(false)
    function shuffleQuestions(incorrectAnswers, correctAnswer) {
        const index = Math.trunc(Math.random() * 4);
        const mixedQuestions = [
            ...incorrectAnswers.slice(0, index),
            correctAnswer,
            ...incorrectAnswers.slice(index),
        ];
        return mixedQuestions;
    }

    React.useEffect(() => {
        async function getQuestions() {
            const res = await fetch(
                'https://opentdb.com/api.php?amount=5&type=multiple'
            );
            const data = await res.json();
            let q = [];
            data.results.forEach(ques => {
                q.push({
                    id: nanoid(),
                    question: ques.question,
                    answers: shuffleQuestions(
                        ques.incorrect_answers,
                        ques.correct_answer
                    ),
                    correctAnswer: ques.correct_answer,
                    isAnswered: false,
                });
            });
            setQuestions(q);
        }
        getQuestions();
    }, []);

    const questionElement =
        questions.length > 0
            ? questions.map(q => (
                  <Question
                      key={q.id}
                      question={q.question}
                      answers={q.answers}
                      isAnswered={q.isAnswered}
                  ></Question>
              ))
            : [];

    return (
        <div className="quiz--container">
            <div>{questionElement}</div>
            {!checked ? (
                <button>Check Answers</button>
            ) : (
                <h4> You scored 0/5 </h4>
            )}
        </div>
    );
}
export default Quiz;
