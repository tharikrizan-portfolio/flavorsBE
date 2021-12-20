import moment from "moment";
import { DATE_AND_TIME_FORMAT } from "./../store/constant";
import {
  GET_SURVEY_LIST_SUCCESS,
  GET_SURVEY_LIST_ERROR,
  GET_SURVEY_RESPONSES_SUCCESS,
  GET_SURVEY_RESPONSES_ERROR,
  CHANGE_PUBLISH_STATUS_SUCCESS,
  CHANGE_PUBLISH_STATUS_ERROR,
  DELETE_SURVEY_SUCCESS,
  DELETE_SURVEY_ERROR,
  GET_SURVEY_RESPONSES_GRAPHICAL_SUCCESS,
  GET_SURVEY_RESPONSES_GRAPHICAL_ERROR,
  SAVE_TITLE,
  SAVE_DESCRIPTION,
  SAVE_SURVEY,
  CLEAR_SURVEY,
  SAVE_SURVEY_FAILURE,
  PUBLISH_SURVEY,
  GET_SURVEY_LIST_FOR_TABLE,
  GET_SURVEY_LIST_FOR_TABLE_SUCCESS,
  GET_SURVEY_LIST_FOR_TABLE_FAIL,
  UPDATE_SURVEY_FILTERS_PARAMETERS,
  FILTERED_SURVEY_RESPONSE_LIST,
  SINGLE_FILTERED_SURVEY_RESPONSE,
  GET_SURVEY_THEMES,
  GET_SURVEY_THEMES_SUCCESS,
  GET_SURVEY_THEMES_ERROR,
  CREATE_SURVEY_THEMES_LOADING_STATUS,
} from "../actions/types";

const userInitialState = {
  surveys: [],
  error: "",
  surveyPublishedObj: {},
  surveyDeleteObj: {},
  csvColumns: [],
  csvRows: [],
  csvObject: {},
  data: {},
  chartOptionList: [],
  title: "",
  description: "",
  survey: "",
  isPublished: false,
  surveyListForTable: {},
  surveyFilterParameters: {
    surveyTitle: null,
    startDate: moment().format(DATE_AND_TIME_FORMAT),
    endDate: moment().format(DATE_AND_TIME_FORMAT),
    published: false,
    filterDate: "none",
  },
  filteredSurveyList: [],
  themes: {},
};

const surveyReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case GET_SURVEY_RESPONSES_SUCCESS:
      return {
        ...state,
        csvColumns: action.payload.csvColumns,
        csvRows: action.payload.csvRows,
        data: action.payload.data,
      };
    case GET_SURVEY_RESPONSES_ERROR:
      return { ...state, error: action.payload };
    case GET_SURVEY_RESPONSES_GRAPHICAL_SUCCESS:
      return { ...state, chartOptionList: action.payload };
    case GET_SURVEY_RESPONSES_GRAPHICAL_ERROR:
      return { ...state, error: action.payload };
    case GET_SURVEY_LIST_SUCCESS:
      return { ...state, surveys: action.payload };
    case GET_SURVEY_LIST_ERROR:
      return { ...state, error: action.payload };
    case CHANGE_PUBLISH_STATUS_SUCCESS:
      return { ...state, surveyPublishedObj: action.payload };
    case CHANGE_PUBLISH_STATUS_ERROR:
      return { ...state, error: action.payload };
    case DELETE_SURVEY_SUCCESS:
      return { ...state, surveyDeleteObj: action.payload };
    case DELETE_SURVEY_ERROR:
      return { ...state, error: action.payload };
    case SAVE_TITLE:
      return { ...state, ...action.payload };
    case SAVE_DESCRIPTION:
      return { ...state, ...action.payload };
    case PUBLISH_SURVEY:
      return { ...state, isPublished: action.payload };
    case GET_SURVEY_LIST_FOR_TABLE:
      return {
        ...state,
        surveyListForTable: { data: [], fetching: true, error: "" },
      };
    case GET_SURVEY_LIST_FOR_TABLE_SUCCESS:
      return {
        ...state,
        surveyListForTable: {
          data: action.payload,
          fetching: false,
          error: "",
        },
      };
    case GET_SURVEY_LIST_FOR_TABLE_FAIL:
      return {
        ...state,
        surveyListForTable: {
          data: [],
          fetching: false,
          error: action.payload,
        },
      };
    case GET_SURVEY_THEMES:
      return {
        ...state,
        themes: { data: [], fetching: true, error: "" },
      };
    case GET_SURVEY_THEMES_SUCCESS:
      return {
        ...state,
        themes: { data: action.payload, fetching: false, error: "" },
      };
    case GET_SURVEY_THEMES_ERROR:
      return {
        ...state,
        themes: { data: [], fetching: false, error: action.payload },
      };

    case SAVE_SURVEY:
      return { ...state, survey: action.payload };
    case CLEAR_SURVEY:
      return {
        surveys: [],
        error: "",
        surveyPublishedObj: {},
        surveyDeleteObj: {},
        csvColumns: [],
        csvRows: [],
        data: {},
        chartOptionList: [],
        title: "",
        description: "",
        survey: "",
        isPublished: false,
      };
    case SAVE_SURVEY_FAILURE:
      return { ...state, error: action.payload };
    case UPDATE_SURVEY_FILTERS_PARAMETERS:
      return { ...state, surveyFilterParameters: action.payload };
    case FILTERED_SURVEY_RESPONSE_LIST:
      return { ...state, filteredSurveyList: action.payload };
    case SINGLE_FILTERED_SURVEY_RESPONSE:
      return { ...state, csvObject: action.payload };
    case CREATE_SURVEY_THEMES_LOADING_STATUS:
      return {
        ...state,
        themes: { data: [], fetching: action.payload, error: "" },
      };
    default:
      return state;
  }
};

export default surveyReducer;
