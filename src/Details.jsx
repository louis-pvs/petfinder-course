import React from "react";
import PropTypes from "prop-types";
import { findPetResponse, combineBreed, petfinder } from "./utils";
import { navigate } from "@reach/router";
import SearchBar from "./SearchBar";
import Carousel from "./Carousel";

class Details extends React.PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
  state = { loading: true, pet: "" };

  componentDidMount = () => {
    const promise = petfinder.pet.get({ output: "full", id: this.props.id });
    promise.then(this.handleFindPetResponse).catch(() => navigate("/"));
  };
  handleFindPetResponse = data => {
    let pet = findPetResponse(data);
    if (pet.length) this.setState({ pet: pet[0], loading: false });
  };

  render() {
    if (this.state.loading) return <p>loading</p>;
    if (!this.state.pet) return <p>error fetching pet infos</p>;
    const {
      name,
      media,
      description,
      contact,
      animal,
      breeds
    } = this.state.pet;
    return (
      <div>
        <SearchBar />
        <Carousel media={media} name={name} />
        <h2>{name}</h2>
        <h4>{combineBreed(breeds)}</h4>
        <p>
          {animal} - {contact.city}, {contact.state}
        </p>
        <p>{description}</p>
      </div>
    );
  }
}

export default Details;
