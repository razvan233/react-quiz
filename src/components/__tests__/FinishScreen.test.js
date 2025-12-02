import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FinishScreen from "../FinishScreen";

test("displays results and reset button triggers handler", () => {
  const handleClick = jest.fn();
  render(
    <FinishScreen
      points={3}
      totalPoints={5}
      highScore={4}
      handleClick={handleClick}
    />
  );
  expect(screen.getByText(/You scored/i)).toBeInTheDocument();
  expect(screen.getByText(/Your highest score is:/i)).toBeInTheDocument();
  const btn = screen.getByText(/Reset Quiz/i);
  fireEvent.click(btn);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
