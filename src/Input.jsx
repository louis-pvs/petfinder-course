import React from "react";
import PropTypes from "prop-types";

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any
};
export default function Input({ id, value, label, onChange }) {
  return (
    <label htmlFor={id}>
      {label}
      <input
        id={id}
        value={value}
        name={id}
        placeholder={`filter by ${id}`}
        onChange={onChange}
      />
    </label>
  );
}
