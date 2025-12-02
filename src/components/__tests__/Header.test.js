import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

test("renders header title", () => {
  render(<Header />);
  expect(screen.getByText(/The React Quiz/i)).toBeInTheDocument();
});
