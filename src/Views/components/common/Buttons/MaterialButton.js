import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { MDBIcon } from "mdbreact";
import { makeStyles } from "@material-ui/core/styles";

const MaterialButton = ({
  color,
  className = "global-class-name float-right custom-add-btn custom-icon-padding",
  handleClick,
  label,
  icon,
  type,
  disabled = false,
  variant = "contained",
}) => {

  return (
    <Button
      variant={variant}
      color={color}
      className={className}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      {label}
      {icon && <MDBIcon icon={icon} className="custom-icon-padding" />}
    </Button>
  );
};

MaterialButton.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  handleClick: PropTypes.func,
  label: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
};

export default MaterialButton;
