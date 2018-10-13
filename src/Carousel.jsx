import React from "react";
import { findDisplayImages } from "./utils";
import PropTypes from "prop-types";
import Thumbnail from "./Thumbnail";

class Carousel extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string,
    media: PropTypes.shape({
      photos: PropTypes.shape({
        photo: PropTypes.arrayOf(
          PropTypes.shape({
            "@id": PropTypes.string,
            "@size": PropTypes.string,
            value: PropTypes.string
          })
        )
      })
    })
  };
  state = {
    photos: [],
    activeIndex: 0
  };
  static getDerivedStateFromProps({ media }) {
    return { photos: findDisplayImages(media) };
  }
  handleThumbnailClick = event => {
    const { value = 0 } = event.target.attributes.getNamedItem("data-index");
    this.setState({ activeIndex: value });
  };
  renderThumbnail = (photo, index) => {
    return (
      <Thumbnail
        key={photo["@id"]}
        src={photo.value}
        alt={this.props.name}
        onSelect={this.handleThumbnailClick}
        value={index}
      />
    );
  };
  render() {
    const { photos, activeIndex } = this.state;
    if (!photos[activeIndex]) return <span>loading</span>;
    return (
      <div>
        <img src={photos[activeIndex].value} alt={name} height="150px" />
        <div>{photos.map(this.renderThumbnail)}</div>
      </div>
    );
  }
}

export default Carousel;
