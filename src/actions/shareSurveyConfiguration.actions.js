import {
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
  UPDATE_IFRAME_LENGTH,
  UPDATE_IFRAME_WIDTH,
  UPDATE_SPLASH_SCREEN_BACKGROUND_COLOR,
  UPDATE_SPLASH_SCREEN_BUTTON_FONT_COLOR,
  UPDATE_SPLASH_SCREEN_BUTTON_BACKGROUND_COLOR,
  UPDATE_SPLASH_SCREEN_BUTTON_TEXT,
  UPDATE_SPLASH_SCREEN_DESCRIPTION_TEXT,
  UPDATE_SPLASH_SCREEN_DESCRIPTION_FONT_COLOR,
  UPDATE_RESET_SPLASH_SCREEN_CONFIGURATION,
  UPDATE_IS_SPLASH_SCREEN,
} from "./types";

export const changeSplashScrBgColor = (data) => {
  return {
    type: CHANGE_SPLASH_SCREEN_BACKGROUND_COLOR,
    payload: data,
  };
};
export const changeSplashScrButtonFontColor = (data) => {
  return {
    type: CHANGE_SPLASH_SCREEN_BUTTON_FONT_COLOR,
    payload: data,
  };
};
export const changeSplashScrButtonBgColor = (data) => {
  return {
    type: CHANGE_SPLASH_SCREEN_BUTTON_BACKGROUND_COLOR,
    payload: data,
  };
};
export const changeIFrameLength = (data) => {
  return {
    type: CHANGE_IFRAME_LENGTH,
    payload: data,
  };
};
export const changeIFrameWidth = (data) => {
  return {
    type: CHANGE_IFRAME_WIDTH,
    payload: data,
  };
};
export const changeSplashScrButtonText = (data) => {
  return {
    type: CHANGE_SPLASH_SCREEN_BUTTON_TEXT,
    payload: data,
  };
};
export const changeSplashScrDescriptionText = (data) => {
  return {
    type: CHANGE_SPLASH_SCREEN_DESCRIPTION_TEXT,
    payload: data,
  };
};
export const changeSplashScrDescriptionFontColor = (data) => {
  return {
    type: CHANGE_SPLASH_SCREEN_DESCRIPTION_FONT_COLOR,
    payload: data,
  };
};
export const changeIsSplashScreen = () => {
  return {
    type: CHANGE_IS_SPLASH_SCREEN,
  };
};
export const resetSplashScrConfig = () => {
  return {
    type: RESET_SPLASH_SCREEN_CONFIGURATION,
  };
};
//UPDATE
export const updateSplashScrBgColor = (data) => {
  return {
    type: UPDATE_SPLASH_SCREEN_BACKGROUND_COLOR,
    payload: data,
  };
};
export const updateSplashScrButtonFontColor = (data) => {
  return {
    type: UPDATE_SPLASH_SCREEN_BUTTON_FONT_COLOR,
    payload: data,
  };
};
export const updateSplashScrButtonBgColor = (data) => {
  return {
    type: UPDATE_SPLASH_SCREEN_BUTTON_BACKGROUND_COLOR,
    payload: data,
  };
};
export const updateIFrameLength = (data) => {
  return {
    type: UPDATE_IFRAME_LENGTH,
    payload: data,
  };
};
export const updateIFrameWidth = (data) => {
  return {
    type: UPDATE_IFRAME_WIDTH,
    payload: data,
  };
};
export const updateSplashScrButtonText = (data) => {
  return {
    type: UPDATE_SPLASH_SCREEN_BUTTON_TEXT,
    payload: data,
  };
};
export const updateSplashScrDescriptionText = (data) => {
  return {
    type: UPDATE_SPLASH_SCREEN_DESCRIPTION_TEXT,
    payload: data,
  };
};
export const updateSplashScrDescriptionFontColor = (data) => {
  return {
    type: UPDATE_SPLASH_SCREEN_DESCRIPTION_FONT_COLOR,
    payload: data,
  };
};
export const updateIsSplashScreen = () => {
  return {
    type: UPDATE_IS_SPLASH_SCREEN,
  };
};
export const updateResetSplashScrConfig = () => {
  return {
    type: UPDATE_RESET_SPLASH_SCREEN_CONFIGURATION,
  };
};
