import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { Form } from 'react-bootstrap';

import {
  updateSurveyEndDate,
  updateSurveyStartDate,
  changeSurveyEndDate,
  changeSurveyStartDate,
} from '../../../../actions/survey.configuration.actions';

import moment from 'moment';
import { DATE_PICKER_DATE_FORMAT } from '../../../../store/constant';
import MaterialDatePicker from '../DatePicker/MaterialDatePicker';
import { changeValidations, updateValidations } from '../../../../actions/survey.actions';
import { validateSurveyDates } from '../../../../util/validations';
import ValidationErrorMessage from '../ErrorMessage/ValidationErrorMessage';

const datePickerStyles = {
  background: '#f2f4fc',
  padding: '5px',
  borderRadius: '5px',
  border: 'solid 1px',
  borderColor: '#d8dceb',
};

function SurveyDates({ isAddSurvey }) {
  const dispatch = useDispatch();

  const dateError = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj?.errorState?.surveyDate
      : state.updateSurveyObj?.errorState?.surveyDate,
  );

  const startDateAdd = useSelector(
    (state) => state.addSurveyObj?.survey?.startAt || moment().format(),
  );
  const startDateUpdate = useSelector(
    (state) => state.updateSurveyObj?.survey?.startAt || moment().format(),
  );
  const endDateAdd = useSelector(
    (state) => state.addSurveyObj?.survey?.endAt || moment().add(60, 'days').format(),
  );
  const endDateUpdate = useSelector(
    (state) => state.updateSurveyObj?.survey?.endAt || moment().add(60, 'days').format(),
  );

  const onChangeStartDate = (e) => {
    isAddSurvey ? dispatch(changeSurveyStartDate(e)) : dispatch(updateSurveyStartDate(e));

    isAddSurvey
      ? dispatch(changeValidations({ type: 'surveyDate', data: validateSurveyDates(e, endDate) }))
      : dispatch(updateValidations({ type: 'surveyDate', data: validateSurveyDates(e, endDate) }));
  };
  const onChangeEndDate = (e) => {
    isAddSurvey ? dispatch(changeSurveyEndDate(e)) : dispatch(updateSurveyEndDate(e));
    isAddSurvey
      ? dispatch(changeValidations({ type: 'surveyDate', data: validateSurveyDates(startDate, e) }))
      : dispatch(
          updateValidations({ type: 'surveyDate', data: validateSurveyDates(startDate, e) }),
        );
  };
  const startDate = isAddSurvey ? startDateAdd : startDateUpdate;
  const endDate = isAddSurvey ? endDateAdd : endDateUpdate;
  return (
    <React.Fragment>
      <div>
        <Form.Label>Start date :</Form.Label>
        <div style={datePickerStyles}>
          <MaterialDatePicker
            variant="inline"
            ampm={false}
            value={startDate}
            handleChange={onChangeStartDate}
            format={DATE_PICKER_DATE_FORMAT}
            keyboardIcon={<DateRangeIcon color="secondary" />}
          />
        </div>
        <ValidationErrorMessage error={dateError} />
      </div>
      <div>
        <Form.Label>End date :</Form.Label>
        <div style={datePickerStyles}>
          <MaterialDatePicker
            variant="inline"
            ampm={false}
            value={endDate}
            handleChange={onChangeEndDate}
            disablePast
            format={DATE_PICKER_DATE_FORMAT}
            keyboardIcon={<DateRangeIcon color="secondary" />}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

SurveyDates.propTypes = {
  isAddSurvey: PropTypes.bool,
};

export default SurveyDates;
