import blueBlob from "./assets/blue-blob.svg"
import yellowBlob from "./assets/yellow-blob.svg"

function App() {
  return (
    <main className="main">

      <img src={yellowBlob} className="yellow-blob" alt="" />
      <img src={blueBlob} className="blue-blob" alt="" />
      <h1>Quizzical</h1>
      <h3>Interactive quizzes app for enhancing knowledge.</h3>
      <button className="start--btn">Start quiz</button>
    </main>
  );
}

export default App;
