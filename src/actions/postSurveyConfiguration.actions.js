import {
  CHANGE_POST_SURVEY_DESCRIPTION_TEXT,
  CHANGE_POST_SURVEY_IS_MLTIPLE_RESPONSE,
  UPDATE_POST_SURVEY_DESCRIPTION_TEXT,
  UPDATE_POST_SURVEY_IS_MLTIPLE_RESPONSE,
} from "./types";

export const changePostSurveyDescription = (data) => {
  return {
    type: CHANGE_POST_SURVEY_DESCRIPTION_TEXT,
    payload: data,
  };
};
export const changePostSurveyMultipleResponse = () => {
  return {
    type: CHANGE_POST_SURVEY_IS_MLTIPLE_RESPONSE,
  };
};
export const updatePostSurveyDescription = (data) => {
  return {
    type: UPDATE_POST_SURVEY_DESCRIPTION_TEXT,
    payload: data,
  };
};
export const updatePostSurveyMultipleResponse = () => {
  return {
    type: UPDATE_POST_SURVEY_IS_MLTIPLE_RESPONSE,
  };
};
