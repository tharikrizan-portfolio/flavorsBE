import React from 'react';
import { IconButton } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import PropTypes from 'prop-types';

const CloseButton = ({ handleClick }) => {
  return (
    <div className="preview-theme-image-remove-padding">
      <IconButton className="preview-theme-image-remove-icon" onClick={handleClick}>
        <HighlightOffIcon fontSize="meduim" />
      </IconButton>
    </div>
  );
};

CloseButton.propTypes = { handleClick: PropTypes.func };

export default CloseButton;
