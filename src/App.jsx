import React from "react";
import blueBlob from "./assets/blue-blob.svg"
import yellowBlob from "./assets/yellow-blob.svg"
import Quiz from "./components/Quiz";


function App() {
  const [quizRunnig, setQuizRunning] = React.useState(false);

  
  function startQuiz() {
    setQuizRunning(preValue => !preValue)
  }
  return (
    <main>
      <img src={yellowBlob} className="yellow-blob" alt="" />
      {
        !quizRunnig ? 
          
        <div className="main">
          <h1>Quizzical</h1>
          <h3>Interactive quizzes app for enhancing knowledge.</h3>
          <button className="start--btn" onClick={startQuiz}>Start quiz</button>
        </div>
          
        :
        <Quiz />
      }
        <img src={blueBlob} className="blue-blob" alt="" />
      </main> 
  );
}

export default App;
