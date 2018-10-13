import React from "react";
import PropTypes from "prop-types";

Thumbnail.propTypes = {
  onSelect: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string,
  value: PropTypes.number
};
function Thumbnail({ onSelect, src, value }) {
  return (
    <button
      onClick={onSelect}
      data-index={value}
      style={{
        height: "50px",
        width: "50px",
        background: `transparent url(${src}) no-repeat center`,
        backgroundSize: "cover"
      }}
    />
  );
}

export default Thumbnail;
