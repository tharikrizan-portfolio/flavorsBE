import React from 'react';
import PropTypes from 'prop-types';
import { Input, TextField } from '@material-ui/core';
import { FormGroup } from 'reactstrap';

const LineTextQuestionResponseView = ({ question, colorSchema, isQuiz }) => {
  return (
    <div>
      <FormGroup row className="my-0 align-left-icon answe-box-size">
        <Input
          style={{
            color: colorSchema.subtitle_font,
            fontSize: 20,
            width: '50%',
          }}
          id="standard-textarea"
          placeholder={
            isQuiz
              ? 'Type you answer here'
              : question?.questionAnswers?.[0]?.value || 'Enter your answer'
          }
          inputProps={{ 'aria-label': 'description' }}
        />
      </FormGroup>
    </div>
  );
};

LineTextQuestionResponseView.propTypes = {
  question: PropTypes.object.isRequired,
  colorSchema: PropTypes.object.isRequired,
};

export default LineTextQuestionResponseView;
