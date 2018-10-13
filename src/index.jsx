import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";

import Results from "./Results";
import Details from "./Details";

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <header>
          <h1>
            <Link to="/">Adopt me!</Link>
          </h1>
        </header>
        <Router>
          <Results path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
