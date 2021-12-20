import React, { useState, useEffect } from 'react';
import { FormGroup, Label } from 'reactstrap';
import { Checkbox } from '@material-ui/core';
import { connect } from 'react-redux';
import { handleOnChange, handleSubmitErrors, setStep } from '../../../actions/preview.actions';
import useQuestionPreviewLogic from '../../../hooks/useQuestionPreviewLogic';

const CheckboxScreen = (props) => {
  const [state, setState] = useState({ questionObj: {}, optionList: [] });
  const { addQuestionAnswers } = useQuestionPreviewLogic();

  useEffect(() => {
    props.setCanShowEnter(
      props.questionPropObj.optionList.filter((option) => option.isChecked).length > 0,
    );
  }, []);

  useEffect(() => {
    if (!props.isError) {
      setState({
        questionObj: props.questionPropObj,
        optionList: props.questionPropObj.optionList,
      });
    } else {
      props.setStep(props.stepCount + 2);
    }
  }, [props.isError]);

  const handleChange = async (e) => {
    try {
      e.preventDefault();
      let index = 0;
      let optionList_ = state.optionList;
      for (let option of state.optionList) {
        if (option.questionAnswerId === e.target.value) {
          optionList_[index].isChecked = e.target.checked;
          props.handleOnChange(
            state.questionObj.questionId,
            optionList_,
            optionList_,
            props.responseList,
          );
          break;
        }
        index++;
      }
      const selectedAnswers = optionList_
        .filter((x) => x.isChecked)
        .map((x) => {
          return {
            questionId: x.questionId,
            questionAnswerId: x.questionAnswerId,
            value: x.value,
          };
        });
      addQuestionAnswers(state.questionObj.questionId, selectedAnswers);
      props.setCanShowEnter(optionList_.filter((option) => option.isChecked).length > 0);
      setState({ ...state, optionList: optionList_ });
    } catch (error) {
      props.handleSubmitErrors();
      props.setStep(props.stepCount + 2);
    }
  };

  const { optionList } = state;

  return (
    <React.Fragment>
      <FormGroup
        onChange={handleChange}
        onKeyPress={props.onPressEnter}
        required={props.questionPropObj.required}
      >
        {optionList.map((item, key) => (
          <div>
            <Label key={item.questionAnswerId}>
              {key + 1}.<span />{' '}
              <Checkbox
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
                    backgroundColor: 'red',
                    zIndex: -1,
                  },
                }}
                name={item.name}
                checked={item.isChecked}
                key={item.questionAnswerId}
                value={item.questionAnswerId}
              />
              <span />
              {item.name}
            </Label>
            <br />
          </div>
        ))}
      </FormGroup>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    step: state.previewSurvey.step,    
    surveyObj: state.previewSurvey.surveyObj,
    responseList: state.previewSurvey.responseList, 
    stepCount: state.previewSurvey.stepCount,   
    isError: state.previewSurvey.isError,
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxScreen);
