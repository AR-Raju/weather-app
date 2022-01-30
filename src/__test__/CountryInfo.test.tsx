import React from "react";
import { render, screen, act } from "@testing-library/react";
import CountryInfo, { InitCountryInfo } from "../components/CountryInfo";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
global.fetch = jest.fn(() => {
  const country = {
    capital: ["Dhaka"],
    population: 1234,
    latlng: [1, 2],
    flags: {
      svg: "image link",
    },
  } as InitCountryInfo;
  Promise.resolve({
    json: () => Promise.resolve(country),
  });
}) as jest.Mock;

describe("CountryInfo", () => {
  it("loads the country on mount", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <CountryInfo />
      </Router>
    );
    // const countryInfo = screen.getByTestId("countryInfo");
    // expect(countryInfo).toBeInTheDocument();
    expect(screen.getByText(/Dhaka/)).toBeInTheDocument();
  });
});
