import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";

// describe("Full App component testing", () => {
//   test("full app rendering", () => {
//     render(<App />);
//     const linkElement = screen.getByTestId("app");
//     expect(linkElement).toBeInTheDocument();
//   });

jest.mock("../components/Home.tsx", () => {
  const MockName = () => <div>HomePageMock</div>;
  return MockName;
});

describe("should test react router", () => {
  test("should render Home page component", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("HomePageMock")).toBeInTheDocument();
  });

  test("should render CountryInfo page component", () => {
    const history = createMemoryHistory({
      initialEntries: ["/country/Bangladesh"],
    });
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(history.location.pathname).toBe("/country/Bangladesh");
  });

  test("landing on a bad page", () => {
    const history = createMemoryHistory({
      initialEntries: ["/some/bad/routes"],
    });
    render(
      <Router history={history}>
        <App />
      </Router>
    );

    expect(history.location.pathname).toBe("/some/bad/routes");
  });
});
