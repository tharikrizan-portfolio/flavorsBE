import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const FormTextInput = ({
  type = 'text',
  id,
  handleChange,
  value,
  placeholder,
  label,
  classes,
  disabled = false,
}) => {
  return (
    <>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        className={classes}
        type={type}
        id={id}
        onChange={(e) => handleChange(e, id)}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
    </>
  );
};

FormTextInput.propTypes = {
  type: PropTypes.string,
  classes: PropTypes.string,
  id: PropTypes.string,
  handleChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

export default FormTextInput;
