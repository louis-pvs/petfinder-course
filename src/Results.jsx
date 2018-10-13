import React, { Fragment } from "react";

import TableRow from "./TableRow";
import SearchBar from "./SearchBar";
import { findPetResponse, petfinder } from "./utils";

class Results extends React.PureComponent {
  state = { pets: [], errors: {}, loading: true };
  componentDidMount = () => {
    this.handleSearch();
  };
  handleSearch = searchParams => {
    this.setState({ loading: true });
    const promise = petfinder.pet.find({
      output: "full",
      location: "Seattle, WA",
      ...searchParams
    });
    promise.then(this.handleFindPetResponse);
  };
  handleFindPetResponse = data => {
    this.setState({ pets: findPetResponse(data), loading: false });
  };
  renderTableRow(pet) {
    return <TableRow pet={pet} key={pet.id} />;
  }
  renderTable() {
    if (this.state.loading) return <p>loading</p>;
    if (!this.state.pets) {
      return (
        <p>
          No Animal found :(
          <button onClick={this.handleSearch}>clear filter</button>
        </p>
      );
    }
    return (
      <table>
        {this.state.errors.message}
        <tbody>{this.state.pets.map(this.renderTableRow)}</tbody>
      </table>
    );
  }
  render() {
    return (
      <Fragment>
        <SearchBar onSearch={this.handleSearch} />
        {this.renderTable()}
      </Fragment>
    );
  }
}

export default Results;
