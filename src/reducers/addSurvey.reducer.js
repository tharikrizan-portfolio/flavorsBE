import {
  //Survey Details and question creation  Actions
  SAVE_TITLE,
  SAVE_DESCRIPTION,
  PUBLISH_SURVEY,
  BULK_ANSWER_SUBMIT_SUCCESS,
  BULK_ANSWER_SUBMIT_ERROR,
  SET_ANSWER_LIST,
  SET_QUESTION_DEFINE_QUESTION_LIST,
  GET_BULK_ANSWER_LIST_SUCCESS,
  GET_BULK_ANSWER_LIST_ERROR,
  //configuration tab actions
  CHANGE_SURVEY_DESCRIPTION_FONT_COLOR,
  CHANGE_SURVEY_QUESTION_SCREEN_BACKGROUND_COLOR,
  CHANGE_SURVEY_TITLE_FONT_COLOR,
  CHANGE_SURVEY_BUTTON_FONT_COLOR,
  CHANGE_SURVEY_BUTTON_COLOR,
  RESET_SURVEY_CONFIGURATION_COLORS,
  CHANGE_SURVEY_END_DATE,
  CHANGE_SURVEY_START_DATE,
  RESET_SURVEY_DATES,

  //post survey actions
  CHANGE_POST_SURVEY_DESCRIPTION_TEXT,
  CHANGE_POST_SURVEY_IS_MLTIPLE_RESPONSE,
  //share tab and splash screen actions
  CHANGE_IFRAME_LENGTH,
  CHANGE_IFRAME_WIDTH,
  CHANGE_SPLASH_SCREEN_BACKGROUND_COLOR,
  CHANGE_SPLASH_SCREEN_BUTTON_FONT_COLOR,
  CHANGE_SPLASH_SCREEN_BUTTON_BACKGROUND_COLOR,
  CHANGE_SPLASH_SCREEN_BUTTON_TEXT,
  CHANGE_SPLASH_SCREEN_DESCRIPTION_TEXT,
  CHANGE_SPLASH_SCREEN_DESCRIPTION_FONT_COLOR,
  RESET_SPLASH_SCREEN_CONFIGURATION,
  CHANGE_IS_SPLASH_SCREEN,
  IS_SAVING,
  CHANGE_SURVEY_BACKGROUND_IMAGE_URL,
  CHANGE_SURVEY_BACKGROUND_IMAGE_OPACITY,
  CHANGE_SURVEY_BACKGROUND_IMAGE_FILE,
  SET_PIXEL_ID,
  CLEAR_SURVEY_DATA,
  CHANGE_VALIDATIONS,
  CREATE_FROM_TEMPLATE,
  SET_QUESTION__LIST,
  CAN_SAVE_TEMPLATE,
  ADD_CONDITIONAL_QUESTION,
} from '../actions/types';

const surveyInitialState = {
  survey: {
    surveyId: '',
    accountId: '',
    title: '',
    type: '',
    purpose: '',
    url: '',
    isPublished: false,
    startAt: new Date(),
    endAt: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000),
    metadata: {
      pixelId: '',
    },
    orgId: '',
    isEnableSplashScr: false,
    colorSchema: {
      splash_scr: '#ffffff',
      title_font: '#1E94A5',
      question_scr: '#ffffff',
      subtitle_font: '#6E80AE',
      button: '#1E94A5',
      button_font: '#ffffff',
    },
    configurationData: {
      surveyBackgroundImageUrl: '',
      surveyBackgroundImageOpacity: '',
    },
    canSaveTemplate: false,
    postSubmissionData: {
      description: '<p>Thank you for the response !<p>',
      isMultipleResponse: false,
    },
    sharingData: {
      iframeLength: 350,
      iframeWidth: 250,
      descriptionFontColor: '#fff',
      buttonFontColor: '#fff',
      buttonBgColor: '#000000',
      descriptionText: '',
      buttonText: 'Start',
    },
  },
  questions: {
    answersList: ['Sample answer'],
    answerListObj: {},
    questionList: [],
    bulkAnswerList: [],
  },
  surveyBackgroundImageFile: { url: '', fileName: '' },
  isSaveInProgress: false,
  conditionalQuestionList: [],
  errorState: {
    title: { isError: false, errorMsg: null },
    description: { isError: false, errorMsg: null },
    questionTitle: { isError: false, errorMsg: null },
    startAt: { isError: false, errorMsg: null },
    endAt: { isError: false, errorMsg: null },
    numberOfQuestions: { isError: false, errorMsg: null },
  },
};

const addSurveyReducer = (state = surveyInitialState, action) => {
  switch (action.type) {
    //Survey details and adding questions resucers
    case SAVE_TITLE:
      return { ...state, survey: { ...state.survey, ...action.payload } };
    case CAN_SAVE_TEMPLATE:
      return { ...state, survey: { ...state.survey, canSaveTemplate: action.payload } };
    case PUBLISH_SURVEY:
      return {
        ...state,
        survey: { ...state.survey, isPublished: action.payload },
      };
    case SAVE_DESCRIPTION:
      return { ...state, survey: { ...state.survey, ...action.payload } };
    case BULK_ANSWER_SUBMIT_SUCCESS:
      return {
        ...state,
        questions: { ...state.questions, answerListObj: action.payload },
      };
    case BULK_ANSWER_SUBMIT_ERROR:
      return {
        ...state,
        questions: { ...state.questions, error: action.payload },
      };
    case SET_ANSWER_LIST:
      return {
        ...state,
        questions: { ...state.questions, answersList: [...action.payload] },
      };
    case SET_QUESTION_DEFINE_QUESTION_LIST:
      return {
        ...state,
        questions: { ...state.questions, questionList: [...action.payload] },
      };
    case GET_BULK_ANSWER_LIST_SUCCESS:
      return {
        ...state,
        questions: { ...state.questions, bulkAnswerList: [...action.payload] },
      };
    case GET_BULK_ANSWER_LIST_ERROR:
      return {
        ...state,
        questions: { ...state.questions, error: action.payload },
      };
    //configuration tab reducers

    case CHANGE_SURVEY_BACKGROUND_IMAGE_FILE:
      return {
        ...state,
        surveyBackgroundImageFile: action.payload,
      };
    case RESET_SURVEY_CONFIGURATION_COLORS:
      return {
        ...state,
        survey: {
          ...state.survey,
          colorSchema: {
            ...state.survey.colorSchema,
            title_font: '#1E94A5',
            question_scr: '#ffffff',
            subtitle_font: '#6E80AE',
            button: '#1E94A5',
            button_font: '#ffffff',
          },
        },
      };
    case CHANGE_SURVEY_QUESTION_SCREEN_BACKGROUND_COLOR:
      return {
        ...state,
        survey: {
          ...state.survey,
          colorSchema: {
            ...state.survey.colorSchema,
            question_scr: action.payload,
          },
        },
      };
    case CHANGE_SURVEY_DESCRIPTION_FONT_COLOR:
      return {
        ...state,
        survey: {
          ...state.survey,
          colorSchema: {
            ...state.survey.colorSchema,
            subtitle_font: action.payload,
          },
        },
      };
    case CHANGE_SURVEY_TITLE_FONT_COLOR:
      return {
        ...state,
        survey: {
          ...state.survey,
          colorSchema: {
            ...state.survey.colorSchema,
            title_font: action.payload,
          },
        },
      };
    case CHANGE_SURVEY_BUTTON_FONT_COLOR:
      return {
        ...state,
        survey: {
          ...state.survey,
          colorSchema: {
            ...state.survey.colorSchema,
            button_font: action.payload,
          },
        },
      };
    case CHANGE_SURVEY_BUTTON_COLOR:
      return {
        ...state,
        survey: {
          ...state.survey,
          colorSchema: {
            ...state.survey.colorSchema,
            button: action.payload,
          },
        },
      };
    case CHANGE_SURVEY_BACKGROUND_IMAGE_URL:
      return {
        ...state,
        survey: {
          ...state.survey,
          configurationData: {
            ...state.survey.configurationData,
            surveyBackgroundImageUrl: action.payload.url,
            fileName: action.payload.fileName,
          },
        },
      };

    case CHANGE_SURVEY_BACKGROUND_IMAGE_OPACITY:
      return {
        ...state,
        survey: {
          ...state.survey,
          configurationData: {
            ...state.survey.configurationData,
            surveyBackgroundImageOpacity: action.payload,
          },
        },
      };
    //post survey tab reducers
    case CHANGE_POST_SURVEY_DESCRIPTION_TEXT:
      return {
        ...state,
        survey: {
          ...state.survey,
          postSubmissionData: {
            ...state.survey.postSubmissionData,
            description: action.payload,
          },
        },
      };
    case CHANGE_POST_SURVEY_IS_MLTIPLE_RESPONSE:
      return {
        ...state,
        survey: {
          ...state.survey,
          postSubmissionData: {
            ...state.survey.postSubmissionData,
            isMultipleResponse: !state.survey.postSubmissionData.isMultipleResponse,
          },
        },
      };
    //Share survey tab reducers and splash screen reducers and dates
    case CHANGE_IFRAME_LENGTH:
      return {
        ...state,
        survey: {
          ...state.survey,
          sharingData: {
            ...state.survey.sharingData,
            iframeLength: action.payload,
          },
        },
      };

    case CHANGE_IFRAME_WIDTH:
      return {
        ...state,
        survey: {
          ...state.survey,
          sharingData: {
            ...state.survey.sharingData,
            iframeWidth: action.payload,
          },
        },
      };
    case CHANGE_IS_SPLASH_SCREEN:
      return {
        ...state,
        survey: {
          ...state.survey,
          isEnableSplashScr: !state.survey.isEnableSplashScr,
        },
      };
    case RESET_SPLASH_SCREEN_CONFIGURATION:
      return {
        ...state,
        survey: {
          ...state.survey,
          colorSchema: {
            ...state.survey.colorSchema,
            splash_scr: '#000000',
          },
          sharingData: {
            ...state.survey.sharingData,
            descriptionFontColor: '#fff',
            buttonFontColor: '#fff',
            buttonBgColor: '#000000',
            descriptionText: '<p>Start Survey !</p>',
            buttonText: 'Start',
          },
        },
      };
    case CLEAR_SURVEY_DATA:
      return {
        ...state,
        survey: {
          ...state.survey,
          surveyId: '',
          accountId: '',
          title: '',
          type: '',
          purpose: '',
          url: '',
          isPublished: false,
          startAt: new Date(),
          endAt: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000),
          metadata: {
            pixelId: '',
          },
          orgId: '',
          isEnableSplashScr: false,
          colorSchema: {
            splash_scr: '#000000',
            title_font: '#1E94A5',
            question_scr: '#ffffff',
            subtitle_font: '#6E80AE',
            button: '#1E94A5',
            button_font: '#ffffff',
          },
          configurationData: {
            surveyBackgroundImageUrl: '',
            surveyBackgroundImageOpacity: '',
          },
          canSaveTemplate: false,
          postSubmissionData: {
            description: '<p>Thank you for the response !<p>',
            isMultipleResponse: false,
          },
          sharingData: {
            iframeLength: 350,
            iframeWidth: 250,
            descriptionFontColor: '#fff',
            buttonFontColor: '#fff',
            buttonBgColor: '#000000',
            descriptionText: '',
            buttonText: 'Start',
          },
        },
        conditionalQuestionList: [],
        errorState: {
          title: { isError: false, errorMsg: null },
          description: { isError: false, errorMsg: null },
          questionTitle: { isError: false, errorMsg: null },
          startAt: { isError: false, errorMsg: null },
          endAt: { isError: false, errorMsg: null },
          numberOfQuestions: { isError: false, errorMsg: null },
        },
      };
    case CHANGE_SPLASH_SCREEN_BACKGROUND_COLOR:
      return {
        ...state,
        survey: {
          ...state.survey,
          colorSchema: {
            ...state.survey.colorSchema,
            splash_scr: action.payload,
          },
        },
      };
    case CHANGE_SPLASH_SCREEN_BUTTON_BACKGROUND_COLOR:
      return {
        ...state,
        survey: {
          ...state.survey,
          sharingData: {
            ...state.survey.sharingData,
            buttonBgColor: action.payload,
          },
        },
      };
    case CHANGE_SPLASH_SCREEN_BUTTON_FONT_COLOR:
      return {
        ...state,
        survey: {
          ...state.survey,
          sharingData: {
            ...state.survey.sharingData,
            buttonFontColor: action.payload,
          },
        },
      };
    case CHANGE_SPLASH_SCREEN_BUTTON_TEXT:
      return {
        ...state,
        survey: {
          ...state.survey,
          sharingData: {
            ...state.survey.sharingData,
            buttonText: action.payload,
          },
        },
      };
    case CHANGE_SPLASH_SCREEN_DESCRIPTION_FONT_COLOR:
      return {
        ...state,
        survey: {
          ...state.survey,
          sharingData: {
            ...state.survey.sharingData,
            descriptionFontColor: action.payload,
          },
        },
      };

    case CHANGE_SPLASH_SCREEN_DESCRIPTION_TEXT:
      return {
        ...state,
        survey: {
          ...state.survey,
          sharingData: {
            ...state.survey.sharingData,
            descriptionText: action.payload,
          },
        },
      };
    case CHANGE_SURVEY_START_DATE:
      return {
        ...state,
        survey: {
          ...state.survey,
          startAt: action.payload,
        },
      };
    case CHANGE_SURVEY_END_DATE:
      return {
        ...state,
        survey: {
          ...state.survey,
          endAt: action.payload,
        },
      };
    case IS_SAVING:
      return {
        ...state,
        isSaveInProgress: action.payload,
      };

    case SET_PIXEL_ID:
      return {
        ...state,
        survey: {
          ...state.survey,
          metadata: {
            ...state.survey.metadata,
            pixelId: action.payload,
          },
        },
      };

    //validation
    case CHANGE_VALIDATIONS:
      return {
        ...state,
        errorState: {
          ...state.errorState,
          [action.payload.type]: action.payload.data,
        },
      };
    // create new survey or quiz from template
    case CREATE_FROM_TEMPLATE:
      return { ...state, survey: action.payload };
    case SET_QUESTION__LIST:
      return {
        ...state,
        questions: { ...state.questions, questionList: [...action.payload] },
      };
    case ADD_CONDITIONAL_QUESTION:
      return {
        ...state,
        conditionalQuestionList: [...action.payload],
      };
    default:
      return state;
  }
};

export default addSurveyReducer;
