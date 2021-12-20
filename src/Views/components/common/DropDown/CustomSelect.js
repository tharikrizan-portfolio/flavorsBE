import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Select from 'react-dropdown-select';

const useStyles = makeStyles((theme) => ({
  customSelect: {
    padding: '7px',
    borderBottom: '0.5px solid #d9d9d9',
    '&:hover': {
      backgroundColor: theme.palette.hoverColor,
    },
  },
}));

const CustomSelect = ({ options, onChange, value, placeholder }) => {
  const selectedValue = value ? options.find((x) => x.value == value) : options[0];
  const classes = useStyles();
  return (
    <div>
      <Select
        className="custom-select form-control"
        options={options}
        values={[selectedValue]}
        placeholder={placeholder || 'Select Option...'}
        onChange={(values) => onChange(values[0])}
        itemRenderer={({ item, methods }) => (
          <div onClick={() => methods.addItem(item)} className={classes.customSelect}>
            {item.Icon && <item.Icon fontSize="small" />} {item.label}{' '}
          </div>
        )}
        searchable={false}
        backspaceDelete={false}
      />
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

export default CustomSelect;
