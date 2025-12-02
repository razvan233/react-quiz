import React from "react";
import { render, screen } from "@testing-library/react";
import Question from "../Question";

jest.useFakeTimers();

describe("Question component", () => {
  const question = {
    question: "Is this a test?",
    options: ["Yes", "No"],
    correctOption: 0,
    points: 1,
  };

  test("shows question text and triggers timeFinished when timer is 0", () => {
    const dispatch = jest.fn();
    window.alert = jest.fn();
    render(
      <Question
        question={question}
        answer={null}
        dispatch={dispatch}
        timer={0}
      />
    );
    expect(screen.getByText(/Is this a test\?/i)).toBeInTheDocument();
    expect(window.alert).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({ type: "timeFinished" });
  });
});
