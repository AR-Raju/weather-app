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
import { getCountryData, getWeatherData } from "../api/countryAPI";
import { InitCountryInfo, InitWeatherInfo } from "../interfaceModel/Interfaces";

export interface InitParamsProps {
  name: string;
}

const CountryInfo = () => {
  const { name } = useParams<InitParamsProps>();

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

      getCountryData(name).then((data) => setCountryInfo(data[0]));

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  const getWeatherInfo = async () => {
    try {
      setWeatherLoading(true);

      getWeatherData(countryInfo?.capital[0]).then((data) =>
        setWeatherInfo(data.current)
      );

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
        <p>Loading country data...</p>
      ) : (
        <Card style={{ display: "flex" }}>
          <Box style={{ display: "flex", flexDirection: "column" }}>
            <CardContent style={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {name} Information
              </Typography>
              <Typography
                data-testid="capital"
                variant="subtitle1"
                component="div"
              >
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
        <p>Loading capital weather info...</p>
      ) : (
        weatherInfo && (
          <Card style={{ display: "flex" }}>
            <Box style={{ display: "flex", flexDirection: "column" }}>
              <CardContent style={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  {name}'s Capital {countryInfo?.capital[0]} Weather Information
                </Typography>
                <CardMedia
                  component="img"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
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
