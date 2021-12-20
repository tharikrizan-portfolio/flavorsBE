import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const BrootStrapDropdown = ({
  label,
  handleSelect,
  options,
  value,
  disabled = false,
  id,
}) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        disabled={disabled}
        as="select"
        onChange={(e) => handleSelect(e, id)}
        value={value}
      >
        {options?.map((opt, index) => (
          <option value={opt.value} key={index}>
            {opt.label}
          </option>
        )) || []}
      </Form.Control>
    </Form.Group>
  );
};

BrootStrapDropdown.propTypes = {
  label: PropTypes.string,
  handleSelect: PropTypes.func,
  options: PropTypes.array,
  disabled: PropTypes.bool,
};

export default BrootStrapDropdown;
