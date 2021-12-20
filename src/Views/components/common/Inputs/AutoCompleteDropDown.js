import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const AutoCompleteDropDown = ({
  optionList,
  label,
  handleChange,
  value,
  bgColor,
}) => {
  const useStyles = makeStyles((theme) => ({
    inputRoot: {
      color: bgColor,
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: bgColor,
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: bgColor,
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: bgColor,
      },
    },
    floatingLabel: {
      color: bgColor,
      "&.focused": {
        color: bgColor,
      },
    },
    clearIndicator: {
      color: bgColor,
    },
    popupIndicator: {
      color: bgColor,
    },
  }));

  const classes = useStyles();
  return (
    <React.Fragment>
      <Autocomplete
        options={optionList}
        classes={classes}
        value={value}
        onChange={(event, newInputValue) => {
          handleChange && handleChange(event, newInputValue);
        }}
        id="controllable-states-demo"
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{
              classes: { root: classes.floatingLabel, focused: "focused" },
            }}
            label={label}
            variant="outlined"
          />
        )}
      />
    </React.Fragment>
  );
};

AutoCompleteDropDown.propTypes = {
  questionProp: PropTypes.array,
};

export default AutoCompleteDropDown;
