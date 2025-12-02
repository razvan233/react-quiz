import React from "react";
import { render, screen, within } from "@testing-library/react";
import Progress from "../Progress";

test("renders progress details", () => {
  render(
    <Progress
      numQuestions={4}
      currQuestion={1}
      totalPoints={8}
      currPoints={2}
    />
  );
  expect(screen.getByText(/Question/i)).toBeInTheDocument();
  // `currPoints` is wrapped in a <b> element; locate the points <div> using selector
  const pointsDiv = screen.getByText(/points/i, { selector: "div" });
  const pointsWithin = within(pointsDiv);
  expect(pointsWithin.getByText("2", { selector: "b" })).toBeInTheDocument();
  expect(pointsWithin.getByText(/8 points/i)).toBeInTheDocument();
});
