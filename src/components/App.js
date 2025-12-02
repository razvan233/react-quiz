import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
  questions: [],
  status: "loading", // loading, ready, active, error, finished
  currentQuestionIndex: 0,
  answer: null,
  points: 0,
  timer: 15 * 60, // 15min
  highScore: Number(localStorage.getItem("highScore")),
};

const reducer = (state, action) => {
  switch (action.type) {
    default:
      throw new Error("Unknown action");
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const currentQuestion = state.questions[state.currentQuestionIndex];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "nextQuestion":
      const lastQuestion =
        state.currentQuestionIndex === state.questions.length - 1;
      if (lastQuestion && state.points > state.highScore)
        localStorage.setItem("highScore", state.points);
      return {
        ...state,
        currentQuestionIndex: lastQuestion
          ? state.currentQuestionIndex
          : state.currentQuestionIndex + 1,
        status: lastQuestion ? "finished" : state.status,
        highScore: lastQuestion
          ? state.points > state.highScore
            ? state.points
            : state.highScore
          : state.highScore,
        answer: null,
      };

    case "updateTimer":
      return {
        ...state,
        timer: state.timer - 1,
      };

    case "reset":
      return {
        ...state,
        status: "ready",
        currentQuestionIndex: 0,
        timer: 15 * 60,
        points: 0,
        answer: null,
      };

    case "timeFinished":
      return { ...state, status: "finished" };
  }
};

function App() {
  const [
    {
      questions,
      status,
      currentQuestionIndex,
      answer,
      points,
      timer,
      highScore,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((tp, q) => tp + q.points, 0);
  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8000/questions")
        .then(async (res) => {
          const data = await res.json();
          dispatch({ type: "dataReceived", payload: data });
        })
        .catch((err) => dispatch({ type: "dataFailed", payload: err }));
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            handleClick={() => dispatch({ type: "start" })}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              currQuestion={currentQuestionIndex}
              totalPoints={totalPoints}
              currPoints={points}
            />
            <Question
              question={questions[currentQuestionIndex]}
              answer={answer}
              dispatch={dispatch}
              timer={timer}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            handleClick={() => dispatch({ type: "reset" })}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
