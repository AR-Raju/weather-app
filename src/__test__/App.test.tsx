import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App component testing", () => {
  test("full app rendering", () => {
    render(<App />);
    const linkElement = screen.getByTestId("app");
    expect(linkElement).toBeInTheDocument();
  });
});
