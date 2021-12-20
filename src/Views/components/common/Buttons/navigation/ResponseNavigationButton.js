import React, { memo } from "react";
import PropTypes from "prop-types";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const ResponseNavigationButton = ({ buttonLabel, onClick, type, iColor }) => {
  return type === "left" ? (
    <ArrowBackIosIcon
      onClick={onClick}
      style={{
        marginRight: "2px",
        marginLeft: "22px",
        color: `${iColor}`,
        fontSize: "28",
        cursor: "pointer",
      }}
    />
  ) : (
    <ArrowForwardIosIcon
      onClick={onClick}
      style={{
        color: `${iColor}`,
        marginLeft: "2px",
        fontSize: "28",
        cursor: "pointer",
      }}
    />
  );
};

ResponseNavigationButton.propTypes = {
  buttonLabel: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default ResponseNavigationButton;
/*
    USAGE

        <ResponseNavigationButton
          buttonLabel="Back"
          type="left"
          onClick={(e) => alert(e.target.value)}
        />
        <ResponseNavigationButton
          buttonLabel="Next"
          type="right"
          onClick={(e) => alert(e.target.value)}
        />
        <br />

        <ResponseNavigationButton
          buttonLabel="Submit"
          type="center"
          onClick={(e) => alert(e.target.value)}
        />
        <br />

        <ResponseNavigationButton
          buttonLabel="Start Survey"
          type="center"
          onClick={(e) => alert(e.target.value)}
        />
*/
