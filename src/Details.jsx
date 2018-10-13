import React from "react";
import pfClient from "petfinder-client";
import PropTypes from "prop-types";
import { findPetResponse, findImage } from "./utils";

const petfinder = pfClient({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends React.PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
  state = { loading: true, pet: "" };

  componentDidMount = () => {
    const promise = petfinder.pet.get({ output: "full", id: this.props.id });
    promise.then(this.handleFindPetResponse);
  };
  handleFindPetResponse = data => {
    this.setState({ pet: findPetResponse(data), loading: false });
  };

  render() {
    if (this.state.loading) return <p>loading</p>;
    if (!this.state.pet) return <p>error fetching pet infos</p>;
    const { pet } = this.state;
    return (
      <div>
        <img src={findImage(pet[0])} alt={pet[0].name} />
      </div>
    );
  }
}

export default Details;
