import React from 'react';
import QuestionReadView from './QuestionReadView';
import QuestionEditView from './QuestionEditView';
import PropTypes from 'prop-types';

const QuestionCard = (props) => {
  const isEditable = (props.isAddSurvey || !props.isSurveyPublished) && props.isSelected;

  return <>{isEditable ? <QuestionEditView {...props} /> : <QuestionReadView {...props} />}</>;
};

QuestionCard.propTypes = {
  question: PropTypes.object,
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  isSurveyPublished: PropTypes.bool,
  isAddSurvey: PropTypes.bool,
  isQuiz: PropTypes.bool,
  questionList: PropTypes.array,
};

export default QuestionCard;
