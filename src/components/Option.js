function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function Option({ question, answer, dispatch, timer }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            answer !== null
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={answer}
        >
          {option}
        </button>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "4rem",
        }}
      >
        <div className="timer">{formatTime(timer)}</div>
        <button
          className="btn"
          style={answer !== null ? {} : { display: "none" }}
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Option;
