import React from 'react';
import PropTypes from 'prop-types';
import StyledRating from '../../widgets/StyledRating';

import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import { range } from '../../../util/helper';

const RatingBarQuestionResponseView = ({ question, colorSchema }) => {
  return (
    <div className="flex-space-even rating-bar-rate-radio-padding">
      <span
        className="custom-rating-bar-min-label"
        style={{
          color: colorSchema.subtitle_font,
        }}
      >
        {question.metadata.minLabel}
      </span>
      <div>
        <StyledRating
          size="large"
          icon={
            <div className="custom-rating-bar-padding">
              <RadioButtonCheckedIcon />
            </div>
          }
          defaultValue={1}
          defaultChecked={false}
          max={question.metadata.max - question.metadata.min + 1}
          name="hover-feedback"
          precision={1}
          color={colorSchema.subtitle_font}
          titleColor={colorSchema.title_font}
        />
        <div className="custom-rating-bar-number-margin">
          {range(1, question.metadata.max).map((num) => (
            <span
              style={{
                color: colorSchema.subtitle_font,
              }}
            >
              {num}
            </span>
          ))}
        </div>
      </div>
      <span
        className="custom-rating-bar-max-label"
        style={{
          color: colorSchema.subtitle_font,
        }}
      >
        {question.metadata.maxLabel}
      </span>
    </div>
  );
};

RatingBarQuestionResponseView.propTypes = {
  question: PropTypes.object.isRequired,
  colorSchema: PropTypes.object.isRequired,
};

export default RatingBarQuestionResponseView;
