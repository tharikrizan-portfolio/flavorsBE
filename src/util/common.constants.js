import * as enumUtil from './enumerations';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ListIcon from '@material-ui/icons/List';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LanguageIcon from '@material-ui/icons/Language';

const CLIENT_ID_HEADER_VALUE = process.env.REACT_APP_CLIENT_ID_HEADER_VALUE;
const STATE = process.env.REACT_APP_STATE;
const BCONIC_AUTH_URI = process.env.REACT_APP_BCONIC_AUTH_URI;
const TRACECLAW_URI = process.env.REACT_APP_TRCAECLAW_URI;
const BCONIC_SURVEY_URI = process.env.REACT_APP_BCONIC_SURVEY_URI;
const BCONIC_SURVEY_UI_URI = process.env.REACT_APP_BCONIC_SURVEY_UI_URI;
const USER_API = 'api/';
const AUTH_API = 'auth/';
const ADMIN_API = 'admin/';
const MINIMUM_RATING_BAR_RANGE = 5;
const ACCOUNT_END_POINT = 'accounts';
const SURVEY_END_POINT = 'surveys';
const ANSWER_END_POINT = 'answers';
const SUMMARY_END_POINT = 'summarries';
const LOCATION_END_POINT = 'locations';
const CHARTS_END_POINT = 'charts';
const QUESTION_END_POINT = 'questions';
const PREVIEW_END_POINT = 'preview';
const TRACECLAW_USERS_END_POINT = 'users';
const QUESTIONANSWER_END_POINT = 'questionanswers';
const QRCODE_END_POINT = 'qrcodes';
const BULK_ANSWERS_END_POINT = 'bulkanswer';
const CLIENT_ID_HEADER_LABEL = process.env.REACT_APP_CLIENT_ID_HEADER_LABEL;
const SURVEY_CLIENT_ID_HEADER_LABEL = process.env.REACT_APP_SURVEY_CLIENT_ID_HEADER_LABEL;
const PROJECT_ID_HEADER_LABEL = process.env.REACT_APP_PROJECT_ID_HEADER_LABEL;
const PROJECT_ID_HEADER_VALUE = process.env.REACT_APP_PROJECT_ID_HEADER_VALUE;
const CLIENT_SECRET_HEADER_LABEL = process.env.REACT_APP_CLIENT_SECRET_HEADER_LABEL;
const CLIENT_SECRET_HEADER_VALUE = process.env.REACT_APP_CLIENT_SECRET_HEADER_VALUE;
const SURVEY_CLIENT_TOKEN_HEADER_LABEL = process.env.REACT_APP_SURVEY_CLIENT_TOKEN_HEADER_LABEL;
const BCONIC_CALL_BACKURL =
  'http://159.65.157.122:82/authenticate/surveys/' + CLIENT_ID_HEADER_VALUE + '/:state';
let SURVEY_CLIENT_TOKEN_HEADER_VALUE = window.localStorage.getItem('usertoken');
const EMAILREGX = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
);
const PHONENUMBERREGX = RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g);
const BCONIC_HEADER_INFO = {
  'x-client-id': CLIENT_ID_HEADER_VALUE,
  'x-client-secret': CLIENT_SECRET_HEADER_VALUE,
  'Content-Type': 'application/json',
};

const HEADER_INFO = {
  'x-bconic-account-token': SURVEY_CLIENT_TOKEN_HEADER_VALUE,
  'Content-Type': 'application/json',
};

const USER_HEADER_INFO = {
  'x-bconic-account-token': SURVEY_CLIENT_TOKEN_HEADER_VALUE,
  'Content-Type': 'application/json',
};

const API_HEADER_INFO = {
  'Content-Type': 'application/json',
};

const QUESTION_TYPES = [
  {
    value: enumUtil.questionTypes.CHECKBOX,
    label: ' Checkbox Question',
    Icon: CheckBoxIcon,
  },
  {
    value: enumUtil.questionTypes.RADIO_BUTTON,
    label: 'Radio Button Question',
    Icon: RadioButtonCheckedIcon,
  },
  {
    value: enumUtil.questionTypes.RATING_BAR,
    label: 'Rating bar Question',
    Icon: LinearScaleIcon,
  },
  {
    value: enumUtil.questionTypes.LINE_TEXT,
    label: 'Text Question',
    Icon: TextFieldsIcon,
  },
  {
    value: enumUtil.questionTypes.LONG_LIST,
    label: 'List Of Values',
    Icon: ListIcon,
  },
];

const QUIZ_QUESTION_TYPES = [
  {
    value: enumUtil.questionTypes.CHECKBOX,
    label: ' Checkbox Question',
    Icon: CheckBoxIcon,
  },
  {
    value: enumUtil.questionTypes.RADIO_BUTTON,
    label: 'Radio Button Question',
    Icon: RadioButtonCheckedIcon,
  },
  {
    value: enumUtil.questionTypes.LINE_TEXT,
    label: 'Text Question',
    Icon: TextFieldsIcon,
  },
];

const VALIDATION_TYPES = [
  {
    value: 'No Validation',
    label: 'No Validation',
    Icon: NotInterestedIcon,
  },
  {
    value: 'Email',
    label: 'Email',
    Icon: PhoneIcon,
  },
  {
    value: 'Phone Number',
    label: 'Phone Number',
    Icon: EmailIcon,
  },
];

const TEMPLATE_FILTERS = {
  ALL_TEMPLATE: 'ALL_TEMPLATE',
  MY_TEMPLATE: 'MY_TEMPLATE',
  GLOBAL_TEMPLATE: 'GLOBAL_TEMPLATE',
};

const TEMPLATE_TYPES = [
  {
    value: TEMPLATE_FILTERS.ALL_TEMPLATE,
    label: 'All Templates',
    Icon: BorderAllIcon,
  },
  {
    value: TEMPLATE_FILTERS.MY_TEMPLATE,
    label: 'My Templates',
    Icon: AccountCircleIcon,
  },
  {
    value: TEMPLATE_FILTERS.GLOBAL_TEMPLATE,
    label: 'Bconic Templates',
    Icon: LanguageIcon,
  },
];

export default {
  BULK_ANSWERS_END_POINT,
  QRCODE_END_POINT,
  LOCATION_END_POINT,
  TRACECLAW_URI,
  API_HEADER_INFO,
  TRACECLAW_USERS_END_POINT,
  MINIMUM_RATING_BAR_RANGE,
  USER_HEADER_INFO,
  ACCOUNT_END_POINT,
  PHONENUMBERREGX,
  EMAILREGX,
  BCONIC_HEADER_INFO,
  BCONIC_SURVEY_UI_URI,
  PREVIEW_END_POINT,
  AUTH_API,
  ANSWER_END_POINT,
  BCONIC_CALL_BACKURL,
  CLIENT_ID_HEADER_VALUE,
  SUMMARY_END_POINT,
  SURVEY_CLIENT_TOKEN_HEADER_LABEL,
  STATE,
  QUESTIONANSWER_END_POINT,
  BCONIC_AUTH_URI,
  HEADER_INFO,
  BCONIC_SURVEY_URI,
  SURVEY_END_POINT,
  CLIENT_ID_HEADER_LABEL,
  CLIENT_SECRET_HEADER_LABEL,
  SURVEY_CLIENT_TOKEN_HEADER_VALUE,
  USER_API,
  CLIENT_SECRET_HEADER_VALUE,
  PROJECT_ID_HEADER_LABEL,
  PROJECT_ID_HEADER_VALUE,
  SURVEY_CLIENT_ID_HEADER_LABEL,
  ADMIN_API,
  QUESTION_END_POINT,
  CHARTS_END_POINT,
  QUESTION_TYPES,
  VALIDATION_TYPES,
  QUIZ_QUESTION_TYPES,
  TEMPLATE_FILTERS,
  TEMPLATE_TYPES,
};
