import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MaterialButton from '../common/Buttons/MaterialButton';
import '../../../assets/css/custom.css';
import AlertDialog from '../common/AlertDialog/AlertDialog';
import { Tooltip } from '@material-ui/core';
import { useSave } from '../../../hooks/useSave';
import { useDispatch, useSelector } from 'react-redux';

const SaveDiscardButtonComponent = ({ isQuiz, isAddSurvey, setActiveStep, discardButtonName }) => {
  const dispatch = useDispatch();
  const isPublished = useSelector((state) =>
    isAddSurvey ? state.addSurveyObj.survey.isPublished : state.updateSurveyObj.survey.isPublished,
  );

  const { errorState, OnSaveSurvey, handleDiscard, isSaveInProgress } = useSave({
    isAddSurvey,
    isQuiz,
  });

  const [openDiscard, setOpenDiscard] = useState(false);
  const [openPublish, setOpenPublish] = useState(false);

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(
    errorState?.surveyDate?.isError || errorState?.pixelId?.isError,
  );

  const onDiscard = () => {
    handleDiscard();
    setOpenDiscard(false);
    setActiveStep(0);
  };

  useEffect(() => {
    setIsSaveButtonDisabled(errorState?.surveyDate?.isError || errorState?.pixelId?.isError);
  }, [errorState]);

  return (
    <div className=" float-right save-button-styling ml-2">
      <MaterialButton
        color="primary"
        className="global-class-name float-right "
        label={discardButtonName || 'Discard'}
        variant="outlined"
        handleClick={() => setOpenDiscard(true)}
        disabled={isSaveInProgress}
      />

      <div className="p-1"></div>
      <Tooltip title={isSaveButtonDisabled ? 'Please Correct Errors Inorder To Proceed' : ''}>
        <div>
          <MaterialButton
            color="primary"
            className="global-class-name float-right"
            label={`${isAddSurvey ? 'Save' : 'Update'}`}
            type="submit"
            handleClick={() => (isPublished ? OnSaveSurvey() : setOpenPublish(true))}
            disabled={isSaveInProgress || isSaveButtonDisabled}
          />
        </div>
      </Tooltip>
      <AlertDialog
        open={openDiscard}
        handleClose={() => setOpenDiscard(false)}
        handleOk={onDiscard}
        title="Discard Confirmation"
        description="Are you sure you want to discard changes ? "
      />
      <AlertDialog
        open={openPublish}
        handleClose={(e) => {
          OnSaveSurvey(e);
          setOpenPublish(false);
        }}
        handleOk={(e) => {
          OnSaveSurvey(e, { isPublished: true });
          setOpenPublish(false);
        }}
        title="Publish Survey"
        description="Do you want to publish the survey?"
        okText="YES"
        cancelText="NO"
      />
    </div>
  );
};

SaveDiscardButtonComponent.propTypes = {
  isAddSurvey: PropTypes.bool,
  isQuiz: PropTypes.bool,
  setActiveStep: PropTypes.number,
  discardButtonName: PropTypes.string,
};

export default SaveDiscardButtonComponent;
