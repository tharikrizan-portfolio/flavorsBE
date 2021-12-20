import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import SurveyQuestion from './Questions/SurveyQuestion';
import { setQuestionList } from './../../actions/question.actions';
import { setUpdateQuestionList } from '../../actions/updateQuestion.actions';
import { NEW_QUESTION_OBJECT } from '../../helper/updateQuestionHelper';
import helper from '../../util/helper';
import { SET_IS_UPDATE_SHEET } from '../../actions/types';
import QuestionCard from '../SurveyManagement/QuestionArea/QuestionCard';

const SurveyQuestionList = ({ isAddSurvey, isQuiz }) => {
  const dispatch = useDispatch();
  let questionList = [];
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  useEffect(() => {
    const questionList_ = questionList;
    if (questionList.length < 1) {
      questionList_.push(
        helper.convertObject(NEW_QUESTION_OBJECT(parseInt(questionList_.length) + 1)),
      );
    }
    updateRedux([...questionList_]);
    setSelectedQuestion(questionList_.length);
  }, []);

  //retrieve update question list from redux
  const updateQuestionList = useSelector(
    (state) => state?.updateSurveyObj?.surveyQuestions?.data || [],
  );
  //retrieve update question list from redux
  const newQuestionList = useSelector(
    (state) => state?.addSurveyObj?.questions?.questionList || [],
  );
  //retrieve survey publish status from redux
  const isSurveyPublished = useSelector(
    (state) => state?.updateSurveyObj?.survey?.isPublished || false,
  );

  //set the redux object according to the ui
  if (isAddSurvey) questionList = newQuestionList;
  else questionList = updateQuestionList;

  //Function to update redux conditionally
  const updateRedux = (value) => {
    if (isAddSurvey) dispatch(setQuestionList(value));
    else {
      dispatch(setUpdateQuestionList(value));
      dispatch({
        type: SET_IS_UPDATE_SHEET,
        payload: { questionTitleChanged: true, questionSequenceChanged: true },
      });
    }
  };

  return (
    <>
      {questionList &&
        questionList
          .sort((a, b) => a.step - b.step)
          .map((question, index) => (
            <QuestionCard
              {...{
                question,
                index,
                isSelected: selectedQuestion == question.step,
                onSelect: (val) => setSelectedQuestion(val),
                isSurveyPublished,
                isAddSurvey,
                isQuiz,
                questionList,
              }}
            />
          ))}
    </>
  );
};

SurveyQuestion.propTypes = {
  isAddSurvey: PropTypes.bool,
  isQuiz: PropTypes.bool,
};

export default SurveyQuestionList;
