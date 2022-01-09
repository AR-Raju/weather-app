import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import CountryInfo from "./components/CountryInfo";

function App() {
  return (
    <div data-testid="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/country/:name" component={CountryInfo} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
