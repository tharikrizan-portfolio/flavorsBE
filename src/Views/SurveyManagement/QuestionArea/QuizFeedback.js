import { Divider, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { Form } from 'react-bootstrap';
import FormTextInput from '../../components/common/Inputs/FormTextInput';

const QuizFeedback = ({ updateQuestionRedux, question }) => {
  const onChangeTextQuestionMarks = (e) => {
    const marks_ = e.target.value;
    if (marks_ < 0) {
      return;
    }
    const updatedQuestionData = {
      ...question,
      metadata: { ...question.metadata, marks: marks_ },
    };
    updateQuestionRedux(updatedQuestionData);
  };

  const handleFeedback = (e) => {
    const updatedQuestionData = {
      ...question,
      metadata: { ...question.metadata, feedbackText: e.target.value },
    };
    updateQuestionRedux(updatedQuestionData);
  };

  return (
    <>
      <Divider />
      <Grid className="mb-2 mt-1" container spacing={2}>
        <Grid item xs={9}>
          <div>
            <FormTextInput
              label="Question Feedback"
              id="question-feedback"
              handleChange={handleFeedback}
              value={question?.metadata?.feedbackText || ''}
              placeholder="Add Your Feedback..."
              classes="question-name-custom-text"
            />
          </div>
        </Grid>
        <Grid item xs={3}>
          <FormTextInput
            label="Marks"
            type="number"
            id="standard-number"
            handleChange={onChangeTextQuestionMarks}
            value={question?.metadata?.marks}
            placeholder="Marks.."
            classes="question-name-custom-text"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default QuizFeedback;
