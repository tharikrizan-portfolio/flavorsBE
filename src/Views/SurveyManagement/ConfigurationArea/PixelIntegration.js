import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import HelpIcon from '@material-ui/icons/Help';
import { IconButton } from '@material-ui/core';
import { setPixelId, updatePixelId } from '../../../actions/survey.configuration.actions';
import SimpleDialog from '../../components/common/AlertDialog/SimpleDialog';
import ValidationErrorMessage from '../../components/common/ErrorMessage/ValidationErrorMessage';
import { changeValidations, updateValidations } from '../../../actions/survey.actions';
import { validatePixelId } from '../../../util/validations';

const PixelIntegration = ({ isAddSurvey }) => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const [isPixelModelOpen, setIsPixelModelOpen] = useState(false);

  const pixelId =
    useSelector((state) =>
      isAddSurvey
        ? state.addSurveyObj?.survey?.metadata?.pixelId
        : state.updateSurveyObj?.survey?.metadata?.pixelId,
    ) || '';

  const pixelError = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj?.errorState?.pixelId
      : state.updateSurveyObj?.errorState?.pixelId,
  );

  const handlePixelId = (e) => {
    isAddSurvey ? dispatch(setPixelId(e.target.value)) : dispatch(updatePixelId(e.target.value));
    isAddSurvey
      ? dispatch(changeValidations({ type: 'pixelId', data: validatePixelId(e.target.value) }))
      : dispatch(updateValidations({ type: 'pixelId', data: validatePixelId(e.target.value) }));
  };

  //--- validation logic
  const isInvalid = () => {
    //--- a user can create a survey without setting a pixel integeration
    if (pixelId.length === 0) return false;

    //--- however if a user is having pixel integration, then following conditions need to be met.

    //--- pixel id can only contain integers
    if (/\D/.test(pixelId.trim())) {
      setErrorMessage('Pixel ID can only contain whole numbers(integers)');
      return true;
    }
    //--- pixel Id has to be exactly 15 digits long
    else if (pixelId.length !== 15) {
      setErrorMessage('Pixel ID has to be exactly 15 digits.');
      return true;
    }
    setErrorMessage('');
    return false;
  };

  //--- check validation each time pixelId updates
  useEffect(() => {
    isInvalid();
  }, [pixelId]);

  const pixelModel = (
    <SimpleDialog
      open={isPixelModelOpen}
      handleClose={() => setIsPixelModelOpen(false)}
      title="What is FaceBook Pixel Integration?"
    >
      <p></p>
    </SimpleDialog>
  );

  return (
    <div className="rounded-card">
      <div className="flex">
        <h4 className="pixel-integration-heading">FaceBook Pixel Integration</h4>
        <IconButton onClick={() => setIsPixelModelOpen(true)}>
          <HelpIcon fontSize="small" />
        </IconButton>
      </div>

      <Row className="pixel-top-margin">
        <Form className="pixel-integration-form">
          <Form.Group hasValidation controlId="formBasicTitle">
            <Form.Label>Pixel Integration ID :</Form.Label>
            <Form.Control
              autoComplete="off"
              type="text"
              placeholder="Enter ID"
              value={pixelId}
              onChange={handlePixelId}
            />
            <Form.Control.Feedback type="invalid">{errorMessage}</Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Row>
      <ValidationErrorMessage error={pixelError} />
      {pixelModel}
    </div>
  );
};

PixelIntegration.propTypes = {
  isAddSurvey: PropTypes.bool,
};

export default PixelIntegration;
