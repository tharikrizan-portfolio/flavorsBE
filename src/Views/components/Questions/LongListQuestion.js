import React, { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { Radio, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { changeValidations, updateValidations } from '../../../actions/survey.actions';
import { validateQuestionOptionTitle } from '../../../util/validations';
import ValidationErrorMessage from '../common/ErrorMessage/ValidationErrorMessage';
import { v4 as uuidv4 } from 'uuid';

const LongListQuestion = ({ questionProp, updateRedux, isAddSurvey, isSurveyPublished }) => {
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (questionProp.questionAnswers.length === 0) addNewOption();
    if (questionProp.questionAnswers[questionProp.questionAnswers.length - 1].value) {
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

    if (text && !invalidAnswerLst.length) {
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
      <div
        style={{
          maxHeight: '350px',
          minHeight: '100px',
          overflow: 'auto',
        }}
      >
        {questionProp?.questionAnswers?.map((responseVal, index) => {
          return (
            <div style={{ display: 'flex' }}>
              <Radio color='primary' inputProps={{ 'aria-label': 'primary checkbox' }} />
              <TextField
                placeholder="Add your option"
                required
                value={responseVal.name}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                style={{ width: '70%' }}
                inputRef={index + 1 === questionProp.questionAnswers.length ? inputRef : null}
                onKeyPress={handleKeyPress}
              />
              {(index + 1 !== questionProp.questionAnswers.length ||
                Boolean(responseVal.value)) && (
                <Button
                  style={{ minWidth: 0, display: 'block' }}
                  onClick={() => removeOption(index)}
                >
                  <RemoveCircleOutlineIcon fontSize="small" />
                </Button>
              )}
            </div>
          );
        })}
      </div>
      <ValidationErrorMessage error={optionError} />
    </div>
  );
};

LongListQuestion.propTypes = {
  questionProp: PropTypes.object,
  updateRedux: PropTypes.func,
};

export default memo(LongListQuestion);
