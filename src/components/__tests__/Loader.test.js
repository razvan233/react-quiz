import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "../Loader";

test("shows loading text", () => {
  render(<Loader />);
  expect(screen.getByText(/Loading questions.../i)).toBeInTheDocument();
});
