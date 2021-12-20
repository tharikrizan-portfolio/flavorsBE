import React from "react";
import PropTypes from "prop-types";
import './OkButtonStyles.css';

const DEFAULT_BUTTON_COLOR = "dodgerblue";
const DEFAULT_BUTTON_FONT_COLOR = "white";

const PressEnterBar = ({ fontColor, onPressEnter,buttonColor,buttonFontColor }) => {
  return (
    <div className="enter-component-container">
      <button
        className="ok-btn"
        onClick={onPressEnter}
        style={{
          backgroundColor: buttonColor || DEFAULT_BUTTON_COLOR,
          color: buttonFontColor || DEFAULT_BUTTON_FONT_COLOR,
        }}
      >
        OK
      </button>
      <code style={{ color: fontColor }}>Press <span className="enter-emphasized-text">Enter ↵</span></code>
    </div>
  );
};

PressEnterBar.propTypes = {
  fontColor: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonFontColor: PropTypes.string,
  onPressEnter: PropTypes.func,
};

export default PressEnterBar;
