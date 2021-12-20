import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ShadowScrollbar from '../common/ShadowScrollBar/ShadowScrollBar';
import { Step, Stepper, StepButton, Typography, Tooltip, IconButton } from '@material-ui/core';
import MaterialButton from '../common/Buttons/MaterialButton';
import SaveDiscardButtonComponent from '../ShareSurvey/SaveDiscardButtonComponent';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100 %',
    position: 'relative',
    height: '90vh',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepper: {
    margin: ' -30px',
    backgroundColor: '#fff',
    marginBottom: '15px',
    borderBottom: '1px solid #ced4da',
    '& div': {
      width: '50%',
      margin: 'auto',
    },
  },
  step: {
    cursor: 'pointer',
  },
}));

export const HorizontalStepper = ({
  steps,
  getStepContent,
  activeStep,
  setActiveStep,
  isQuiz,
  isAddSurvey,
}) => {
  const classes = useStyles();

  const questions = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.questions.questionList
      : state.updateSurveyObj.surveyQuestions.data,
  );

  const errorState = useSelector((state) =>
    isAddSurvey ? state.addSurveyObj.errorState : state.updateSurveyObj.errorState,
  );
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(
    errorState?.title?.isError ||
      errorState?.description?.isError ||
      errorState?.questionTitle?.isError ||
      errorState?.option?.isError ||
      errorState?.ratingValue?.isError,
  );
  const [isBackButtonDisabled, setIsBackButtonDisabled] = useState(
    errorState?.surveyDate?.isError || errorState?.pixelId?.isError,
  );

  useEffect(() => {
    setIsNextButtonDisabled(
      errorState?.title?.isError ||
        errorState?.description?.isError ||
        errorState?.questionTitle?.isError ||
        errorState?.option?.isError ||
        errorState?.ratingValue?.isError,
    );
  }, [errorState]);

  return (
    <div className={classes.root}>
      <div className={`${classes.stepper} bottom-shadow`}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, i) => (
            <Step className={classes.step} key={label} onClick={() => setActiveStep(i)}>
              <StepButton>{label}</StepButton>
            </Step>
          ))}
        </Stepper>
      </div>
      <ShadowScrollbar
        style={{
          height: 'calc(95vh - 110px)',
        }}
        shadowColor="grey"
        scrollColor="grey"
      >
        {getStepContent(activeStep)}
      </ShadowScrollbar>
      <div className="title-with-button stepper-actions">
        <Typography variant={'h6'} gutterBottom>
          Questions : {questions.length}
        </Typography>
        <div>
          {activeStep != 0 && (
            <MaterialButton
              color="secondary"
              className="global-class-name"
              label="Back"
              handleClick={() => setActiveStep(activeStep - 1)}
            />
          )}
          {activeStep != steps.length - 1 && (
            <Tooltip title={isNextButtonDisabled ? 'Please Correct Errors Inorder To Proceed' : ''}>
              <div>
                <MaterialButton
                  color="secondary"
                  className="global-class-name"
                  label="Next"
                  disabled={isNextButtonDisabled}
                  handleClick={() => setActiveStep(activeStep + 1)}
                />
              </div>
            </Tooltip>
          )}
          {activeStep == steps.length - 1 && (
            <SaveDiscardButtonComponent {...{ isQuiz, isAddSurvey, setActiveStep }} />
          )}
        </div>
      </div>
    </div>
  );
};
