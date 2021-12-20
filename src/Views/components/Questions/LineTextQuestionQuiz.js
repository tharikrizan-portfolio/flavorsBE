import React, { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'react-bootstrap';
import { Button, Checkbox } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import commonConstants from '../../../util/common.constants';
import CustomSelect from '../common/DropDown/CustomSelect';
import { changeValidations, updateValidations } from '../../../actions/survey.actions';
import { validateQuestionOptionTitle } from '../../../util/validations';
import ValidationErrorMessage from '../common/ErrorMessage/ValidationErrorMessage';
import { v4 as uuidv4 } from 'uuid';


const LineTextQuestionQuiz = ({ questionProp, updateRedux, isAddSurvey }) => {
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (questionProp.questionAnswers.length === 0) addNewOption();
    if (questionProp.questionAnswers[questionProp.questionAnswers.length - 1].value) {
      addNewOption();
    }
  }, [questionProp.questionAnswers]);

  const optionError = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj?.errorState?.option
      : state.updateSurveyObj?.errorState?.option,
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

  const capsCheck = (e) => {
    const updatedQuestionData = {
      ...questionProp,

      metadata: {
        ...questionProp.metadata,
        caseCheck: e.target.checked,
      },
    };

    updateRedux(updatedQuestionData);
  };

  const addNewOption = () => {
    let questionAnswers_ = questionProp.questionAnswers;
    questionAnswers_.push({
      questionAnswerId: uuidv4(),
      name: '',
      label: '',
      metadata: { isCorrect: true },
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

  const onSelectedValidationType = (option) => {
    const updatedQuestionData = {
      ...questionProp,
      metadata: {
        ...questionProp.metadata,
        validation: { type: option.value },
      },
    };

    updateRedux(updatedQuestionData);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      inputRef.current.focus();
    }
  };

  return (
    <React.Fragment>
      <Row style={{ marginTop: '10px', height: '35px' }}>
        <Col lg="9" xs="12">
          <div>
            <div className="flex-space-between">
              <h6 style={{ marginTop: 'auto' }}>
                <b>Correct Answers</b>
              </h6>
              <div>
                <Checkbox
                  color="primary"
                  onChange={capsCheck}
                  checked={questionProp.metadata?.caseCheck}
                />{' '}
                <b>Check Case Sensitivity</b>
              </div>
            </div>
          </div>
        </Col>
        <Col lg="3" xs="12" style={{ paddingLeft: '5px' }}>
          <CustomSelect
            options={commonConstants.VALIDATION_TYPES}
            value={questionProp.metadata?.validation?.type}
            onChange={onSelectedValidationType}
            placeholder="Select Validation..."
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col lg="9" xs="12" style={{ paddingRight: '11px' }}>
          <div className="question-answer-section-quiz">
            <div
              style={{
                maxHeight: '350px',
                minHeight: '50px',
                overflow: 'auto',
              }}
            >
              {questionProp.questionAnswers.map((option, index) => {
                return (
                  <div style={{ display: 'flex' }}>
                    <TextField
                      style={{ width: '100%' }}
                      placeholder="Add your option"
                      required
                      value={option.name}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      inputRef={index + 1 === questionProp.questionAnswers.length ? inputRef : null}
                      onKeyPress={handleKeyPress}
                    />
                    {(index + 1 !== questionProp.questionAnswers.length ||
                      Boolean(option.value)) && (
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
        </Col>
      </Row>
    </React.Fragment>
  );
};

LineTextQuestionQuiz.propTypes = {
  questionProp: PropTypes.object,
  updateRedux: PropTypes.func,
};

export default memo(LineTextQuestionQuiz);
