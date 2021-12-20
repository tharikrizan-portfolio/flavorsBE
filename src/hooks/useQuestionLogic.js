import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addConditionalQuestion, updateConditionalQuestion } from '../actions/survey.actions';
import helper from '../util/helper';

const useQuestionLogic = ({ isAddSurvey }) => {
  const dispatch = useDispatch();
  const conditionalQuestionList = useSelector((state) =>
    isAddSurvey
      ? state?.addSurveyObj?.conditionalQuestionList
      : state?.updateSurveyObj?.conditionalQuestionList,
  );

  const questionList = useSelector((state) =>
    isAddSurvey
      ? state?.addSurveyObj?.questions?.questionList
      : state?.updateSurveyObj?.surveyQuestions?.data,
  );

  const removeQuestionDependencies = (questionId) => {
    const updatedList = conditionalQuestionList?.filter(
      (item) => item.parentQuestionId != questionId,
    );
    dispatch(
      isAddSurvey
        ? addConditionalQuestion([...updatedList])
        : updateConditionalQuestion([...updatedList]),
    );
  };

  const removeAnswerDependencies = (questionAnswerId) => {
    const updatedList = conditionalQuestionList?.filter(
      (item) => item.questionAnswerId != questionAnswerId,
    );
    dispatch(
      isAddSurvey
        ? addConditionalQuestion([...updatedList])
        : updateConditionalQuestion([...updatedList]),
    );
  };

  const duplicateQuestionDependencies = (questionId, newQuestionId) => {
    let newconditionalQuestions = helper.convertObject(
      conditionalQuestionList?.filter((item) => item.questionId == questionId),
    );
    newconditionalQuestions.map((x) => {
      x.questionId = newQuestionId;
      return x;
    });
    dispatch(
      isAddSurvey
        ? addConditionalQuestion([...conditionalQuestionList, ...newconditionalQuestions])
        : updateConditionalQuestion([...conditionalQuestionList, ...newconditionalQuestions]),
    );
  };

  const addConditionalQuestions = (questionId, newValues) => {
    const updatedList =
      conditionalQuestionList?.filter((item) => item.questionId != questionId) || [];
    dispatch(
      isAddSurvey
        ? addConditionalQuestion([...updatedList, ...newValues])
        : updateConditionalQuestion([...updatedList, ...newValues]),
    );
  };

  const removeAllConditions = (questionId) => {
    const updatedList = conditionalQuestionList?.filter((item) => item.questionId != questionId);
    dispatch(
      isAddSurvey
        ? addConditionalQuestion([...updatedList])
        : updateConditionalQuestion([...updatedList]),
    );
  };

  const canChangeStep = (direction, questionId, currentStep) => {
    if (direction === 'up') {
      const parentQuestionIds =
        conditionalQuestionList
          ?.filter((item) => item.questionId == questionId)
          ?.map((x) => x.parentQuestionId) || [];
      if (parentQuestionIds.length == 0) {
        return true;
      } else {
        const result = questionList.filter((x) => parentQuestionIds.includes(x.questionId));
        const maxStep = Math.max.apply(
          Math,
          result.map((x) => parseInt(x.step)),
        );
        return parseInt(currentStep) - 1 > parseInt(maxStep);
      }
    }
    if (direction === 'down') {
      const childQuestionIds =
        conditionalQuestionList
          ?.filter((item) => item.parentQuestionId == questionId)
          ?.map((x) => x.questionId) || [];
      if (childQuestionIds.length == 0) {
        return true;
      } else {
        const result = questionList.filter((x) => childQuestionIds.includes(x.questionId));
        const minStep = Math.min.apply(
          Math,
          result.map((x) => x.step),
        );
        return parseInt(currentStep) + 1 < parseInt(minStep);
      }
    }
  };

  const canChangeQuestionType = (questionId) => {
    const hasDependency = conditionalQuestionList.some((x) => x.parentQuestionId == questionId);
    return !hasDependency;
  };

  return {
    conditionalQuestionList,
    removeQuestionDependencies,
    removeAnswerDependencies,
    addConditionalQuestions,
    duplicateQuestionDependencies,
    removeAllConditions,
    canChangeStep,
    canChangeQuestionType
  };
};

useQuestionLogic.propTypes = {};

export default useQuestionLogic;
