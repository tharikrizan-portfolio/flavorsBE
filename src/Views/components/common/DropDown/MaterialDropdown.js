import React from "react";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const MaterialDropdown = ({
  handleChange,
  lable,
  value,
  options,
  disabled,
}) => {
  const classes = useStyles();
  return (
    <FormControl
      variant="outlined"
      className={classes.formControl}
      disabled={disabled}
    >
      <InputLabel>{lable}</InputLabel>
      <Select
        native
        value={value}
        onChange={(event) => handleChange(event.target.value)}
        label={lable}
        inputProps={{
          name: "value",
          id: "outlined-age-native-simple",
        }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

MaterialDropdown.propTypes = {
  handleChange: PropTypes.func,
  lable: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
};

export default MaterialDropdown;
