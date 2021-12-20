import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button, Tab, Nav } from "react-bootstrap";
import { SketchPicker } from "react-color";

const ColorPicker = ({ color, onChangeComplete }) => {
  return (
    <React.Fragment>
      <SketchPicker
        color={color}
        onChangeComplete={(e) => onChangeComplete(e.hex)}
      />
    </React.Fragment>
  );
};

ColorPicker.propTypes = {
  onChangeComplete: PropTypes.func,
  color: PropTypes.string,
};

export default ColorPicker;
