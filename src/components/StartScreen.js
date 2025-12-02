function StartScreen({ numQuestions, handleClick }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quizz</h2>
      <h3>{numQuestions} questions to test your React</h3>
      <button className="btn btn-ui" onClick={handleClick}>
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
