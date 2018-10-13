import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { findDisplayImages, combineBreed } from "./utils";

TableRow.propTypes = {
  pet: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    animal: PropTypes.string,
    contact: PropTypes.shape({
      city: PropTypes.string,
      state: PropTypes.string
    }),
    breeds: PropTypes.shape({
      breed: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
      ])
    })
  })
};

function TableRow({ pet }) {
  return (
    <tr>
      <td>
        <Link to={`details/${pet.id}`}>
          <img
            height="80"
            src={findDisplayImages(pet.media)[0].value}
            alt={pet.name}
          />
          <span>{pet.name}</span>
        </Link>
      </td>
      <td />
      <td>{pet.animal}</td>
      <td>{combineBreed(pet.breeds)}</td>
      <td>
        {pet.contact.city} {pet.contact.state}
      </td>
    </tr>
  );
}

export default TableRow;
