import {
  CHANGE_SURVEY_DESCRIPTION_FONT_COLOR,
  CHANGE_SURVEY_TITLE_FONT_COLOR,
  CHANGE_SURVEY_QUESTION_SCREEN_BACKGROUND_COLOR,
  CHANGE_SURVEY_BUTTON_COLOR,
  CHANGE_SURVEY_BUTTON_FONT_COLOR,
  UPDATE_SURVEY_DESCRIPTION_FONT_COLOR,
  UPDATE_SURVEY_TITLE_FONT_COLOR,
  UPDATE_SURVEY_QUESTION_SCREEN_BACKGROUND_COLOR,
  UPDATE_SURVEY_BUTTON_COLOR,
  UPDATE_SURVEY_BUTTON_FONT_COLOR,
  RESET_SURVEY_CONFIGURATION_COLORS,
  CHANGE_SURVEY_START_DATE,
  RESET_SURVEY_DATES,
  CHANGE_SURVEY_END_DATE,
  UPDATE_SURVEY_END_DATE,
  UPDATE_SURVEY_START_DATE,
  UPDATE_RESET_SURVEY_CONFIGURATION_COLORS,
  GET_SURVEY_THEMES,
  GET_SURVEY_THEMES_SUCCESS,
  GET_SURVEY_THEMES_ERROR,
  CREATE_SURVEY_THEMES_LOADING_STATUS,
  CHANGE_SURVEY_BACKGROUND_IMAGE_OPACITY,
  UPDATE_SURVEY_BACKGROUND_IMAGE_OPACITY,
  UPDATE_PIXEL_ID,
  UPDATE_SURVEY_BACKGROUND_IMAGE_URL,
  CHANGE_SURVEY_BACKGROUND_IMAGE_URL,
  CHANGE_SURVEY_BACKGROUND_IMAGE_FILE,
  UPDATE_SURVEY_BACKGROUND_IMAGE_FILE,
  SET_PIXEL_ID,
} from "./types";

import axios from "axios";
import {
  BCONIC_SURVEY_URI,
  ADMIN_ENDPOINT,
  ROUTE_SURVEY_THEMES,
} from "../store/constant.js";
import { toast } from "react-toastify";

export const changeSurveyQuestionScrBgColor = (data) => {
  return {
    type: CHANGE_SURVEY_QUESTION_SCREEN_BACKGROUND_COLOR,
    payload: data,
  };
};
export const changeSurveyTitleFontColor = (data) => {
  return {
    type: CHANGE_SURVEY_TITLE_FONT_COLOR,
    payload: data,
  };
};
export const changeSurveyDescriptionFontColor = (data) => {
  return {
    type: CHANGE_SURVEY_DESCRIPTION_FONT_COLOR,
    payload: data,
  };
};
export const changeSurveyButtonFontColor = (data) => {
  return {
    type: CHANGE_SURVEY_BUTTON_FONT_COLOR,
    payload: data,
  };
};
export const changeSurveyButtonColor = (data) => {
  return {
    type: CHANGE_SURVEY_BUTTON_COLOR,
    payload: data,
  };
};

export const resetSurveyConfigurationColors = () => {
  return {
    type: RESET_SURVEY_CONFIGURATION_COLORS,
  };
};

export const changeSurveyStartDate = (data) => {
  return {
    type: CHANGE_SURVEY_START_DATE,
    payload: data,
  };
};
export const changeSurveyEndDate = (data) => {
  return {
    type: CHANGE_SURVEY_END_DATE,
    payload: data,
  };
};
export const resetSurveyDates = (data) => {
  return {
    type: RESET_SURVEY_DATES,
    payload: data,
  };
};
export const changeSurveyBackgroundImageUrl = (data) => {
  return {
    type: CHANGE_SURVEY_BACKGROUND_IMAGE_URL,
    payload: data,
  };
};
export const changeSurveyBackgroundImageFile = (data) => {
  return {
    type: CHANGE_SURVEY_BACKGROUND_IMAGE_FILE,
    payload: data,
  };
};

export const changeSurveyBackgroundImageOpacity = (data) => {
  return {
    type: CHANGE_SURVEY_BACKGROUND_IMAGE_OPACITY,
    payload: data,
  };
};

export const setPixelId = (data) => {
  return {
    type: SET_PIXEL_ID,
    payload: data,
  };
};

export const changeTheme = (data) => {
  return (dispatch) => {
    const {
      buttonFontColor,
      buttonColor,
      descriptionFontColor,
      titleFontColor,
      questionScrBgColor,
    } = data;
    dispatch(changeSurveyButtonColor(buttonColor));
    dispatch(changeSurveyButtonFontColor(buttonFontColor));
    dispatch(changeSurveyDescriptionFontColor(descriptionFontColor));
    dispatch(changeSurveyTitleFontColor(titleFontColor));
    dispatch(changeSurveyQuestionScrBgColor(questionScrBgColor));
  };
};
//update

export const updateSurveyQuestionScrBgColor = (data) => {
  return {
    type: UPDATE_SURVEY_QUESTION_SCREEN_BACKGROUND_COLOR,
    payload: data,
  };
};
export const updateSurveyTitleFontColor = (data) => {
  return {
    type: UPDATE_SURVEY_TITLE_FONT_COLOR,
    payload: data,
  };
};
export const updateSurveyDescriptionFontColor = (data) => {
  return {
    type: UPDATE_SURVEY_DESCRIPTION_FONT_COLOR,
    payload: data,
  };
};

export const updateSurveyButtonFontColor = (data) => {
  return {
    type: UPDATE_SURVEY_BUTTON_FONT_COLOR,
    payload: data,
  };
};
export const updateSurveyButtonColor = (data) => {
  return {
    type: UPDATE_SURVEY_BUTTON_COLOR,
    payload: data,
  };
};

export const updateSurveyStartDate = (data) => {
  return {
    type: UPDATE_SURVEY_START_DATE,
    payload: data,
  };
};
export const updateSurveyEndDate = (data) => {
  return {
    type: UPDATE_SURVEY_END_DATE,
    payload: data,
  };
};
export const updateSurveyBackgroundImageUrl = (data) => {
  return {
    type: UPDATE_SURVEY_BACKGROUND_IMAGE_URL,
    payload: data,
  };
};
export const updateSurveyBackgroundImageFile = (data) => {
  return {
    type: UPDATE_SURVEY_BACKGROUND_IMAGE_FILE,
    payload: data,
  };
};

export const updateSurveyBackgroundImageOpacity = (data) => {
  return {
    type: UPDATE_SURVEY_BACKGROUND_IMAGE_OPACITY,
    payload: data,
  };
};

export const updatePixelId = (data) => {
  return {
    type: UPDATE_PIXEL_ID,
    payload: data,
  };
};

export const UpdateResetSurveyConfigurationColors = () => {
  return {
    type: UPDATE_RESET_SURVEY_CONFIGURATION_COLORS,
  };
};

export const updateTheme = (data) => {
  return (dispatch) => {
    const {
      buttonFontColor,
      buttonColor,
      descriptionFontColor,
      titleFontColor,
      questionScrBgColor,
    } = data;
    dispatch(updateSurveyButtonColor(buttonColor));
    dispatch(updateSurveyButtonFontColor(buttonFontColor));
    dispatch(updateSurveyDescriptionFontColor(descriptionFontColor));
    dispatch(updateSurveyTitleFontColor(titleFontColor));
    dispatch(updateSurveyQuestionScrBgColor(questionScrBgColor));
  };
};

// fetching themes

export const getSurveyThemes = () => {
  return {
    type: GET_SURVEY_THEMES,
  };
};
export const getSurveyThemesSuccess = (data) => {
  return {
    type: GET_SURVEY_THEMES_SUCCESS,
    payload: data,
  };
};
export const getSurveyThemesError = (data) => {
  return {
    type: GET_SURVEY_THEMES_ERROR,
    payload: data,
  };
};

export const getThemes = (header) => {
  return (dispatch) => {
    dispatch(getSurveyThemes());
    return axios
      .get(`${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${ROUTE_SURVEY_THEMES}/`, {
        headers: header,
      })
      .then((response) => {
        dispatch(getSurveyThemesSuccess(response.data.data || []));
      })
      .catch((error) => {
        let message = "Error in getting Themes";
        dispatch(getSurveyThemesError(message));
        toast.error(message, {
          position: "top-right",
        });
        return;
      });
  };
};

const setSaveThemeLoadingStatus = (data) => {
  return {
    type: CREATE_SURVEY_THEMES_LOADING_STATUS,
    payload: data,
  };
};

export const saveNewTheme = (header, themeObject) => {
  return (dispatch) => {
    dispatch(setSaveThemeLoadingStatus(true));
    return axios
      .post(
        `${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${ROUTE_SURVEY_THEMES}/`,
        themeObject,
        {
          headers: header,
        }
      )
      .then((response) => {
        //--- if all goes well, retrieve the new themes
        dispatch(getThemes(header));
        //--- success message
        toast.success("Theme saved successfully", {
          position: "top-center",
        });
        //--- set the lading status
        dispatch(setSaveThemeLoadingStatus(false));
      })
      .catch((error) => {
        toast.error("Error in getting Themes", {
          position: "top-center",
        });
        //--- set the lading status
        dispatch(setSaveThemeLoadingStatus(false));
      });
  };
};
