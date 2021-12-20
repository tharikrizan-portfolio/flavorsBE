import Joi from 'joi';
import helper from './helper';

const MIN_STRING_LENGTH = 0;
const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 200;
const MAX_QUESTION_TITLE_LENGTH = 100;
const MAX_NUM_OF_OPTIONS = 8;
const MAX_OPTION_TITLE_LENGTH = 100;
const MAX_RATING_BAR_VALUE = 10;
const MAX_RATING_BAR_LABEL_LENGTH = 15;

/**
 * Validate the survey title
 * @param  {String} title
 * @returns {{ isError: Boolean, errorMsg: String|null }}
 */
export function validateTitle(title) {
  const escaped = helper.convertHtmlTextToString(title).trim();
  //--- schema
  const schema = Joi.string()
    .max(MAX_TITLE_LENGTH)
    .min(MIN_STRING_LENGTH)
    .required()
    .label('Title');
  return generateReturnObject(schema.validate(escaped));
}
/**
 * Validate the survey description
 * @param  {String} description
 * @returns {{ isError: Boolean, errorMsg: String|null }}
 */
export function validateDescription(description) {
  const escaped = helper.convertHtmlTextToString(description).trim();
  //--- schema
  const schema = Joi.string()
    .max(MAX_DESCRIPTION_LENGTH)
    .min(MIN_STRING_LENGTH)
    .required()
    .label('Description');
  return generateReturnObject(schema.validate(escaped));
}
/**
 * Validate the question title
 * @param  {String} questionTitle
 * @returns {{ isError: Boolean, errorMsg: String|null }}
 */
export function validateQuestionTitle(questionTitle) {
  //--- schema
  const schema = Joi.string()
    .max(MAX_QUESTION_TITLE_LENGTH)
    .min(MIN_STRING_LENGTH)
    .required()
    .label('Question Title');

  return generateReturnObject(schema.validate(questionTitle));
}

/**
 * Validate the question's option list
 * @param  {[Object]} options
 * @returns {{ isError: Boolean, errorMsg: String|null }}
 */
export function validateQuestionOptionList(options) {
  //--- schema
  const schema = Joi.array().max(MAX_NUM_OF_OPTIONS).required().label('Options/Answers');

  return generateReturnObject(schema.validate(options));
}
/**
 * Validate number of questions
 * @param  {[Object]} questions
 * @returns {{ isError: Boolean, errorMsg: String|null }}
 */
export function validateQuestionList(questions) {
  //--- schema
  const schema = Joi.array().min(1).required().label('Questions');
  return generateReturnObject(schema.validate(questions));
}
/**
 * Validate the question option title length
 * @param  {String} questionTitle
 * @returns {{ isError: Boolean, errorMsg: String|null }}
 */
export function validateQuestionOptionTitle(questionTitle) {
  //--- schema
  const schema = Joi.string().max(MAX_OPTION_TITLE_LENGTH).required().label('Option Title');

  return generateReturnObject(schema.validate(questionTitle));
}
/**
 * Validate rating bar max value
 * @param  {Number} ratingBarMaxValue
 * @returns {{ isError: Boolean, errorMsg: String|null }}
 */
export function validateRatingBarMaxValue(ratingBarMaxValue, minValue = 1) {
  //--- schema
  const schema = Joi.number()
    .min(minValue)
    .max(MAX_RATING_BAR_VALUE)
    .required()
    .label('Rating Bar Max Value');
  return generateReturnObject(schema.validate(ratingBarMaxValue));
}

/**
 * Validate rating bar label
 * @param  {Number} ratingBarLabel
 * @returns {{ isError: Boolean, errorMsg: String|null }}
 */
export function validateRatingBarLabels(ratingBarLabel) {
  //--- schema
  const schema = Joi.string()
    .min(1)
    .max(MAX_RATING_BAR_LABEL_LENGTH)
    .required()
    .label('Rating Bar Label');
  return generateReturnObject(schema.validate(ratingBarLabel));
}

/**
 * Pixel ID validation
 * @param  {String} pixelId
 * @returns {{ isError: Boolean, errorMsg: String|null }}
 */
export function validatePixelId(pixelId) {
  //--- a user can create a survey without setting a pixel integeration
  if (pixelId.length === 0) return generateSimpleResponse(false);

  //--- however if a user is having pixel integration, then following conditions need to be met.

  //--- pixel id can only contain integers
  if (/\D/.test(pixelId.trim())) {
    return generateSimpleResponse(true, '"Pixel ID" can only contain whole numbers(integers)');
  }
  //--- pixel Id has to be exactly 15 digits long
  else if (pixelId.length !== 15) {
    return generateSimpleResponse(true, '"Pixel ID" has to be exactly 15 digits.');
  }
  return generateSimpleResponse(false);
}
/**
 * Validate the start & end date of a survey
 * @param  {String} startingDate starting date time
 * @param  {String} endingDate ending date time
 * @returns {{ isError: Boolean, errorMsg: String|null }}
 */
export function validateSurveyDates(startingDate, endingDate) {
  //--- schema
  const startEndValidator = {
    startTime: Joi.date().required().label('Start time'),
    endTime: Joi.date().greater(Joi.ref('startTime')).required().label('End time'),
  };
  const schema = Joi.object().keys(startEndValidator);
  const result = generateReturnObject(
    schema.validate({ startTime: startingDate, endTime: endingDate }),
  );
  if (result.isError) {
    result.errorMsg = result.errorMsg.replace('"ref:startTime"', 'Start Time');
  }
  return result;
}

/**
 * Generate the return object for validations
 * @param  {Object} result
 */
function generateReturnObject(result) {
  return {
    isError: Boolean(result.error),
    errorMsg: result.error ? result.error.message : null,
  };
}

/**
 * Generate simple response
 * @param  {Object} result
 */
function generateSimpleResponse(isError, msg) {
  return {
    isError: isError,
    errorMsg: msg ? msg : null,
  };
}
