import React from 'react';
import { nanoid } from 'nanoid';
import he from 'he';
import Question from './Question';

function Quiz() {
    const [questions, setQuestions] = React.useState([]);
    const [playAgain, setPlayAgain] = React.useState(0)
    const [checked, setChecked] = React.useState(false);
    const [totalScore, setTotalScore] = React.useState(0);
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
    }, [playAgain]);
    const resetQuiz = () => {
        setQuestions([]); // Reset the questions array to an empty array
        setChecked(false); // Set checked back to false
        setTotalScore(0); // Reset the totalScore to 0
        setPlayAgain(playAgain + 1)
    }
    ;
    const handleAnswerCheck = function () {
        setChecked(true);
        let score = 0;
        questions.forEach(q => {
            if (q.selectedAnswer === q.correctAnswer) {
                score++;
            }
        });
        setTotalScore(score);
    };
    const handleAnswerSelect = (questionId, selectedAnswer) => {
        if (!checked) {
            const updatedQuestions = questions.map(q => {
                if (q.id === questionId) {
                    return {
                        ...q,
                        selectedAnswer:
                            q.selectedAnswer === selectedAnswer
                                ? null
                                : selectedAnswer, // Toggle the selected answer
                        isAnswered:
                            q.selectedAnswer === selectedAnswer ? false : true,
                    };
                }
                return q;
            });
            setQuestions(updatedQuestions);
        }
    };

    const questionElement =
        questions.length > 0
            ? questions.map(q => (
                  <Question
                      key={q.id}
                      question={q}
                      selectedAnswer={q.selectedAnswer}
                      onAnswerSelect={handleAnswerSelect}
                      checked = {checked}
                  ></Question>
              ))
            : [];

    return (
        <div className="quiz--container">
            <div>{questionElement}</div>
            <div className='score-container'>

            
            {!checked ? (
                <button className='check--btn' onClick={handleAnswerCheck}>Check Answers</button>
            ) : (
                <h4>
                    {' '}
                    You scored {totalScore}/5 <button className='play-again--btn' onClick={resetQuiz}>Play again</button>{' '}
                </h4>
            )}
            </div>
        </div>
    );
}
export default Quiz;
