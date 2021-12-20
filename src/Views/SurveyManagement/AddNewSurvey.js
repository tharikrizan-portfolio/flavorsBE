import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Prompt } from 'react-router-dom';
import { clearAllSurveyData } from '../../actions/survey.actions';
import { HorizontalStepper } from '../components/Stepper/Stepper';
import store from '../../store';
import QuestionConfiguration from './ConfigurationArea/QuestionConfiguration';
import AddSurvey from './QuestionArea/AddSurvey';

const AddNewSurvey = ({ isQuiz = false, isAddSurvey = true, defaultStep }) => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(defaultStep ? defaultStep : 0);
  const [isOpened, setIsOpened] = useState(false);
  const prevState = useRef();
  const currentState = useRef();
  const saveFunctionExecuted = useRef(false);

  const onReduxStoreChange = () => {
    const addSurvey = store.getState().addSurveyObj;
    const updateSurvey = store.getState().updateSurveyObj;

    // TODO: update the prompt logic to handle unsaved changes after saving the current state
    if (addSurvey.isSaveInProgress) {
      saveFunctionExecuted.current = addSurvey.isSaveInProgress;
      prevState.current = { addSurvey, updateSurvey };
      return setIsOpened(false);
    } else if (saveFunctionExecuted.current) {
      return setIsOpened(false);
    }

    //--- delete the 'updateSheet' field from comparison object as it updates each time component loads.
    delete updateSurvey.survey['updateSheet'];
    currentState.current = { addSurvey, updateSurvey };
    if (JSON.stringify(currentState.current) !== JSON.stringify(prevState.current)) {
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    //--- shedule a macrotask to make sure that we bind the 'onReduxStoreChange' event handler after all microtask are resolved
    //--- this is done to make sure that 'prevState' will have the latest redux store state when the first comparison happens
    //--- Note: 'setTimeout' wrap is just a precaution and code will run even without it.
    const timeOutHandle = setTimeout(() => {
      const updateSurvey = store.getState().updateSurveyObj;
      //--- delete the 'updateSheet' field from comparison object as it updates each time component loads.
      delete updateSurvey.survey['updateSheet'];
      prevState.current = { addSurvey: store.getState().addSurveyObj, updateSurvey };
      store.subscribe(onReduxStoreChange);
    }, 0);

    return () => {
      clearTimeout(timeOutHandle);
      prevState.current = currentState.current;
      dispatch(clearAllSurveyData());
    };
  }, []);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddSurvey isQuiz={isQuiz} isAddSurvey={isAddSurvey} />;
      case 1:
        return (
          <QuestionConfiguration
            isAddSurvey={isAddSurvey}
            isQuiz={isQuiz}
            setActiveStep={setActiveStep}
          />
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <div>
      <Prompt
        when={isOpened}
        message={JSON.stringify({
          header: 'Confirm',
          content:
            'If you leave this page, your changes will be lost, do you still want to proceed?',
        })}
      />
      <HorizontalStepper
        isQuiz={isQuiz}
        isAddSurvey={isAddSurvey}
        steps={['Questions', 'Configurations']}
        getStepContent={getStepContent}
        defaultStep={defaultStep}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    </div>
  );
};

AddNewSurvey.propTypes = {
  isQuiz: PropTypes.bool,
  isAddSurvey: PropTypes.bool,
  defaultStep: PropTypes.number,
};

export default AddNewSurvey;
