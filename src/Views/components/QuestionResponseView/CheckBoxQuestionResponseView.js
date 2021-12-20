import React from 'react';
import PropTypes from 'prop-types';

import { Label } from 'reactstrap';
import { Checkbox } from '@material-ui/core';

const CheckBoxQuestionResponseView = ({ question, colorSchema }) => {
  return (
    <div className="checkbox-question-read-view-wrapper">
      {question.questionAnswers.map(
        (item, key) =>
          item.name && (
            <div>
              <Label key={item.questionAnswerId} style={{ color: colorSchema.subtitle_font }}>
                {key + 1}.<span />
                <Checkbox
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
                      backgroundColor: 'red',
                      zIndex: -1,
                    },
                  }}
                  name={item.name}
                  checked={item.isChecked}
                  key={item.questionAnswerId}
                  value={item.questionAnswerId}
                />
                <span />
                {item.name}
              </Label>
              <br />
            </div>
          ),
      )}
    </div>
  );
};

CheckBoxQuestionResponseView.propTypes = {
  question: PropTypes.object.isRequired,
  colorSchema: PropTypes.object.isRequired,
};

export default CheckBoxQuestionResponseView;
