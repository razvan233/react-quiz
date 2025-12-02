import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Option from "../Option";

describe("Option component", () => {
  const question = {
    question: "Sample?",
    options: ["A", "B", "C"],
    correctOption: 1,
    points: 1,
  };

  test("renders options and formatted timer", () => {
    const dispatch = jest.fn();
    render(
      <Option question={question} answer={null} dispatch={dispatch} timer={5} />
    );
    // options
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
    // timer formatted as 00:05
    expect(screen.getByText(/00:05/)).toBeInTheDocument();
  });

  test("clicking an option dispatches newAnswer and Next appears when answered", () => {
    const dispatch = jest.fn();
    const { rerender } = render(
      <Option
        question={question}
        answer={null}
        dispatch={dispatch}
        timer={10}
      />
    );
    const optionButton = screen.getByText("A");
    fireEvent.click(optionButton);
    expect(dispatch).toHaveBeenCalledWith({ type: "newAnswer", payload: 0 });

    // show Next when answer is non-null
    rerender(
      <Option question={question} answer={0} dispatch={dispatch} timer={10} />
    );
    const nextBtn = screen.getByText(/Next/i);
    fireEvent.click(nextBtn);
    expect(dispatch).toHaveBeenCalledWith({ type: "nextQuestion" });
  });
});
