import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  beforeEach(() => {
    global.fetch = jest.fn(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ json: async () => [] }), 100)
        )
    );
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("initially shows loader and calls fetch", () => {
    render(<App />);
    expect(screen.getByText(/Loading questions.../i)).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/questions"
    );
  });
});
