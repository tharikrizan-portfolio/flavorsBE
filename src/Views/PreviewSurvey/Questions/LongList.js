import React, { useEffect, useState } from 'react';
import { handleOnChange, handleSubmitErrors, setStep } from '../../../actions/preview.actions';
import { connect } from 'react-redux';
import AutoCompleteDropDown from '../../components/common/Inputs/AutoCompleteDropDown';
import MaterialCircularProgress from '../../components/common/Loader/MaterialCircularProgress';
import useQuestionPreviewLogic from '../../../hooks/useQuestionPreviewLogic';

function LongList({
  handleOnChange,
  showNextQuestion,
  handleSubmitErrors,
  setStep,
  stepCount,
  questionPropObj,
  surveyObj,
  responseList
}) {
  const [options, setOptions] = useState([]);
  const [value, setValue] = React.useState('');
  const [isAnswered, setIsAnswered] = React.useState(false);
  const { addQuestionAnswers } = useQuestionPreviewLogic();
  const handleChange = (e, newValue) => {
    try {
      e.preventDefault();
      if (newValue) {
        let questionAnswerId = options.filter((x) => x.name == newValue)?.[0].questionAnswerId;
        setValue(newValue);

        handleOnChange(questionPropObj.questionId, [questionAnswerId], [newValue], responseList);

        addQuestionAnswers(questionPropObj.questionId, [{
          questionId: questionPropObj.questionId,
          questionAnswerId: questionAnswerId,
          value: newValue,
        }]);
      } else {
        setValue('');
      }
      setIsAnswered(true);
      setTimeout(() => {
        showNextQuestion(e);
      }, 500);
    } catch (error) {
      handleSubmitErrors();
      setStep(stepCount + 2);
    }
  };

  useEffect(() => {
    setOptions(questionPropObj.questionAnswers);
  }, []);

  if (options.length > 0) {
    return (
      <React.Fragment>
        <AutoCompleteDropDown
          value={value}
          handleChange={handleChange}
          optionList={questionPropObj.questionAnswers.map((opt) => opt.name)}
          label="Please choose an option"
          bgColor={surveyObj.colorSchema.subtitle_font}
        />
        {isAnswered && (
          <div
            style={{
              cssFloat: 'right',
              padding: '20px',
            }}
          >
            <span />
            <MaterialCircularProgress size={40} />
          </div>
        )}
      </React.Fragment>
    );
  } else {
    return <div>Loading...</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    surveyObj: state.previewSurvey.surveyObj,
    responseList: state.previewSurvey.responseList,
    stepCount: state.previewSurvey.stepCount,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmitErrors: () => dispatch(handleSubmitErrors()),
    setStep: (step) => dispatch(setStep(step)),
    handleOnChange: (questionId, answer, value, responseList) =>
      dispatch(handleOnChange(questionId, answer, value, responseList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LongList);
