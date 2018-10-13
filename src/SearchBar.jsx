import React from "react";
import PropTypes from "prop-types";
import { ANIMALS } from "petfinder-client";
import SelectInput from "./SelectInput";
import Input from "./Input";

import { petfinder } from "./utils";

class SearchBar extends React.PureComponent {
  static propTypes = {
    onSearch: PropTypes.func
  };
  state = {
    location: "Seattle, WA",
    animal: "",
    breed: "",
    breeds: []
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
  handleSearch = () => {
    this.props.onSearch({
      animal: this.state.animal,
      breed: this.state.breed,
      location: this.state.location
    });
  };
  handleSearchClick(event) {
    event.preventDefault();
    this.handleSearch();
  }
  initialBreeds = () => {
    this.setState({ breeds: [] });
  };
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
  render() {
    return (
      <form onSubmit={this.handleSearchClick}>
        <Input
          id="location"
          label="Location"
          onChange={this.handleInputChange}
          value={this.state.location}
        />
        <SelectInput
          disabled={!this.state.breeds.length}
          id="breed"
          label="Breeds"
          onSelect={this.handleBreedSelect}
          options={this.state.breeds}
          value={this.state.breed}
        />
        <SelectInput
          disabled={!ANIMALS}
          id="animal"
          label="Animal"
          onSelect={this.handleAnimalSelect}
          options={ANIMALS}
          value={this.state.animal}
        />
        <button onClick={this.handleSearchClick}>Search</button>
      </form>
    );
  }
}

export default SearchBar;
