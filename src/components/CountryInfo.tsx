import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface InitCountryInfo {
  capital: string[];
  population: number;
  latlng: number[];
  flags: {
    svg: string;
  };
}

export interface InitWeatherInfo {
  temperature: number;
  weather_icons: string[];
  wind_speed: number;
  precip: number;
}

export interface InitProps {
  name: string;
}

const CountryInfo = () => {
  const { name } = useParams<InitProps>();

  const [loading, setLoading] = useState<boolean>(false);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);

  const [countryInfo, setCountryInfo] = useState<InitCountryInfo>();
  const [weatherInfo, setWeatherInfo] = useState<InitWeatherInfo>();

  useEffect(() => {
    getCountryInfo();
  }, []);

  const getCountryInfo = async () => {
    try {
      setLoading(true);

      const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      const data = await res.json();

      setCountryInfo(data[0]);

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const getWeatherInfo = async () => {
    try {
      setWeatherLoading(true);

      const res = await fetch(
        `http://api.weatherstack.com/current?access_key=39ebf5f7a9365e8f8fd51d43b7922862&query=${countryInfo?.capital[0]}`
      );
      const data = await res.json();

      setWeatherInfo(data.current);

      setWeatherLoading(false);
    } catch (e) {
      setWeatherLoading(false);
      console.log(e);
    }
  };
  return (
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
        width: "100%",
        gap: "20px",
      }}
      data-testid="countryInfo"
    >
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Card style={{ display: "flex" }}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <CardContent style={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Country Information
              </Typography>
              <Typography variant="subtitle1" component="div">
                Capital: {countryInfo?.capital[0]}
              </Typography>
              <Typography variant="subtitle1" component="div">
                Population: {countryInfo?.population}
              </Typography>
              <Typography variant="subtitle1" component="div">
                Latitude: {countryInfo?.latlng[0]}
                <sup>o</sup>
              </Typography>
              <Typography variant="subtitle1" component="div">
                Langitude: {countryInfo?.latlng[1]}
                <sup>o</sup>
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            style={{ width: "300px", height: "auto" }}
            image={countryInfo?.flags.svg}
            alt="Live from Country Api"
          />
        </Card>
      )}
      {countryInfo && (
        <Button variant="contained" color="primary" onClick={getWeatherInfo}>
          Capital Weather
        </Button>
      )}
      {weatherLoading ? (
        <p>Loading...</p>
      ) : (
        weatherInfo && (
          <Card style={{ display: "flex" }}>
            <Box style={{ display: "flex", flexDirection: "column" }}>
              <CardContent style={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {name} Capital {countryInfo?.capital[0]} Weather Information
                </Typography>
                <CardMedia
                  component="img"
                  style={{ width: "100px", height: "100px" }}
                  image={weatherInfo?.weather_icons[0]}
                  alt="Live from Country Api"
                />
                <Typography variant="subtitle1" component="div">
                  Temperature: {weatherInfo?.temperature}
                  <sup>o</sup> celcius
                </Typography>
                <Typography variant="subtitle1" component="div">
                  Wind Speed: {weatherInfo?.wind_speed} km/h
                </Typography>
                <Typography variant="subtitle1" component="div">
                  Precipt: {weatherInfo?.precip}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        )
      )}
    </div>
  );
};

export default CountryInfo;
