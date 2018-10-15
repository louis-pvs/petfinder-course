import React from "react";
import { ANIMALS } from "petfinder-client";
import SelectInput from "./SelectInput";
import Input from "./Input";
import { Consumer } from "./context/SearchContext";

function SearchBar() {
  return (
    <Consumer>
      {function renderForm(context) {
        return (
          <form onSubmit={context.handleSearchClick}>
            <Input
              id="location"
              label="Location"
              onChange={context.handleInputChange}
              value={context.location}
            />
            <SelectInput
              disabled={!context.breeds.length}
              id="breed"
              label="Breeds"
              onSelect={context.handleBreedSelect}
              options={context.breeds}
              value={context.breed}
            />
            <SelectInput
              disabled={!ANIMALS}
              id="animal"
              label="Animal"
              onSelect={context.handleAnimalSelect}
              options={ANIMALS}
              value={context.animal}
            />
            <button onClick={context.handleSearchClick}>Search</button>
          </form>
        );
      }}
    </Consumer>
  );
}

export default SearchBar;
