import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StartScreen from "../StartScreen";

test("renders welcome and start button and responds to click", () => {
  const handleClick = jest.fn();
  render(<StartScreen numQuestions={5} handleClick={handleClick} />);
  expect(screen.getByText(/Welcome to the React Quizz/i)).toBeInTheDocument();
  expect(
    screen.getByText(/5 questions to test your React/i)
  ).toBeInTheDocument();
  const btn = screen.getByText(/Let's Start/i);
  fireEvent.click(btn);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
