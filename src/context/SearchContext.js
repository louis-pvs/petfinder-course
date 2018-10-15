import React from "react";

const SearchContext = React.createContext({
  location: "Seattle, WA",
  animal: "",
  breed: "",
  breeds: [],
  initialBreeds() {},
  handleAnimalSelect() {},
  handleBreedSelect() {},
  handleInputChange() {},
  handleSearch() {},
  handleSearchClick() {}
});

export const Provider = SearchContext.Provider;
export const Consumer = SearchContext.Consumer;
