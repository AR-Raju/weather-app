import { Button, Input, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  const [countryName, setCountryName] = useState<string>();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryName(e.target.value);
  };

  const handleSubmit = () => {
    history.push(`/country/${countryName}`);
  };
  return (
    <div
      data-testid="home"
      style={{
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
        width: "100%",
        gap: "20px",
      }}
    >
      <h3>Home</h3>
      <TextField
        inputProps={{
          "data-testid": "country_input",
        }}
        value={countryName}
        placeholder="Enter Country Name"
        onChange={handleInput}
      />
      <Button
        data-testid="submit"
        variant="contained"
        color="primary"
        disabled={!countryName}
        onClick={handleSubmit}
      >
        Get Details
      </Button>
    </div>
  );
};

export default Home;
