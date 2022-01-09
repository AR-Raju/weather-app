import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import CountryInfo, { InitProps } from "../components/CountryInfo";
import { Router } from "react-router-dom";

test("renders countryInfo test", () => {
  const history = createMemoryHistory();
  const name: InitProps = { name: "" };
  history.push(`/country/${name}`);
  render(
    <Router history={history}>
      <CountryInfo />
    </Router>
  );
  const linkElement = screen.getByTestId("countryInfo");
  expect(linkElement).toBeInTheDocument();
});
