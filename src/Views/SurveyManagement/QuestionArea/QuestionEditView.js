import React, { useEffect, useState } from 'react';
import { NEW_QUESTION_OBJECT } from '../../../helper/updateQuestionHelper';
import { updateQuestion } from '../../../actions/question.actions';
import { mutateUpdateQuestion } from '../../../actions/updateQuestion.actions';
import { AddBox } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { setQuestionList } from '../../../actions/question.actions';
import { setUpdateQuestionList } from '../../../actions/updateQuestion.actions';
import { useDispatch, useSelector } from 'react-redux';
import { SET_IS_UPDATE_SHEET } from '../../../actions/types';
import helper from '../../../util/helper';
import QuestionActions from './QuestionActions';
import QuestionComponent from './QuestionComponent';
import QuizFeedback from './QuizFeedback';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { toast } from 'react-toastify';
import MoveQuestionAction from './MoveQuestionAction';

const QuestionEditView = ({
  question,
  isQuiz,
  index,
  isAddSurvey,
  onSelect,
  questionList,
  isSelected,
}) => {
  const dispatch = useDispatch();

  const questionScrBgColor = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.survey.colorSchema.question_scr
      : state.updateSurveyObj.survey.colorSchema.question_scr,
  );

  const errorState = useSelector((state) =>
    isAddSurvey ? state.addSurveyObj.errorState : state.updateSurveyObj.errorState,
  );
  const [isAddNewQuestionButtonDisabled, setIsAddNewQuestionButtonDisabled] = useState();

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

  const updateQuestionRedux = (updatedQuestionData) => {
    if (isAddSurvey) dispatch(updateQuestion(index, updatedQuestionData, questionList));
    else {
      dispatch(mutateUpdateQuestion(index, updatedQuestionData, questionList));
      dispatch({
        type: SET_IS_UPDATE_SHEET,
        payload: { questionTitleChanged: true, questionSequenceChanged: true },
      });
    }
  };

  const onAddNewQuestion = () => {
    if (isAddNewQuestionButtonDisabled) {
      toast.error('Please correct  errors', {
        position: 'top-right',
      });
      return;
    }
    let questionList_ = questionList;
    const tempStep = questionList[index].step + 1;
    questionList_ = questionList_.map((question, index) => {
      if (question.step >= tempStep) {
        question.step = index + 2;
      }
      return question;
    });
    questionList_.push(helper.convertObject(NEW_QUESTION_OBJECT(tempStep)));
    onSelect(tempStep); //Atheek this has to be changed to add a question after the current selected question
    updateRedux([...questionList_]);
  };

  const questionProps = {
    question,
    updateRedux,
    updateQuestionRedux,
    isQuiz,
    questionList,
    onSelect,
    index,
    questionScrBgColor,
    isAddSurvey,
  };

  useEffect(() => {
    setIsAddNewQuestionButtonDisabled(
      errorState?.title?.isError ||
        errorState?.description?.isError ||
        errorState?.questionTitle?.isError ||
        errorState?.option?.isError ||
        errorState?.ratingValue?.isError,
    );
  }, [errorState]);

  useEffect(() => {
    setIsAddNewQuestionButtonDisabled(isAddSurvey);
  }, []);

  return (
    <>
      <div
        className="rounded-card edit-view"
        onClick={() => !isSelected && onSelect(question.step)}
      >
        <div className="question-area">
          <MoveQuestionAction {...questionProps} />
          <div style={{ width: '100%' }}>
            <QuestionComponent {...questionProps} />
            {isQuiz && <QuizFeedback {...{ question, updateQuestionRedux }} />}
            <QuestionActions {...questionProps} />
          </div>
        </div>
      </div>
      <div className="add-button">
        <Tooltip
          title={isAddNewQuestionButtonDisabled ? 'Please Correct Errors' : 'Add New Question'}
        >
          <Button
            onClick={onAddNewQuestion}
            variant="contained"
            color={isAddNewQuestionButtonDisabled ? 'disabled' : 'default'}
            startIcon={<AddIcon className="add-icon" />}
          >
            ADD NEW QUESTION
          </Button>
        </Tooltip>
      </div>
    </>
  );
};

QuestionEditView.propTypes = {
  question: PropTypes.object,
  isQuiz: PropTypes.bool,
  index: PropTypes.number,
  isAddSurvey: PropTypes.bool,
  onSelect: PropTypes.func,
  questionList: PropTypes.array,
};

export default QuestionEditView;
