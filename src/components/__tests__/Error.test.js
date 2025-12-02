import React from "react";
import { render, screen } from "@testing-library/react";
import Error from "../Error";

test("renders error message", () => {
  render(<Error />);
  expect(
    screen.getByText(/There was an error fecthing questions/i)
  ).toBeInTheDocument();
});
