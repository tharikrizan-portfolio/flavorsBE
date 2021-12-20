import axios from "axios";
import { toast } from "react-toastify";

import {
  GET_SURVEY_QUESTIONS,
  GET_SURVEY_QUESTIONS_SUCCESS,
  GET_SURVEY_QUESTIONS_ERROR,
  EDIT_UPDATE_QUESTION_PAGE_QUESTIONS,
  UPDATE_PUBLISH_SURVEY
} from "./types";

import {
  BCONIC_SURVEY_URI,
  ADMIN_ENDPOINT,
  SURVEY_END_POINT,
  QUESTION_END_POINT,
  QUESTION_BULK_UPDATE_END_POINT,
  USER_HEADER_INFO_WITH_TOKEN,
} from "../store/constant.js";

export const getSurveyQuestions = (surveyId, header) => {
  return (dispatch) => {
    dispatch({ type: GET_SURVEY_QUESTIONS });
    return axios
      .get(
        `${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${SURVEY_END_POINT}/${surveyId}/${QUESTION_END_POINT}`,
        {
          headers: header,
        }
      )
      .then((res) => {
        dispatch({
          type: GET_SURVEY_QUESTIONS_SUCCESS,
          payload: res.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: GET_SURVEY_QUESTIONS_ERROR, payload: error });
      });
  };
};

export const setUpdateQuestionList = (questionList) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_UPDATE_QUESTION_PAGE_QUESTIONS,
      payload: questionList,
    });
  };
};

export const mutateUpdateQuestion = (
  questionIndex,
  updatedQuestion,
  questionList
) => {
  let questionList_ = questionList;
  questionList_[questionIndex] = updatedQuestion;
  return (dispatch) => {
    dispatch(setUpdateQuestionList([...questionList_]));
  };
};


export const updatePublishSurvey = (data) => {
  return {
    type: UPDATE_PUBLISH_SURVEY,
    payload: data,
  };
};

export const BulkQuestionUpdate = (questionList, surveyId) => {
  return (dispatch) => {
    return axios
      .put(
        `${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${QUESTION_BULK_UPDATE_END_POINT}/${surveyId}`,
        questionList,
        {
          headers: USER_HEADER_INFO_WITH_TOKEN,
        }
      )
      .then((res) => {
        toast.success("Survey successfully updated", {
          position: "top-right",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error occurred", {
          position: "top-right",
        });
      });
  };
};
