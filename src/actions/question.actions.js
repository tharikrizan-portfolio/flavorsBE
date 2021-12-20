import {
  BULK_ANSWER_SUBMIT_SUCCESS,
  BULK_ANSWER_SUBMIT_ERROR,
  SET_ANSWER_LIST,
  SET_QUESTION_DEFINE_QUESTION_LIST,
  GET_BULK_ANSWER_LIST_SUCCESS,
  GET_BULK_ANSWER_LIST_ERROR,
  SET_IS_UPDATE_SHEET,
} from './types';

import {
  BCONIC_SURVEY_URI,
  ADMIN_ENDPOINT,
  BULK_ANSWERS_END_POINT,
  SURVEY_END_POINT,
  ROUTE_BACKGROUND_IMAGE,
  USER_HEADER_INFO_IMAGE_UPLOAD,
} from '../store/constant.js';
import axios from 'axios';
import { toast } from 'react-toastify';
import { mutateUpdateQuestion } from './updateQuestion.actions';

//SUBMIT BULK ANSWER --------------------------------------
export const submitBulkAnswerSuccess = (data) => {
  return {
    type: BULK_ANSWER_SUBMIT_SUCCESS,
    payload: data,
  };
};

export const submitBulkAnswerError = (data) => {
  return {
    type: BULK_ANSWER_SUBMIT_ERROR,
    payload: data,
  };
};

export const submitBulkAnswer = (answerListObj, header) => {
  return (dispatch) => {
    return axios
      .get(`${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${BULK_ANSWERS_END_POINT}/`, answerListObj, {
        headers: header,
      })
      .then((response) => {
        dispatch(submitBulkAnswerSuccess(response.data.data));
        dispatch(submitBulkAnswerError(''));
        toast.success('Bulk answers added successfully', {
          position: 'top-center',
        });
        return;
      })
      .catch((error) => {
        const failed = 'Error in submitting bulk answer';
        dispatch(submitBulkAnswerError(failed));
        toast.error(failed, {
          position: 'top-center',
        });
        return;
      });
  };
};

//REMOVE ANSWER FROM BULK --------------------------------------
export const removeAnswerFromBulk = (removeIndex, answersList) => {
  let answerList_ = answersList;
  answerList_.splice(removeIndex, 1);

  return (dispatch) => {
    dispatch(setAnswerList(answerList_));
  };
};

//SET ANSWER LIST --------------------------------------

export const setAnswerList = (answersList) => {
  return (dispatch) => {
    dispatch({ type: SET_ANSWER_LIST, payload: answersList });
  };
};

export const addAnswerFromBulk = (newAnswer, answersList) => {
  let answerList_ = answersList;
  answerList_.push(newAnswer);
  return (dispatch) => {
    dispatch(setAnswerList(answerList_));
  };
};

//REMOVE QUESTION FROM QUESTION LIST --------------------------------------
export const removeQuestionFromQuestionList = (removeIndex, questionList) => {
  let questionList_ = questionList;
  questionList_.splice(removeIndex, 1);
  return (dispatch) => {
    dispatch(setQuestionList(questionList));
  };
};

//SET QUESTION LIST --------------------------------------

export const setQuestionList = (questionList) => {
  return (dispatch) => {
    dispatch({
      type: SET_QUESTION_DEFINE_QUESTION_LIST,
      payload: questionList,
    });
  };
};

export const addQuestionForQuestionList = (newQuestion, questionList) => {
  let questionList_ = questionList;
  questionList_.push(newQuestion);
  return (dispatch) => {
    dispatch(setQuestionList(questionList));
  };
};

export const updateQuestion = (questionIndex, updatedQuestion, questionList) => {
  let questionList_ = questionList;
  questionList_[questionIndex] = updatedQuestion;
  return (dispatch) => {
    dispatch(setQuestionList(questionList));
  };
};

export const fetchBulkAnswerList = (header) => {
  return (dispatch) => {
    return axios
      .get(`${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${BULK_ANSWERS_END_POINT}/`, {
        headers: header,
      })
      .then((response) => {
        dispatch(getBulkAnswersSuccess(response.data.data));
        dispatch(getBulkAnswersError(''));
      })
      .catch((error) => {
        const failed = 'Error in getting the bulk answer list';
        dispatch(getBulkAnswersError(failed));
        toast.error(failed, {
          position: 'top-center',
        });
        return;
      });
  };
};

export const getBulkAnswersSuccess = (data) => {
  return {
    type: GET_BULK_ANSWER_LIST_SUCCESS,
    payload: data,
  };
};

export const getBulkAnswersError = (data) => {
  return {
    type: GET_BULK_ANSWER_LIST_ERROR,
    payload: data,
  };
};

//Set Background Image of a question
/**
 *
 * @param {Array} questionList
 * @param {Object} header
 * @param {Boolean} isAddSurvey
 * @returns {Promise}
 */
export const setImageUrlOfQuestions = (questionList, header, isAddSurvey) => {
  return async (dispatch) => {
    await Promise.all(
      questionList.map(async (question_, questionIndex) => {
        let fileName = question_.metadata?.fileName;
        let url = question_.metadata?.questionBackgroundImageUrl;

        if (!/^blob:http/.test(url)) {
          const updatedQuestionData = {
            ...question_,
            metadata: {
              ...question_.metadata,
              questionBackgroundImageUrl: url,
              fileName,
            },
          };

          if (isAddSurvey) {
            dispatch(updateQuestion(questionIndex, updatedQuestionData, questionList));
          } else {
            dispatch(mutateUpdateQuestion(questionIndex, updatedQuestionData, questionList));
            dispatch({
              type: SET_IS_UPDATE_SHEET,
              payload: {
                questionTitleChanged: true,
                questionSequenceChanged: true,
              },
            });
          }
          return Promise.resolve();
        }

        let bodyFormData = new FormData();

        let file = await fetch(url)
          .then((r) => r.blob())
          .then((blobFile) => new File([blobFile], fileName, { type: 'image/png' }));

        bodyFormData.append('backgroundImage', file);

        return axios
          .post(
            `${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${SURVEY_END_POINT}/${ROUTE_BACKGROUND_IMAGE}`,
            bodyFormData,
            {
              headers: header,
            },
          )
          .then((response) => {
            const newUrl = `${BCONIC_SURVEY_URI}${response.data.data.imageUrl.substring(1)}`;
            const updatedQuestionData = {
              ...question_,
              metadata: {
                ...question_.metadata,
                questionBackgroundImageUrl: newUrl,
                fileName,
              },
            };
            if (isAddSurvey) {
              dispatch(updateQuestion(questionIndex, updatedQuestionData, questionList));
            } else {
              dispatch(mutateUpdateQuestion(questionIndex, updatedQuestionData, questionList));
              dispatch({
                type: SET_IS_UPDATE_SHEET,
                payload: {
                  questionTitleChanged: true,
                  questionSequenceChanged: true,
                },
              });
            }
          })
          .catch((error) => {
            toast.error('cannot Upload', {
              position: 'top-right',
            });
            return Promise.reject();
          });
      }),
    );
  };
};

//end
