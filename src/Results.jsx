import React from "react";
import pfClient from "petfinder-client";
import TableRow from "./TableRow";
import { findPetResponse } from "./utils";

const petfinder = pfClient({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.PureComponent {
  state = { pets: [], errors: {} };
  componentDidMount = () => {
    const promise = petfinder.pet.find({
      output: "full",
      location: "Seattle, WA"
    });
    promise.then(this.handleFindPetResponse);
  };
  handleFindPetResponse = data => {
    this.setState({ pets: findPetResponse(data) });
  };
  renderTableRow(pet) {
    return <TableRow pet={pet} key={pet.id} />;
  }
  render() {
    return (
      <table>
        {this.state.errors.message}
        <tbody>{this.state.pets.map(this.renderTableRow)}</tbody>
      </table>
    );
  }
}

export default Results;
