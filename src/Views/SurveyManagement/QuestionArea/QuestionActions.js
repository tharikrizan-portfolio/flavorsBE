import React from 'react';
import { useState } from 'react';
import {
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  Tooltip,
} from '@material-ui/core';
import { Delete, Image, FileCopy, Settings } from '@material-ui/icons';
import helper from '../../../util/helper';
import QuestionBackgroundPopup from './QuestionBackgroundPopup';
import QuestionVisibilityPopup from './QuestionVisibilityPopup';
import useQuestionLogic from '../../../hooks/useQuestionLogic';
import AlertDialog from '../../components/common/AlertDialog/AlertDialog';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

export const QuestionActions = ({
  question,
  updateQuestionRedux,
  updateRedux,
  questionList,
  onSelect,
  index,
  questionScrBgColor,
  isAddSurvey,
  isQuiz,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAlertRemove, setShowAlertRemove] = useState(false);
  const [showAlertDuplicate, setShowAlertDuplicate] = useState(false);
  const [showVisibility, setShowVisibility] = useState(false);
  const { removeQuestionDependencies, duplicateQuestionDependencies } = useQuestionLogic({
    isAddSurvey: isAddSurvey,
  });

  const duplicateQuestion = (index, isWithCondition) => {
    const questionToDuplicate = helper.convertObject(questionList[index]);
    questionToDuplicate.questionId = uuidv4();
    let questionList_ = questionList;
    questionList_.splice(index + 1, 0, questionToDuplicate);
    questionList_ = questionList_.map((question, index) => {
      return {
        ...question,
        step: index + 1,
      };
    });

    isWithCondition &&
      duplicateQuestionDependencies(
        questionList[index]?.questionId,
        questionToDuplicate.questionId,
      );

    updateRedux([...questionList_]);
    onSelect(index + 2);
  };

  const onToggleRequired = (e) => {
    const updatedQuestionData = {
      ...question,
      required: e.target.checked,
    };

    updateQuestionRedux(updatedQuestionData);
  };

  const onToggleIsShowResponse = (e) => {
    const updatedQuestionData = {
      ...question,
      isShowResponse: e.target.checked,
    };

    updateQuestionRedux(updatedQuestionData);
  };

  //Remove clicked question from redux
  const onRemoveQuestion = () => {
    let questionList_ = questionList;
    questionList_.splice(index, 1);
    questionList_ = questionList_.map((question, index) => {
      return { ...question, step: index + 1 };
    });
    onSelect(index);
    updateRedux([...questionList_]);
    removeQuestionDependencies(question?.questionId || '');
  };

  const conditionalQuestionList = useSelector((state) =>
    helper.convertObject(state.updateSurveyObj.conditionalQuestionList || []),
  );

  const onDuplicateQuestion = () => {
    conditionalQuestionList.some((item) => item.questionId === questionList[index]?.questionId)
      ? setShowAlertDuplicate(true)
      : duplicateQuestion(index, false);
  };

  return (
    <>
      <Divider />
      <div className="question-actions ml-1">
        <>
          <FormGroup style={{ flexDirection: 'row', height: '35px' }}>
            <FormControlLabel
              size="small"
              control={
                <Switch
                  color="primary"
                  size="small"
                  onChange={onToggleRequired}
                  checked={question.required}
                />
              }
              label="Required"
            />
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  size="small"
                  onChange={onToggleIsShowResponse}
                  checked={question.isShowResponse}
                />
              }
              label="Show response to user"
            />
          </FormGroup>
        </>
        <div>
          <Tooltip title="Add Background Image">
            <IconButton onClick={() => setIsOpen(true)}>
              <Image fontSize="small" />
            </IconButton>
          </Tooltip>
          {questionList.length > 0 && (
            <Tooltip title="Delete Question">
              <IconButton onClick={() => setShowAlertRemove(true)}>
                <Delete fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Duplicate Question">
            <IconButton onClick={() => onDuplicateQuestion()}>
              <FileCopy fontSize="small" />
            </IconButton>
          </Tooltip>
          {index !== 0 && !isQuiz && (
            <Tooltip title="Question Visibility Logic">
              <IconButton onClick={() => setShowVisibility(true)}>
                <Settings fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
      <QuestionBackgroundPopup
        {...{ isOpen, setIsOpen, question, updateQuestionRedux, questionScrBgColor, index }}
      />
      <AlertDialog
        open={showAlertRemove}
        handleClose={() => setShowAlertRemove(false)}
        handleOk={onRemoveQuestion}
        title="Delete Confirmation"
        description="Are you sure you want to delete this question ? "
      />
      <AlertDialog
        open={showAlertDuplicate}
        handleClose={() => {
          setShowAlertDuplicate(false);
          duplicateQuestion(index, false);
        }}
        handleOk={() => duplicateQuestion(index, true)}
        title="Duplicate Conditions Confirmation"
        description="This question has conditions. Do you want to duplicate with conditions?"
        okText="Yes"
        cancelText="No"
      />
      <QuestionVisibilityPopup
        {...{
          showVisibility,
          setShowVisibility,
          question,
          updateQuestionRedux,
          index,
          isAddSurvey,
        }}
      />
    </>
  );
};

export default QuestionActions;
