import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({ json: async () => [] });
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
