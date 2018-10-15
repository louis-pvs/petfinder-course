import React from "react";
import PropTypes from "prop-types";

SelectInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.any,
  onSelect: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool
};

export default function SelectInput({
  label,
  id,
  value,
  onSelect,
  options,
  disabled
}) {
  return (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        name={id}
        value={value}
        onChange={onSelect}
        onBlur={onSelect}
        disabled={disabled}
      >
        <option value="" default>
          {disabled ? "-" : `All ${label}`}
        </option>
        {options.map(options => (
          <option value={options} key={options}>
            {options}
          </option>
        ))}
      </select>
      <input id={id} type="hidden" value={value} />
    </label>
  );
}
