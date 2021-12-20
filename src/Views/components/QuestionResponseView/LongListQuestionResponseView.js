import React from 'react';
import PropTypes from 'prop-types';
import AutoCompleteDropDown from '../../components/common/Inputs/AutoCompleteDropDown';

const LongListQuestionResponseView = ({ question, colorSchema }) => {
  return (
    <div className="long-list-read-view-wrapper">
      <AutoCompleteDropDown
        optionList={question.questionAnswers.map((opt) => opt.name)}
        label="Please choose an option"
        bgColor={colorSchema.subtitle_font}
      />
    </div>
  );
};

LongListQuestionResponseView.propTypes = {
  question: PropTypes.object.isRequired,
  colorSchema: PropTypes.object.isRequired,
};

export default LongListQuestionResponseView;
