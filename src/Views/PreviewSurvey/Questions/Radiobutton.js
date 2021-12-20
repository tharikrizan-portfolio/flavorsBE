import React, { useEffect, useState } from 'react';
import { Label } from 'reactstrap';

import { RadioGroup, Radio } from '@material-ui/core';

import { connect } from 'react-redux';
import { handleOnChange, handleSubmitErrors, setStep } from '../../../actions/preview.actions';
import MaterialCircularProgress from '../../components/common/Loader/MaterialCircularProgress';
import useQuestionPreviewLogic from '../../../hooks/useQuestionPreviewLogic';

const RadioButtonScreen = (props) => {
  const [state, setState] = useState({
    questionObj: {},
    checkedAnswer: '',
    optionList: [],
    isAnswered: false,
  });
  const { addQuestionAnswers } = useQuestionPreviewLogic();

  useEffect(() => {
    setState({
      ...state,
      questionObj: props.questionPropObj,
      optionList: props.responseList,
      checkedAnswer: getCheckedAnswer(props.questionPropObj.questionId),
    });
  }, [props.questionPropObj, props.responseList]);

  useEffect(() => {
    if (state.isAnswered) {
      setTimeout(() => {
        setState({
          ...state,
          isAnswered: false,
        });
        props.continue();
      }, 500);
    }
  }, [state.isAnswered]);

  const handleChange = (e) => {
    try {
      e.preventDefault();
      setState({
        ...state,
        checkedAnswer: e.target.value,
        isAnswered: true,
      });
      props.handleOnChange(
        state.questionObj.questionId,
        [e.target.value],
        [e.target.name],
        props.responseList,
      );

      addQuestionAnswers(state.questionObj.questionId, [
        {
          questionId: state.questionObj.questionId,
          questionAnswerId: e.target.value,
          value: e.target.name,
        },
      ]);
    } catch (error) {
      props.handleSubmitErrors();
      props.setStep(props.stepCount + 2);
    }
  };

  const getCheckedAnswer = (questionId) => {
    for (let response of props.responseList) {
      if (response.questionId === questionId) {
        let answer = response.answer[0];
        if (response !== null) {
          return answer;
        }
      }
    }
    return null;
  };

  const { questionAnswers } = props.questionPropObj;
  const { checkedAnswer } = state;
  return (
    <React.Fragment>
      <RadioGroup onChange={handleChange}>
        {questionAnswers.map((item, key) =>
          item.questionAnswerId === checkedAnswer ? (
            <Label key={item.questionAnswerId}>
              {key + 1}.<span />
              <Radio
                style={{
                  color: props.surveyObj.colorSchema.subtitle_font,
                  '& .MuiIconButton-label': {
                    position: 'relative',
                    zIndex: 0,
                  },

                  '& .MuiIconButton-label:after': {
                    content: '""',
                    left: 4,
                    top: 4,
                    height: 15,
                    width: 15,
                    position: 'absolute',
                    backgroundColor: props.surveyObj.colorSchema.subtitle_font,
                    color: props.surveyObj.colorSchema.subtitle_font,
                    zIndex: -1,
                  },
                }}
                name={item.name}
                required={props.questionPropObj.required}
                checked={true}
                key={item.questionAnswerId}
                value={item.questionAnswerId}
              />
              <span />
              {item.name}
            </Label>
          ) : (
            <Label key={item.questionAnswerId}>
              {key + 1}.<span />
              <Radio
                style={{
                  color: props.surveyObj.colorSchema.subtitle_font,
                  '& .MuiIconButton-label': {
                    position: 'relative',
                    zIndex: 0,
                  },

                  '& .MuiIconButton-label:after': {
                    content: '""',
                    left: 4,
                    top: 4,
                    height: 15,
                    width: 15,
                    position: 'absolute',
                    backgroundColor: props.surveyObj.colorSchema.subtitle_font,
                    color: props.surveyObj.colorSchema.subtitle_font,
                    zIndex: -1,
                  },
                }}
                name={item.name}
                required={props.questionPropObj.required}
                checked={false}
                key={item.questionAnswerId}
                value={item.questionAnswerId}
              />
              <span />
              {item.name}
            </Label>
          ),
        )}
      </RadioGroup>
      {state.isAnswered && (
        <div
          style={{
            float: 'right',
            padding: '20px',
          }}
        >
          <span />
          <MaterialCircularProgress size={40} />
        </div>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    step: state.previewSurvey.step,
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

export default connect(mapStateToProps, mapDispatchToProps)(RadioButtonScreen);
