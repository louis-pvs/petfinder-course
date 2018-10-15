import React from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal");

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]).isRequired
  };
  constructor(props) {
    super(props);
    this.container = document.createElement("div");
  }
  componentDidMount = () => {
    modalRoot.appendChild(this.container);
  };
  componentWillUnmount() {
    modalRoot.removeChild(this.container);
  }
  render() {
    return createPortal(this.props.children, this.container);
  }
}

export default Modal;
