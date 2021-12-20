

const questionTypes = {
  CHECKBOX: 'CHECKBOX',
  LINE_TEXT: 'LINE TEXT',
  RADIO_BUTTON: 'RADIO BUTTON',
  LOCATION: 'LOCATION',
  RATING_BAR: 'RATING BAR',
  LONG_LIST: 'LONG LIST',
};

const responseTypes = {
  RESPONSES_TYPE_BINARY: 'BINARY RESPONSES',
  RESPONSES_TYPE_SINGLE: 'SINGLE RESPONSES',
  RESPONSES_TYPE_MULTIPLE: 'MULTIPLE RESPONSES',
  RESPONSES_TYPE_TEXT: 'TEXT RESPONSES',
};

const locationTypes = {
  COUNTRY_BASED: 'COUNTRY BASED',
  PROVINCE_BASED: 'PROVINCE BASED',
  DISTRICT_BASED: 'DISTRICT BASED',
  DS_DIVISION_BASED: 'DISTRICT SECRETARIAL DIVISION BASED',
  GN_DIVISION_BASED: 'GRAMA NILADHARI DIVISION BASED',
};

const surveyTypes = {
  QUIZ: 'QUIZ',
  QUESSIONNAIRE: 'QUESSIONNAIRE',
};

const chartNames = {
  BAR_CHART: 'ColumnChart',
  PIE_CHART: 'PieChart',
};

const chartTypes = [
  {
    label: 'Bar chart',
    value: chartNames.BAR_CHART,
  },
  {
    label: 'Pie chart',
    value: chartNames.PIE_CHART,
  },
];

const surveyPublishStatus = {
  PUBLISHED: 'Published',
  UNPUBLISHED: 'Unpublished',
  ALL: 'All',
};

const activeStateTypes = {
  ACTIVE: 'active',
  IN_ACTIVE: 'in-active',
  ALL: 'all',
};

const conditionOperators = [
  { value: 'EQ', label: 'Is' },
  { value: 'NE', label: 'Not' },
  { value: 'GT', label: 'Greater Than' },
  { value: 'LT', label: 'Less Than' },
];


const textValidations = {
  EMAIL: {
    value: 'Email',
    regExp: new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ),
  },
  MOBILE_NUMBER: {
    value: 'Phone Number',
    regExp: new RegExp(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3,7}\)?[\s.-]?\d{3}[\s.-]?\d{3}$/),
  },
};

const chartBackgroundColors = [
  'rgba(255, 99, 132)',
  'rgba(54, 162, 235)',
  'rgba(255, 206, 86)',
  'rgba(75, 192, 192)',
  'rgba(153, 102, 255)',
  'rgba(255, 159, 64)',
  'rgb(223, 255, 0)',
  'rgb(224, 187, 228)',
  'rgb(88, 148, 156)',
];

const correctWrongBackgroundColors = ['rgba(68, 208, 124)', 'rgba(255, 112, 112)'];

module.exports = {
  responseTypes,
  questionTypes,
  surveyTypes,
  locationTypes,
  chartTypes,
  chartNames,
  activeStateTypes,
  surveyPublishStatus,
  textValidations,
  chartBackgroundColors,
  conditionOperators,
  correctWrongBackgroundColors,
};
