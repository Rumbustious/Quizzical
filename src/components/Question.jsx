import he from 'he';
import { nanoid } from 'nanoid';
function Question(props) {
    function handleClick(event) {
        const { value } = event.target;
        console.log(value)
    }
    let choices = props.answers.map(answer => (
        <button key={nanoid()} id="" onClick={handleClick}>
            {he.decode(answer)}
        </button>
    ));

    return (
        <div className="question--container">
            <h3>{he.decode(props.question)}</h3>
            {choices}
        </div>
    );
}

export default Question;
