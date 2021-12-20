import {
  HANDLE_SUBMIT_ERRORS,
  PREPARE_RESPONSE_LIST,
  PREPARE_TEXT_RESPONSE_MAP,
  PREVIEW_SURVEY_FETCH_SURVEY,
  SET_STEP_COUNT,
  SET_STEP,
  SET_VALUE,
  SET_QUESTIONS,
  RESET_PREVIEW_SURVEY,
  SET_QUESTION_ANSWER,
  FILTER_QUESTIONS,
} from '../actions/types';

const previewInitialState = {
  step: -1,
  surveyObj: {},
  surveyId: '',
  questionObjList: [],
  allQuestions: [],
  textResponseMap: new Map(),
  responseList: [],
  checkedList: [],
  qrCodeSurveyImgUrl: '',
  stepCount: 0,
  score: 0,
  locationDisplayName: null,
  locationId: null,
  userId: null,
  isError: false,
  customErrorMsg: null,
  questionAnswers: [],
};

const previewReducer = (state = previewInitialState, action) => {
  switch (action.type) {
    case RESET_PREVIEW_SURVEY:
      return {
        step: -1,
        surveyObj: {},
        surveyId: '',
        questionObjList: [],
        allQuestions: [],
        textResponseMap: new Map(),
        responseList: [],
        checkedList: [],
        qrCodeSurveyImgUrl: '',
        stepCount: 0,
        score: 0,
        locationDisplayName: null,
        locationId: null,
        userId: null,
        isError: false,
        customErrorMsg: null,
        questionAnswers: [],
      };

    case HANDLE_SUBMIT_ERRORS:
      return { ...state, isError: action.payload };

    case PREVIEW_SURVEY_FETCH_SURVEY:
      return {
        ...state,
        surveyObj: action.payload.surveyObj,
        step: action.payload.step,
        customErrorMsg: action.payload.customErrorMsg,
      };
    case SET_STEP_COUNT:
      return { ...state, stepCount: action.payload };
    case PREPARE_RESPONSE_LIST:
      return { ...state, responseList: action.payload };
    case PREPARE_TEXT_RESPONSE_MAP:
      return { ...state, textResponseMap: action.payload };
    case SET_STEP:
      return {
        ...state,
        step: action.payload,
      };
    case SET_VALUE:
      return { ...state, score: action.payload };
    case SET_QUESTIONS:
      return { ...state, questionObjList: action.payload,allQuestions:action.payload };
    case FILTER_QUESTIONS:
      return { ...state, questionObjList: action.payload };
    case SET_QUESTION_ANSWER:
      return { ...state, questionAnswers: action.payload };
    default:
      return { ...state };
  }
};

export default previewReducer;
