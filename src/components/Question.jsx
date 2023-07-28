import he from 'he';
import { nanoid } from 'nanoid';
function Question(props) {
    function handleClick(event) {
        const { value } = event.target;
        props.onAnswerSelect(props.question.id, value);
        console.log(value);
    }
    let choices = props.question.answers.map(answer => {
        let id = null;
        if (props.checked) {
            if (props.question.correctAnswer === answer) {
                id = 'correct';
            } else if (props.question.selectedAnswer === answer) {
                id = 'incorrect';
            } else {
                id = 'not-selected';
            }
        }

        return (
            <button
                key={nanoid()}
                id={id}
                value={answer}
                className={
                    answer === props.selectedAnswer
                        ? 'answer selected'
                        : 'answer'
                }
                onClick={handleClick}
            >
                {he.decode(answer)}
            </button>
        );
    });

    return (
        <div className="question--container">
            <h3>{he.decode(props.question.question)}</h3>
            {choices}
        </div>
    );
}

export default Question;
