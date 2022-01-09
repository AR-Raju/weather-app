import { Button, TextField } from "@material-ui/core";
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
      style={{
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
        width: "100%",
        gap: "20px",
      }}
      data-testid="home"
    >
      <h3>Home</h3>
      <TextField
        value={countryName}
        placeholder="Enter Country Name"
        onChange={handleInput}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Get Details
      </Button>
    </div>
  );
};

export default Home;
