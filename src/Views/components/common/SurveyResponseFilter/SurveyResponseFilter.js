import React, { useEffect, useState, memo } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import FormTextInput from "../Inputs/FormTextInput";
import { Grid } from "@material-ui/core";
import MaterialButton from "../Buttons/MaterialButton";
import BrootStrapDropdown from "../DropDown/BrootStrapDropdown";
import MaterialDatePicker from "../DatePicker/MaterialDatePicker";
import {
  updateFilteredSurveyList,
  updateSurveyFilterParameters,
} from "./../../../../actions/survey.actions";
import { useSelector, useDispatch } from "react-redux";
import {
  DATE_AND_TIME_FORMAT,
  DATE_PICKER_DATE_FORMAT,
} from "./../../../../store/constant";
import enumUtil from "../../../../util/enumerations";
import { filterSurveyResponse } from "../../../../helper/surveyOverviewHelper";

const SurveyResponseFilter = ({}) => {
  const dispatch = useDispatch();

  //Redux Data
  const searchParametes = useSelector(
    (state) => state.surveyData?.surveyFilterParameters || {}
  );
  const filteredSurveyList = useSelector(
    (state) => state.surveyData?.filteredSurveyList || false
  );
  const surveys = useSelector((state) => state.surveyData?.surveys || []);

  useEffect(() => {
    if (!Boolean(filteredSurveyList.length))
      dispatch(updateFilteredSurveyList([...surveys]));
  }, []);

  const handleChange = (e, id) => {
    dispatch(
      updateSurveyFilterParameters({
        ...searchParametes,
        [id]: id === "startDate" || id === "endDate" ? e : e.target.value,
      })
    );
  };

  const handleSearch = () => {
    dispatch(
      updateFilteredSurveyList(filterSurveyResponse(surveys, searchParametes))
    );
  };
  return (
    <div>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12} lg={3} xl={3}>
          <FormTextInput
            label="Survey Title"
            type="text"
            id="surveyTitle"
            value={searchParametes.surveyTitle || ""}
            handleChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={2} xl={2}>
          <BrootStrapDropdown
            label="Filter by Date"
            options={[
              {
                label: "None",
                value: "none",
              },
              {
                label: "Start Date",
                value: "startAt",
              },
              {
                label: "End Date",
                value: "endAt",
              },
            ]}
            id="filterDate"
            value={searchParametes.filterDate || "none"}
            handleSelect={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={2} xl={2}>
          <div className="survey-filter-date-picker">
            <MaterialDatePicker
              label="Start Date"
              id="startDate"
              value={
                searchParametes.startDate ||
                moment().format(DATE_AND_TIME_FORMAT)
              }
              handleChange={handleChange}
              format={DATE_PICKER_DATE_FORMAT}
              variant="inline"
              disableToolbar={true}
              disabled={
                searchParametes.filterDate === "none" ||
                !searchParametes.filterDate
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={2} xl={2}>
          <div className="survey-filter-date-picker">
            <MaterialDatePicker
              label="End Date"
              id="endDate"
              value={
                searchParametes.endDate || moment().format(DATE_AND_TIME_FORMAT)
              }
              handleChange={handleChange}
              format={DATE_PICKER_DATE_FORMAT}
              variant="inline"
              disableToolbar={true}
              disabled={
                searchParametes.filterDate === "none" ||
                !searchParametes.filterDate
              }
            />
          </div>
        </Grid>
        <Grid item xs={12} md={12} lg={3} xl={3}>
          <BrootStrapDropdown
            label="Published"
            options={[
              {
                label: "Publised",
                value: enumUtil.surveyPublishStatus.PUBLISHED,
              },
              {
                label: "Unpublished",
                value: enumUtil.surveyPublishStatus.UNPUBLISHED,
              },
              {
                label: "All",
                value: enumUtil.surveyPublishStatus.ALL,
              },
            ]}
            id="published"
            value={searchParametes.published || ""}
            handleSelect={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <MaterialButton
            color="primary"
            handleClick={handleSearch}
            label={"Search"}
          />
        </Grid>
      </Grid>
    </div>
  );
};

SurveyResponseFilter.propTypes = {};

export default memo(SurveyResponseFilter);
