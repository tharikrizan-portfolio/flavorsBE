import React, { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox, TextField, Button } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { changeValidations, updateValidations } from '../../../actions/survey.actions';
import { validateQuestionOptionTitle } from '../../../util/validations';
import ValidationErrorMessage from '../common/ErrorMessage/ValidationErrorMessage';
import { v4 as uuidv4 } from 'uuid';

const QUESTION_LIMIT = 8;
const CheckBoxQuestion = ({ questionProp, updateRedux, isSurveyPublished, isAddSurvey }) => {
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (questionProp.questionAnswers.length === 0) addNewOption();
    if (
      questionProp.questionAnswers[questionProp.questionAnswers.length - 1].value &&
      questionProp.questionAnswers.length < QUESTION_LIMIT
    ) {
      addNewOption();
    }
  }, [questionProp.questionAnswers]);

  const optionError = useSelector((state) =>
    isAddSurvey ? state.addSurveyObj?.errorState?.option : state.updateSurveyObj.errorState?.option,
  );

  const handleOptionChange = (index, text) => {
    let questionAnswers_ = questionProp.questionAnswers;
    questionAnswers_[index].name = text;
    questionAnswers_[index].value = text;

    isAddSurvey
      ? dispatch(changeValidations({ type: 'option', data: validateQuestionOptionTitle(text) }))
      : dispatch(updateValidations({ type: 'option', data: validateQuestionOptionTitle(text) }));

    const updatedQuestionData = {
      ...questionProp,
      questionAnswers: questionAnswers_,
    };
    updateRedux(updatedQuestionData);

    //Add new option
    const invalidAnswerLst = questionProp.questionAnswers?.filter((answer) => !answer.value);

    if (text && !invalidAnswerLst.length && questionProp.questionAnswers.length < QUESTION_LIMIT) {
      return addNewOption();
    }
  };

  const addNewOption = () => {
    let questionAnswers_ = questionProp.questionAnswers;
    questionAnswers_.push({
      questionAnswerId: uuidv4(),
      name: '',
      label: '',
    });

    const updatedQuestionData = {
      ...questionProp,
      questionAnswers: [...questionAnswers_],
    };

    updateRedux(updatedQuestionData);
  };

  const removeOption = (index) => {
    let questionAnswers_ = questionProp.questionAnswers;
    questionAnswers_.splice(index, 1);

    const updatedQuestionData = {
      ...questionProp,
      questionAnswers: questionAnswers_,
    };
    updateRedux(updatedQuestionData);

    //Add new option
    const invalidAnswerLst = questionProp.questionAnswers?.filter((answer) => !answer.value);
    if (invalidAnswerLst.length === 0) addNewOption();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      inputRef.current.focus();
    }
  };

  return (
    <div className="question-answer-section">
      {questionProp.questionAnswers.map((option, index) => {
        return (
          <div style={{ display: 'flex' }}>
            <Checkbox color="primary" inputProps={{ 'aria-label': 'primary checkbox' }} />
            <TextField
              style={{ width: '70%' }}
              placeholder="Add your option"
              required
              value={option.name}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              inputRef={index + 1 === questionProp.questionAnswers.length ? inputRef : null}
              onKeyPress={handleKeyPress}
            />
            {(index + 1 !== questionProp.questionAnswers.length || Boolean(option.value)) && (
              <Button style={{ minWidth: 0, display: 'block' }} onClick={() => removeOption(index)}>
                <RemoveCircleOutlineIcon fontSize="small" />
              </Button>
            )}
          </div>
        );
      })}
      <ValidationErrorMessage error={optionError} />
    </div>
  );
};

CheckBoxQuestion.propTypes = {
  questionProp: PropTypes.object,
  updateRedux: PropTypes.func,
  isSurveyPublished: PropTypes.bool,
  isAddSurvey: PropTypes.bool,
};

export default memo(CheckBoxQuestion);
