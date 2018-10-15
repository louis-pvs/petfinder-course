import React from "react";
import { render } from "react-dom";
import { Router, Link, navigate } from "@reach/router";

import { Provider } from "./context/SearchContext";
import Results from "./Results";
import Details from "./Details";
import { petfinder, findPetResponse } from "./utils";

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      pets: [],
      errors: {},
      loading: true,
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [],
      initialBreeds: this.initialBreeds,
      handleAnimalSelect: this.handleAnimalSelect,
      handleBreedSelect: this.handleBreedSelect,
      handleInputChange: this.handleInputChange,
      handleSearch: this.handleSearch,
      handleSearchClick: this.handleSearchClick
    };
  }
  initialBreeds = () => {
    this.setState({ breeds: [] });
  };
  initialNavigation() {
    navigate("/");
  }
  getBreeds = () => {
    petfinder.breed
      .list({ animal: this.state.animal })
      .then(data => {
        if (
          !data.petfinder ||
          !data.petfinder.breeds ||
          !data.petfinder.breeds.breed
        ) {
          return [];
        }
        return data.petfinder.breeds.breed;
      })
      .then(breeds => this.setState({ breeds }))
      .catch(this.initialBreeds);
  };
  getPets = searchParams => {
    this.setState({ loading: true });
    const defaultParams = {
      output: "full",
      location: "Seattle, WA"
    };
    const promise = petfinder.pet.find(
      Object.assign(defaultParams, searchParams)
    );
    promise.then(this.handleFindPetResponse);
  };
  handleSearch = () => {
    this.getPets({
      animal: this.state.animal,
      breed: this.state.breed,
      location: this.state.location
    });
  };
  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value
    });
  };
  handleAnimalSelect = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.getBreeds);
  };
  handleBreedSelect = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleSearch);
  };
  handleFindPetResponse = data => {
    this.setState(
      { pets: findPetResponse(data), loading: false },
      this.initialNavigation
    );
  };
  handleSearchClick = event => {
    event.preventDefault();
    this.handleSearch();
  };
  render() {
    return (
      <div>
        <header>
          <h1>
            <Link to="/">Adopt me!</Link>
          </h1>
        </header>
        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <Details path="/details/:id" />
          </Router>
        </Provider>
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
