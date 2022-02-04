import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import CountryInfo from "./components/CountryInfo";
import PageNotFound from "./components/PageNotFound";

const NoMatch = () => <div>No match</div>;

function App() {
  return (
    <div data-testid="app">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/country/:name" component={CountryInfo} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
