import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import FormTextInput from '../../components/common/Inputs/FormTextInput';
import * as enumUtil from '../../../util/enumerations';
import { useDispatch, useSelector } from 'react-redux';

import {
  CheckBoxQuestion,
  CheckboxQuestionQuiz,
  LineTextQuestion,
  LineTextQuestionQuiz,
  LongListQuestion,
  RadioButtonQuestion,
  RadioButtonQuestionQuiz,
  RatingBarQuestion,
} from '../../components/Questions';
import commonConstants from '../../../util/common.constants';
import CustomSelect from '../../components/common/DropDown/CustomSelect';
import { changeValidations, updateValidations } from '../../../actions/survey.actions';
import { validateQuestionTitle } from '../../../util/validations';
import ValidationErrorMessage from '../../components/common/ErrorMessage/ValidationErrorMessage';
import useQuestionLogic from '../../../hooks/useQuestionLogic';
import { toast } from 'react-toastify';

const QuestionComponent = ({ question, updateQuestionRedux, isQuiz, isAddSurvey }) => {
  const questionTypes = isQuiz
    ? commonConstants.QUIZ_QUESTION_TYPES
    : commonConstants.QUESTION_TYPES;

  const dispatch = useDispatch();
  const { canChangeQuestionType } = useQuestionLogic({ isAddSurvey });
  const questionTitleError = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj?.errorState?.questionTitle
      : state.updateSurveyObj.errorState?.questionTitle,
  );

  const changeQuestionName = (e) => {
    isAddSurvey
      ? dispatch(
          changeValidations({ type: 'questionTitle', data: validateQuestionTitle(e.target.value) }),
        )
      : dispatch(
          updateValidations({ type: 'questionTitle', data: validateQuestionTitle(e.target.value) }),
        );

    const updatedQuestionData = {
      ...question,
      questionName: e.target.value,
      questionNameValue: e.target.value,
      name: e.target.value,
    };

    updateQuestionRedux(updatedQuestionData);
  };

  const onSelectedQuestionType = (option) => {
    if (canChangeQuestionType(question.questionId)) {
      const updatedQuestionData = {
        ...question,
        type: option.value,
      };
      updateQuestionRedux(updatedQuestionData);
    } else {
      toast.warn("Can't change this question type this has a has dependency", {
        position: 'top-right',
      });
    }
  };

  const renderQuestionTypes = (questionType) => {
    switch (questionType) {
      case enumUtil.questionTypes.RADIO_BUTTON:
        if (isQuiz) {
          return (
            <RadioButtonQuestionQuiz
              questionProp={question}
              updateRedux={updateQuestionRedux}
              isSurveyPublished={false} //Atheek remove all isSurveyPublished and isAddSurvey props since this works as a editable view
              isAddSurvey={isAddSurvey}
            />
          );
        } else {
          return (
            <RadioButtonQuestion
              questionProp={question}
              updateRedux={updateQuestionRedux}
              isSurveyPublished={false}
              isAddSurvey={isAddSurvey}
            />
          );
        }

      case enumUtil.questionTypes.LINE_TEXT:
        if (isQuiz) {
          return (
            <LineTextQuestionQuiz
              questionProp={question}
              updateRedux={updateQuestionRedux}
              isSurveyPublished={false}
              isAddSurvey={isAddSurvey}
            />
          );
        } else {
          return (
            <LineTextQuestion
              questionProp={question}
              updateRedux={updateQuestionRedux}
              isSurveyPublished={false}
              isAddSurvey={isAddSurvey}
            />
          );
        }

      case enumUtil.questionTypes.CHECKBOX:
        if (isQuiz) {
          return (
            <CheckboxQuestionQuiz
              questionProp={question}
              updateRedux={updateQuestionRedux}
              isSurveyPublished={false}
              isAddSurvey={isAddSurvey}
            />
          );
        } else {
          return (
            <CheckBoxQuestion
              questionProp={question}
              updateRedux={updateQuestionRedux}
              isSurveyPublished={false}
              isAddSurvey={isAddSurvey}
            />
          );
        }
      case enumUtil.questionTypes.RATING_BAR:
        return (
          <RatingBarQuestion
            questionProp={question}
            updateRedux={updateQuestionRedux}
            isSurveyPublished={false}
            isAddSurvey={isAddSurvey}
          />
        );

      case enumUtil.questionTypes.LONG_LIST:
        return (
          <LongListQuestion
            questionProp={question}
            updateRedux={updateQuestionRedux}
            isSurveyPublished={false}
            isAddSurvey={isAddSurvey}
          />
        );
      case enumUtil.questionTypes.LOCATION:
        return <div>Not implemented</div>;
      default:
        return <div>Please select a question type.</div>;
    }
  };

  const [questionTitleFirstRun, setQuestionTitleFirstRun] = useState();

  useEffect(() => {
    if (isAddSurvey) {
      setQuestionTitleFirstRun(true);

      dispatch(
        changeValidations({
          type: 'questionTitle',
          data: validateQuestionTitle(question.name || ''),
        }),
      );
    } else {
      dispatch(
        updateValidations({ type: 'questionTitle', data: validateQuestionTitle(question.name) }),
      );
    }
  }, []);

  useEffect(() => {
    if (question.name) {
      setQuestionTitleFirstRun(false);
    }
  }, [question.name]);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <FormTextInput
            label=""
            id="question-name"
            handleChange={changeQuestionName}
            value={question.name}
            placeholder="Enter Question Name..."
            classes="question-name-custom-text"
            disabled={false}
          />
          {!questionTitleFirstRun && <ValidationErrorMessage error={questionTitleError} />}
        </Grid>
        <Grid item xs={3}>
          <CustomSelect
            options={questionTypes}
            value={question.type}
            onChange={onSelectedQuestionType}
            placeholder="Select Question Type..."
          />
        </Grid>
      </Grid>
      <div>{renderQuestionTypes(question.type)}</div>
    </>
  );
};

export default QuestionComponent;
