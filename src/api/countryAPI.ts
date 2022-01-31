export const getCountryData = (name: string) => {
  return fetch(`https://restcountries.com/v3.1/name/${name}`).then((res) =>
    res.json()
  );
};

export const getWeatherData = (capital: string | undefined) => {
  return fetch(
    `http://api.weatherstack.com/current?access_key=39ebf5f7a9365e8f8fd51d43b7922862&query=${capital}`
  ).then((res) => res.json());
};
