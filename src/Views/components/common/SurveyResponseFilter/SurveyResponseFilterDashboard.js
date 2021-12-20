import React, { useEffect, memo } from 'react';
import FormTextInput from '../Inputs/FormTextInput';
import {
  updateFilteredSurveyList,
  updateSurveyFilterParameters,
} from './../../../../actions/survey.actions';
import { useSelector, useDispatch } from 'react-redux';
import { filterSurveyResponseUsingTitle } from '../../../../helper/surveyOverviewHelper';

const SurveyResponseFilterDashboard = ({}) => {
  const dispatch = useDispatch();
  //Redux Data
  const searchParametes = useSelector((state) => state.surveyData?.surveyFilterParameters || {});
  const filteredSurveyList = useSelector((state) => state.surveyData?.filteredSurveyList || false);
  const surveys = useSelector((state) => state.surveyData?.surveyListForTable?.data || []);
  useEffect(() => {
    if (!Boolean(filteredSurveyList.length)) {
      dispatch(updateFilteredSurveyList([...surveys]));
      updateFilteredSurveyList(
        filterSurveyResponseUsingTitle(surveys, searchParametes.surveyTitle),
      );
    }
  }, []);

  useEffect(() => {
    dispatch(
      updateFilteredSurveyList(
        filterSurveyResponseUsingTitle([...surveys], searchParametes.surveyTitle),
      ),
    );
  }, [surveys]);

  const handleChange = (e, id) => {
    dispatch(
      updateSurveyFilterParameters({
        ...searchParametes,
        [id]: id === 'startDate' || id === 'endDate' ? e : e.target.value,
      }),
    );
    dispatch(updateFilteredSurveyList(filterSurveyResponseUsingTitle(surveys, e.target.value)));
  };

  return (
    <div style={{ width: '20%' }}>
      <FormTextInput
        type="text"
        placeholder="Search"
        id="surveyTitle"
        value={searchParametes.surveyTitle || ''}
        handleChange={handleChange}
      />
    </div>
  );
};

export default memo(SurveyResponseFilterDashboard);
