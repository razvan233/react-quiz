import { useEffect } from "react";
import Option from "./Option";

function Question({ question, answer, dispatch, timer }) {
  useEffect(() => {
    if (timer === 0) {
      window.alert("You run out of time!");
      dispatch({ type: "timeFinished" });
      return;
    }
    const timeout = setTimeout(() => {
      dispatch({ type: "updateTimer" });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [dispatch, timer]);
  return (
    <div className="">
      <h4>{question.question}</h4>
      <Option
        question={question}
        answer={answer}
        dispatch={dispatch}
        timer={timer}
      />
    </div>
  );
}

export default Question;
