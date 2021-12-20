import {
  VIEW_SURVEY,
  UPDATE_SURVEY_END_DATE,
  UPDATE_SURVEY_START_DATE,
  UPDATE_SURVEY_DESCRIPTION_FONT_COLOR,
  UPDATE_SURVEY_TITLE_FONT_COLOR,
  UPDATE_SURVEY_QUESTION_SCREEN_BACKGROUND_COLOR,
  UPDATE_SURVEY_BUTTON_COLOR,
  UPDATE_SURVEY_BUTTON_FONT_COLOR,
  UPDATE_SURVEY,
  UPDATE_SURVEY_TITLE,
  UPDATE_SURVEY_DESCRIPTION,
  UPDATE_RESET_SURVEY_CONFIGURATION_COLORS,
  UPDATE_IFRAME_LENGTH,
  UPDATE_IFRAME_WIDTH,
  UPDATE_IS_SPLASH_SCREEN,
  UPDATE_POST_SURVEY_DESCRIPTION_TEXT,
  UPDATE_POST_SURVEY_IS_MLTIPLE_RESPONSE,
  UPDATE_RESET_SPLASH_SCREEN_CONFIGURATION,
  UPDATE_SPLASH_SCREEN_BACKGROUND_COLOR,
  UPDATE_SPLASH_SCREEN_BUTTON_BACKGROUND_COLOR,
  UPDATE_SPLASH_SCREEN_BUTTON_FONT_COLOR,
  UPDATE_SPLASH_SCREEN_BUTTON_TEXT,
  UPDATE_SPLASH_SCREEN_DESCRIPTION_FONT_COLOR,
  UPDATE_SPLASH_SCREEN_DESCRIPTION_TEXT,
  GET_SURVEY_QUESTIONS,
  GET_SURVEY_QUESTIONS_SUCCESS,
  GET_SURVEY_QUESTIONS_ERROR,
  EDIT_UPDATE_QUESTION_PAGE_QUESTIONS,
  UPDATE_PUBLISH_SURVEY,
  SET_IS_UPDATE_SHEET,
  UPDATE_SURVEY_BACKGROUND_IMAGE_URL,
  UPDATE_SURVEY_BACKGROUND_IMAGE_OPACITY,
  UPDATE_PIXEL_ID,
  UPDATE_VALIDATIONS,
  UPDATE_CONDITIONAL_QUESTION,
  GET_SURVEY_CONDITIONAL_QUESTIONS_SUCCESS,
} from '../actions/types';
import survey from '../util/survey';

const surveyInitialState = {
  survey: {
    surveyId: '',
    accountId: '',
    title: '',
    type: '',
    purpose: '',
    url: '',
    isPublished: false,
    startAt: '',
    endAt: '',
    metadata: {
      pixelId: '',
    },
    orgId: '',
    isEnableSplashScr: false,
    colorSchema: {
      splash_scr: '',
      title_font: '',
      question_scr: '',
      subtitle_font: '',
      button: '',
      button_font: '',
    },
    configurationData: {
      surveyBackgroundImageUrl: '',
      surveyBackgroundImageOpacity: '',
      fileName: '',
    },

    postSubmissionData: {
      description: '',
      isMultipleResponse: '',
    },
    sharingData: {
      iframeLength: 350,
      iframeWidth: 250,
      descriptionFontColor: '',
      buttonFontColor: '',
      buttonBgColor: '',
      descriptionText: '',
      buttonText: '',
    },
    updateSheet: {
      questionTitleChanged: false,
      questionSequenceChanged: false,
    },
  },
  conditionalQuestionList: [],
};

const updateSurveyReducer = (state = surveyInitialState, action) => {
  switch (action.type) {
    case VIEW_SURVEY:
      return { ...state, survey: action.payload };
    case UPDATE_SURVEY_QUESTION_SCREEN_BACKGROUND_COLOR:
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
    case UPDATE_SURVEY_DESCRIPTION_FONT_COLOR:
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
    case UPDATE_SURVEY_TITLE_FONT_COLOR:
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
    case UPDATE_SPLASH_SCREEN_BACKGROUND_COLOR:
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
    case UPDATE_SURVEY_START_DATE:
      return {
        ...state,
        survey: {
          ...state.survey,
          startAt: action.payload,
        },
      };
    case UPDATE_SURVEY_END_DATE:
      return {
        ...state,
        survey: {
          ...state.survey,
          endAt: action.payload,
        },
      };
    case UPDATE_SURVEY_TITLE:
      return { ...state, survey: { ...state.survey, ...action.payload } };
    case UPDATE_PUBLISH_SURVEY:
      return {
        ...state,
        survey: { ...state.survey, isPublished: action.payload },
      };
    case UPDATE_SURVEY_DESCRIPTION:
      return { ...state, survey: { ...state.survey, ...action.payload } };
    case UPDATE_IFRAME_LENGTH:
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

    case UPDATE_IFRAME_WIDTH:
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
    case UPDATE_IS_SPLASH_SCREEN:
      return {
        ...state,
        survey: {
          ...state.survey,
          isEnableSplashScr: !state.survey.isEnableSplashScr,
        },
      };
    case UPDATE_POST_SURVEY_DESCRIPTION_TEXT:
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
    case UPDATE_POST_SURVEY_IS_MLTIPLE_RESPONSE:
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

    case UPDATE_RESET_SURVEY_CONFIGURATION_COLORS:
      return {
        ...state,
        survey: {
          ...state.survey,
          colorSchema: {
            ...state.survey.colorSchema,
            title_font: '#fff',
            question_scr: '#000000',
            subtitle_font: '#fff',
            button: '#fff',
            button_font: '#000000',
          },
        },
      };
    case UPDATE_RESET_SPLASH_SCREEN_CONFIGURATION:
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
    case UPDATE_SPLASH_SCREEN_BUTTON_BACKGROUND_COLOR:
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
    case UPDATE_SPLASH_SCREEN_BUTTON_FONT_COLOR:
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
    case UPDATE_SPLASH_SCREEN_BUTTON_TEXT:
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
    case UPDATE_SPLASH_SCREEN_DESCRIPTION_FONT_COLOR:
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
    case UPDATE_SPLASH_SCREEN_DESCRIPTION_TEXT:
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

    case GET_SURVEY_QUESTIONS:
      return {
        ...state,
        surveyQuestions: {
          fetching: true,
        },
      };
    case GET_SURVEY_QUESTIONS_SUCCESS:
      return {
        ...state,
        surveyQuestions: {
          fetching: false,
          data: action.payload,
          error: [],
        },
      };
    case GET_SURVEY_QUESTIONS_ERROR:
      return {
        ...state,
        surveyQuestions: {
          fetching: false,
          data: [],
          error: action.payload,
        },
      };

    case UPDATE_SURVEY_BUTTON_FONT_COLOR:
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
    case UPDATE_SURVEY_BUTTON_COLOR:
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
    case EDIT_UPDATE_QUESTION_PAGE_QUESTIONS:
      return {
        ...state,
        surveyQuestions: {
          fetching: false,
          data: action.payload,
          error: [],
        },
      };
    case SET_IS_UPDATE_SHEET:
      return {
        ...state,
        survey: {
          ...state.survey,
          updateSheet: {
            ...state.survey.updateSheet,
            ...action.payload,
          },
        },
      };

    case UPDATE_SURVEY_BACKGROUND_IMAGE_URL:
      let { url, fileName } = action.payload;
      return {
        ...state,
        survey: {
          ...state.survey,
          configurationData: {
            ...state.survey.configurationData,
            surveyBackgroundImageUrl: url,
            fileName: fileName,
          },
        },
      };
    case UPDATE_SURVEY_BACKGROUND_IMAGE_OPACITY:
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

    case UPDATE_PIXEL_ID:
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
    case UPDATE_VALIDATIONS:
      return {
        ...state,
        errorState: {
          ...state.errorState,
          [action.payload.type]: action.payload.data,
        },
      };
    case UPDATE_CONDITIONAL_QUESTION:
      return {
        ...state,
        conditionalQuestionList: [...action.payload],
      };
    case GET_SURVEY_CONDITIONAL_QUESTIONS_SUCCESS:
      return {
        ...state,
        conditionalQuestionList: [...action.payload],
      };

    default:
      return state;
  }
};

export default updateSurveyReducer;
