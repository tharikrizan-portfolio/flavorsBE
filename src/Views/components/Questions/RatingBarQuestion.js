import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

import StyledRating from '../../widgets/StyledRating';
import FormTextInput from '../common/Inputs/FormTextInput';
import { range } from '../../../util/helper';
import { changeValidations, updateValidations } from '../../../actions/survey.actions';
import { validateRatingBarLabels, validateRatingBarMaxValue } from '../../../util/validations';
import ValidationErrorMessage from '../common/ErrorMessage/ValidationErrorMessage';

const RatingBarQuestion = ({ questionProp, updateRedux, isAddSurvey }) => {
  const dispatch = useDispatch();
  const onChangeRadioFields = (e) => {
    const isLabel = e.target.id === 'minLabel' || e.target.id === 'maxLabel';

    isAddSurvey
      ? dispatch(
          changeValidations({
            type: 'ratingValue',
            data: isLabel
              ? validateRatingBarLabels(e.target.value)
              : validateRatingBarMaxValue(e.target.value, 3),
          }),
        )
      : dispatch(
          updateValidations({
            type: 'ratingValue',
            data: isLabel
              ? validateRatingBarLabels(e.target.value)
              : validateRatingBarMaxValue(e.target.value),
          }),
        );

    let maxValue = parseInt(e.target.value);

    if (e.target.id === 'max' || e.target.id === 'min') {
      if (maxValue > 10 || maxValue < 3) {
        return false;
      }
    }

    // if (isLabel) {
    //   if (validateRatingBarLabels(e.target.value).isError) {
    //     return false;
    //   }
    // }

    const updatedQuestionData = {
      ...questionProp,
      [e.target.id]: e.target.value,
      metadata: {
        ...questionProp.metadata,
        [e.target.id]: e.target.value,
      },
    };

    updateRedux(updatedQuestionData);
  };

  const ratingBarError = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj?.errorState?.ratingValue
      : state.updateSurveyObj?.errorState?.ratingValue,
  );

  return (
    <>
      <div className="rating-bar-field-section">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Minimum</Form.Label>
          <Form.Control type="Number" id="min" value={questionProp.metadata.min} disabled={true} />
        </Form.Group>
        <Form.Label style={{ marginTop: '40px', marginLeft: '20px', marginRight: '20px' }}>
          -
        </Form.Label>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>maximum</Form.Label>
          <Form.Control
            type="Number"
            id="max"
            value={questionProp.metadata.max}
            onChange={(e) => onChangeRadioFields(e)}
          />
        </Form.Group>
      </div>
      <ValidationErrorMessage error={ratingBarError} />
      <div className="rating-bar-field-section">
        <Form.Group controlId="formBasicEmail">
          <FormTextInput
            type="text"
            id="minLabel"
            placeholder="Minimum lable"
            value={questionProp.metadata.minLabel || ''}
            handleChange={onChangeRadioFields}
          />
        </Form.Group>
        <Form.Label style={{ marginTop: '10px', marginLeft: '20px', marginRight: '20px' }}>
          -
        </Form.Label>
        <Form.Group controlId="formBasicEmail">
          <FormTextInput
            type="text"
            id="maxLabel"
            placeholder="Maximum lable"
            value={questionProp.metadata.maxLabel || ''}
            handleChange={onChangeRadioFields}
          />
        </Form.Group>
      </div>
      <div className="flex-space-even rating-bar-rate-radio-padding">
        <span className="custom-rating-bar-min-label">{questionProp.metadata.minLabel}</span>
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
            max={questionProp.metadata.max - questionProp.metadata.min + 1}
            name="hover-feedback"
            precision={1}
          />
          <div className="custom-rating-bar-number-margin">
            {range(1, questionProp.metadata.max).map((num) => (
              <span>{num}</span>
            ))}
          </div>
        </div>
        <span className="custom-rating-bar-max-label">{questionProp.metadata.maxLabel}</span>
      </div>
    </>
  );
};

RatingBarQuestion.propTypes = {
  questionProp: PropTypes.object,
  updateRedux: PropTypes.func,
};

export default memo(RatingBarQuestion);
