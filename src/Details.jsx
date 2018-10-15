import React from "react";
import PropTypes from "prop-types";
import { findPetResponse, combineBreed, petfinder } from "./utils";
import { navigate } from "@reach/router";
import SearchBar from "./SearchBar";
import Carousel from "./Carousel";
import Modal from "./Modal";

class Details extends React.PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };
  state = { loading: true, pet: "", showModal: true };

  componentDidMount = () => {
    const promise = petfinder.pet.get({ output: "full", id: this.props.id });
    promise.then(this.handleFindPetResponse).catch(() => navigate("/"));
  };
  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };
  handleFindPetResponse = data => {
    let pet = findPetResponse(data);
    if (pet.length) this.setState({ pet: pet[0], loading: false });
  };
  renderModal() {
    if (!this.state.showModal || !this.state.pet) return null;
    const { name } = this.state.pet;
    return (
      <Modal>
        <h1>Would you like to adopt {name}</h1>
        <button onClick={this.toggleModal}>Yes</button>
        <button onClick={this.toggleModal}>YES!</button>
      </Modal>
    );
  }
  render() {
    if (this.state.loading) return <p>loading</p>;
    if (!this.state.pet) return <p>error fetching pet infos</p>;
    const { pet } = this.state;
    const { name, media, description, contact, animal, breeds } = pet;
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
        <button onClick={this.toggleModal}>Adopt {name}</button>
        {this.renderModal()}
      </div>
    );
  }
}

export default Details;
