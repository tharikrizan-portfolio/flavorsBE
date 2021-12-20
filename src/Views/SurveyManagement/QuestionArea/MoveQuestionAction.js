import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { toast } from 'react-toastify';
import useQuestionLogic from '../../../hooks/useQuestionLogic';

const MoveQuestionAction = ({
  isAddNewQuestionButtonDisabled,
  question,
  isAddSurvey,
  questionList,
  onSelect,
  updateRedux,
  index,
}) => {
  const { canChangeStep } = useQuestionLogic({ isAddSurvey });

  const questionMoveUp = (index) => {
    if (isAddNewQuestionButtonDisabled) {
      toast.error('Please correct  errors', {
        position: 'top-right',
      });
      return;
    }
    if (canChangeStep('up', question.questionId, question.step)) {
      let questionList_ = questionList;
      const tempQuestion = questionList_[index - 1];
      onSelect(parseInt(questionList_[index].step) - 1);
      questionList_[index - 1] = {
        ...questionList_[index],
        step: parseInt(questionList_[index].step) - 1,
      };
      questionList_[index] = {
        ...tempQuestion,
        step: parseInt(tempQuestion.step) + 1,
      };
      updateRedux([...questionList_]);
    } else {
      toast.warn("Can't move this question further up", {
        position: 'top-right',
      });
    }
  };

  //Move the question down / increase step variable
  const questionMoveDown = (index) => {
    if (isAddNewQuestionButtonDisabled) {
      toast.error('Please correct  errors', {
        position: 'top-right',
      });
      return;
    }
    if (canChangeStep('down', question.questionId, question.step)) {
      let questionList_ = questionList;
      const tempQuestion = questionList_[index + 1];
      questionList_[index + 1] = {
        ...questionList_[index],
        step: parseInt(questionList_[index].step) + 1,
      };

      questionList_[index] = {
        ...tempQuestion,
        step: parseInt(tempQuestion.step) - 1,
      };
      updateRedux([...questionList_]);
      onSelect(questionList_[index + 1].step);
    } else {
      toast.warn("Can't move this question further down", {
        position: 'top-right',
      });
    }
  };

  return (
    <div className="mr-1">
      {index !== 0 && (
        <div>
          <IconButton onClick={() => questionMoveUp(index)}>
            <ExpandLess />
          </IconButton>
        </div>
      )}
      {index !== questionList.length - 1 && (
        <div>
          <IconButton onClick={() => questionMoveDown(index)}>
            <ExpandMore />
          </IconButton>
        </div>
      )}
    </div>
  );
};

MoveQuestionAction.propTypes = {};

export default MoveQuestionAction;
