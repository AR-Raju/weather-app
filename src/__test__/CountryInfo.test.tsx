import React from "react";
import { render, screen } from "@testing-library/react";
import CountryInfo from "../components/CountryInfo";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { getCountryData, getWeatherData } from "../api/countryAPI";

describe("CountryInfo component and unit testing=>", () => {
  it("should render component", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <CountryInfo />
      </Router>
    );
    const countryInfo = screen.getByTestId("countryInfo");
    expect(countryInfo).toBeInTheDocument();
  });

  it("should load country data", async () => {
    return await getCountryData("Bangladesh").then((data) => {
      expect(data).toBeDefined();
      expect(data[0].capital[0]).toEqual("Dhaka");
    });
  });

  it("should load capital weather data", async () => {
    return await getWeatherData("Dhaka").then((data) => {
      expect(data).toBeDefined();
    });
  });
});
