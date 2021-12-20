import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const CreateFormCard = ({
  imgSheets,
  label,
  buttonLabel,
  buttonUrl,
  buttonStyle,
  enableSaveTemplate,
}) => {
  return (
    <div className="rounded-card create-from-card">
      <div>
        <img src={imgSheets} className="form-type-survey" />
      </div>
      <div className="form-survey-text-margin">
        <b className="form-survey-heading">{label}</b>
      </div>
      <Button
        classes={{
          root: buttonStyle,
        }}
        href={buttonUrl}
        onClick={enableSaveTemplate}
      >
        {buttonLabel}
      </Button>
    </div>
  );
};

CreateFormCard.propTypes = {
  imgSheets: PropTypes.string,
  label: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonUrl: PropTypes.string,
};

export default CreateFormCard;
