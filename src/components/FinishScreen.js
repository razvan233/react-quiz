function FinishScreen({ points, totalPoints, highScore, handleClick }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p className="result" style={{ width: "100%" }}>
        You scored <b>{points}</b> out of <b>{totalPoints}</b> (
        {Math.ceil((points / totalPoints) * 100)}%)
      </p>
      <p style={{ fontSize: "24px" }}>Your highest score is: {highScore}</p>
      <button
        className="btn"
        style={{ width: "50%", marginTop: "24px" }}
        onClick={handleClick}
      >
        Reset Quiz
      </button>
    </div>
  );
}

export default FinishScreen;
