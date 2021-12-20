export const DEMO = {
  BLANK_LINK: '#!',
};

export const CLIENT_ID_HEADER_VALUE = process.env.REACT_APP_CLIENT_ID_HEADER_VALUE;
export const STATE = process.env.REACT_APP_STATE;
export const BCONIC_AUTH_URI = process.env.REACT_APP_BCONIC_AUTH_URI;
export const TRACECLAW_URI = process.env.REACT_APP_TRCAECLAW_URI;
//export const BCONIC_SURVEY_URI = process.env.REACT_APP_BCONIC_SURVEY_URI;
export const BCONIC_SURVEY_URI = process.env.REACT_APP_BCONIC_SURVEY_URI;
export const BCONIC_SURVEY_UI_URI = process.env.REACT_APP_BCONIC_SURVEY_UI_URI;
export const USER_ENDPOINT = 'user/';
export const API_ENDPOINT = 'api/';
export const AUTH_ENDPOINT = 'auth/';
export const ADMIN_ENDPOINT = 'admin/';
export const MINIMUM_RATING_BAR_RANGE = 5;
export const ACCOUNT_END_POINT = 'accounts';
export const SURVEY_END_POINT = 'surveys';
export const ROUTE_SURVEY_LIST = 'survey-list';
export const ROUTE_PROFILE_INFO = 'profile-info';
export const ROUTE_SURVEY_THEMES = 'user-themes';
export const ROUTE_BACKGROUND_IMAGE = 'background-image';
export const QUESTION_BULK_UPDATE_END_POINT = 'questions/bulk';
export const ANSWER_END_POINT = 'answers';
export const SUMMARY_END_POINT = 'summarries';
export const LOCATION_END_POINT = 'locations';
export const CHARTS_END_POINT = 'charts';
export const QUESTION_END_POINT = 'questions';
export const PREVIEW_END_POINT = 'preview';
export const TRACECLAW_USERS_END_POINT = 'users';
export const USER_API = 'api/';
export const QUESTIONANSWER_END_POINT = 'questionanswers';
export const QRCODE_END_POINT = 'qrcodes';
export const BULK_ANSWERS_END_POINT = 'bulkanswer';
export const TEMPLATE_END_POINT = 'templates';
export const CLIENT_ID_HEADER_LABEL = process.env.REACT_APP_CLIENT_ID_HEADER_LABEL;
export const SURVEY_CLIENT_ID_HEADER_LABEL = process.env.REACT_APP_SURVEY_CLIENT_ID_HEADER_LABEL;
export const PROJECT_ID_HEADER_LABEL = process.env.REACT_APP_PROJECT_ID_HEADER_LABEL;
export const PROJECT_ID_HEADER_VALUE = process.env.REACT_APP_PROJECT_ID_HEADER_VALUE;
export const CLIENT_SECRET_HEADER_LABEL = process.env.REACT_APP_CLIENT_SECRET_HEADER_LABEL;
export const CLIENT_SECRET_HEADER_VALUE = process.env.REACT_APP_CLIENT_SECRET_HEADER_VALUE;
export const SURVEY_CLIENT_TOKEN_HEADER_LABEL =
  process.env.REACT_APP_SURVEY_CLIENT_TOKEN_HEADER_LABEL;
export const BCONIC_CALL_BACKURL =
  'http://159.65.157.122:82/authenticate/surveys/' + CLIENT_ID_HEADER_VALUE + '/:state';
let SURVEY_CLIENT_TOKEN_HEADER_VALUE = window.localStorage.getItem('usertoken');
let LOCAL_STATE_OBJECT = JSON.parse(window.localStorage.getItem('state'));
export const AUTH_SIGN_IN_URL = `${BCONIC_AUTH_URI}authorize?redirect_uri=${process.env.REACT_APP_BCONIC_SURVEY_UI_URI}redirect&client_id=${process.env.REACT_APP_AUTH_CLIENT_ID}&response_type=token&state=${STATE}`;
export const EMAILREGX = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);
export const PHONENUMBERREGX = RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g);
export const BCONIC_HEADER_INFO = {
  'x-client-id': CLIENT_ID_HEADER_VALUE,
  'x-client-secret': CLIENT_SECRET_HEADER_VALUE,
  'Content-Type': 'application/json',
};

export const HEADER_INFO = {
  'x-bconic-account-token': SURVEY_CLIENT_TOKEN_HEADER_VALUE,
  'Content-Type': 'application/json',
};

export const USER_HEADER_INFO = {
  'x-bconic-account-token': SURVEY_CLIENT_TOKEN_HEADER_VALUE,
  'Content-Type': 'application/json',
};

export const USER_HEADER_INFO_IMAGE_UPLOAD = {
  'x-bconic-account-token': SURVEY_CLIENT_TOKEN_HEADER_VALUE,
  'Content-Type': 'multipart/form-data',
};

export const USER_HEADER_INFO_WITH_TOKEN = {
  'x-bconic-account-token': LOCAL_STATE_OBJECT?.userData?.user?.token || null,
};

export const API_HEADER_INFO = {
  'Content-Type': 'application/json',
};

//Date & time formats for moment
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_FORMAT_REVERSE = 'DD-MM-YYYY';
export const TIME_FORMAT = 'h:mm a';
export const DATE_AND_TIME_FORMAT = 'YYYY-MM-DD h:mm a';
export const DATE_PICKER_DATE_FORMAT = 'yyyy/MM/dd HH:mm';
export const CALENDER_DISPLAY_DATE_FORMAT = 'DD/MM/YYYY';
