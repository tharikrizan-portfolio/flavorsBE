import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';

import { RadioGroup, Radio } from '@material-ui/core';

const RadioButtonQuestionResponseView = ({ question, colorSchema }) => {
  return (
    <div className="radiobtn-read-view-wrapper">
      <RadioGroup>
        {question.questionAnswers.map(
          (item, key) =>
            item.name && (
              <Label key={item.questionAnswerId} style={{ color: colorSchema.subtitle_font }}>
                {key + 1}.<span />
                <Radio
                  style={{
                    color: colorSchema.subtitle_font,
                    '& .MuiIconButton-label': {
                      position: 'relative',
                      zIndex: 0,
                    },

                    '& .MuiIconButton-label:after': {
                      content: '""',
                      left: 4,
                      top: 4,
                      height: 15,
                      width: 15,
                      position: 'absolute',
                      backgroundColor: colorSchema.subtitle_font,
                      color: colorSchema.subtitle_font,
                      zIndex: -1,
                    },
                  }}
                  name={item.name}
                  required={question.required}
                  checked={false}
                  key={item.questionAnswerId}
                  value={item.questionAnswerId}
                />
                <span />
                {item.name}
              </Label>
            ),
        )}
      </RadioGroup>
    </div>
  );
};

RadioButtonQuestionResponseView.propTypes = {
  question: PropTypes.object.isRequired,
  colorSchema: PropTypes.object.isRequired,
};

export default RadioButtonQuestionResponseView;
