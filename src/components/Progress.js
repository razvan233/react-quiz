function Progress({ numQuestions, currQuestion, totalPoints, currPoints }) {
  return (
    <div className="progress">
      <progress max={numQuestions} value={currQuestion + 1}></progress>
      <div>
        Question <b>{currQuestion + 1}</b> / {numQuestions}
      </div>
      <div>
        <b>{currPoints}</b> / {totalPoints} points
      </div>
    </div>
  );
}

export default Progress;
