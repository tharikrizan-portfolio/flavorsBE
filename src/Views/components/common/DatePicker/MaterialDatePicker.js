import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardDatePicker } from '@material-ui/pickers';
import EventIcon from '@material-ui/icons/Event';

const MaterialDatePicker = ({
  disableToolbar = false,
  variant = 'inline',
  ampm,
  label,
  value,
  handleChange,
  format,
  disabled,
  placeholder,
  disablePast,
  keyboardIcon = <EventIcon />,
  minDate,
  minDateMessage,
  ...props
}) => {
  return (
    <KeyboardDatePicker
      {...props}
      variant={variant}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      format={format}
      disableToolbar={disableToolbar}
      disabled={disabled}
      disablePast={disablePast}
      label={label}
      keyboardIcon={keyboardIcon}
      ampm={ampm}
      minDate={minDate}
      minDateMessage={minDateMessage}
    />
  );
};

MaterialDatePicker.propTypes = {
  variant: PropTypes.string,
  ampm: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  format: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  keyboardIcon: PropTypes.any,
  disablePast: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  minDateMessage: PropTypes.string,
};

export default MaterialDatePicker;
