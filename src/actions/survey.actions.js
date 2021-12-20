import {
  GET_SURVEY_LIST_SUCCESS,
  GET_SURVEY_LIST_ERROR,
  CHANGE_PUBLISH_STATUS_SUCCESS,
  CHANGE_PUBLISH_STATUS_ERROR,
  DELETE_SURVEY_ERROR,
  DELETE_SURVEY_SUCCESS,
  GET_SURVEY_RESPONSES_ERROR,
  GET_SURVEY_RESPONSES_SUCCESS,
  GET_SURVEY_RESPONSES_GRAPHICAL_ERROR,
  GET_SURVEY_RESPONSES_GRAPHICAL_SUCCESS,
  SAVE_TITLE,
  SAVE_DESCRIPTION,
  VIEW_SURVEY,
  UPDATE_SURVEY_TITLE,
  UPDATE_SURVEY_DESCRIPTION,
  GET_SURVEY_QUESTIONS,
  GET_SURVEY_QUESTIONS_SUCCESS,
  GET_SURVEY_QUESTIONS_ERROR,
  CLEAR_SURVEY,
  PUBLISH_SURVEY,
  UPDATE_SURVEY_FILTERS_PARAMETERS,
  FILTERED_SURVEY_RESPONSE_LIST,
  SINGLE_FILTERED_SURVEY_RESPONSE,
  IS_SAVING,
  SET_IS_UPDATE_SHEET,
  CLEAR_SURVEY_DATA,
  CHANGE_VALIDATIONS,
  UPDATE_VALIDATIONS,
  CREATE_FROM_TEMPLATE,
  SET_QUESTION__LIST,
  CAN_SAVE_TEMPLATE,
  ADD_CONDITIONAL_QUESTION,
  UPDATE_CONDITIONAL_QUESTION,
  GET_SURVEY_CONDITIONAL_QUESTIONS_SUCCESS,
} from './types';

import {
  BCONIC_SURVEY_URI,
  ADMIN_ENDPOINT,
  SURVEY_END_POINT,
  QUESTION_END_POINT,
  ANSWER_END_POINT,
  CHARTS_END_POINT,
  ROUTE_BACKGROUND_IMAGE,
  USER_HEADER_INFO_IMAGE_UPLOAD,
} from '../store/constant.js';
import axios from 'axios';
import enumUtil from '../util/enumerations';
import randomColor from 'randomcolor';
import { toast } from 'react-toastify';
import { closeAlert } from './alert.action';
import { history } from '../index';
import React from 'react';
import { setQuestionList } from './question.actions';
import {
  changeSurveyBackgroundImageUrl,
  resetSurveyConfigurationColors,
  resetSurveyDates,
  updateSurveyBackgroundImageUrl,
} from './survey.configuration.actions';
import { resetSplashScrConfig } from './shareSurveyConfiguration.actions';
import { getSurveyQuestions } from './updateQuestion.actions';
import { getSurveyTableInfo, getSurveyListForTable } from './summary.actions';

//GET SURVEY LIST--------------------------------------
export const getSurveyListSuccess = (data) => {
  return {
    type: GET_SURVEY_LIST_SUCCESS,
    payload: data,
  };
};

export const getSurveyListError = (data) => {
  return {
    type: GET_SURVEY_LIST_ERROR,
    payload: data,
  };
};

export const getSurveyList = (header) => {
  return (dispatch) => {
    return axios
      .get(`${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${SURVEY_END_POINT}/`, {
        headers: header,
      })
      .then((response) => {
        dispatch(getSurveyListSuccess(response.data.data));
        dispatch(getSurveyListError(''));
      })
      .catch((error) => {
        const failed = 'Error in getting the surveys';
        dispatch(getSurveyListError(failed));
        toast.error(failed, {
          position: 'top-center',
        });
        return;
      });
  };
};

//CHANGE PUBLISH STATUS --------------------------------------
export const publishStatusChangedSuccess = (data) => {
  return {
    type: CHANGE_PUBLISH_STATUS_SUCCESS,
    payload: data,
  };
};

export const publishStatusChangedError = (data) => {
  return {
    type: CHANGE_PUBLISH_STATUS_ERROR,
    payload: data,
  };
};

export const setCanSaveTemplate = (data) => {
  return (dispatch) => {
    dispatch({
      type: CAN_SAVE_TEMPLATE,
      payload: data,
    });
  };
};

export const publishStatusChanged = (surveyId, surveyStatus, headers) => {
  return (dispatch) => {
    return axios
      .patch(
        `${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${SURVEY_END_POINT}/${surveyId}`,
        { isPublished: surveyStatus },
        {
          headers: headers,
        },
      )
      .then((response) => {
        let surveyPublishedObj = {
          surveyId: surveyId,
          surveyStatus: surveyStatus,
        };
        dispatch(publishStatusChangedSuccess(surveyPublishedObj));
        dispatch(publishStatusChangedError(''));
      })
      .catch((error) => {
        const failed = 'Error in getting the surveys';
        dispatch(publishStatusChangedError(failed));
        toast.error(failed, {
          position: 'top-center',
        });
        return;
      });
  };
};

//DELETE SURVEY --------------------------------------
export const deleteSurveySuccess = (data) => {
  return {
    type: DELETE_SURVEY_SUCCESS,
    payload: data,
  };
};

export const deleteSurveyError = (data) => {
  return {
    type: DELETE_SURVEY_ERROR,
    payload: data,
  };
};

export const deleteSurvey = (surveyId, headers, surveys) => {
  return (dispatch) => {
    return axios
      .delete(`${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${SURVEY_END_POINT}/${surveyId}`, {
        headers: headers,
      })
      .then((response) => {
        let surveyDeleteObj = {
          surveyId: surveyId,
        };

        const newSurveys = surveys.filter((survey) => survey.surveyId !== surveyId);
        dispatch(getSurveyListForTable([...newSurveys]));

        toast.success('Survey successfully deleted!');

        dispatch(deleteSurveyError(''));
      })
      .catch((error) => {
        dispatch(closeAlert());
        const failed = 'Error in getting the surveys';
        dispatch(deleteSurveyError(failed));
        toast.warn(error.response?.data?.data, {
          position: 'top-right',
        });
        return;
      });
  };
};

//GET SURVEY RESPONSES--------------------------------------
export const getSurveyResponsesSuccess = (data) => {
  return {
    type: GET_SURVEY_RESPONSES_SUCCESS,
    payload: data,
  };
};

export const getSurveyResponsesError = (data) => {
  return {
    type: GET_SURVEY_RESPONSES_ERROR,
    payload: data,
  };
};

export const getSurveyResponses = (selectedSurvey, header) => {
  return (dispatch) => {
    dispatch(updateSingleFilteredSurvey({ ...selectedSurvey, csv: { fetching: true } }));
    return axios
      .get(
        `${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${SURVEY_END_POINT}/${QUESTION_END_POINT}/${ANSWER_END_POINT}/${selectedSurvey.surveyId}`,
        {
          headers: header,
        },
      )
      .then((response) => {
        var surveyResponses = response.data.data;

        var rows = [];
        var headers = [];
        var tableHeaders = [];
        for (let headerObj of surveyResponses.headerArr) {
          let headerArrObj = {
            id: headerObj.id,
            displayName: headerObj.title,
          };
          let tableHeaderArr = {
            label: headerObj.title,
            field: headerObj.id,
          };
          tableHeaders.push(tableHeaderArr);
          headers.push(headerArrObj);
        }

        for (let responses of surveyResponses.rowArr) {
          var jsonObj = {};
          for (let row of responses.responses) {
            let tmpAnswer = '';
            let count = 0;
            for (let answer of row.answer) {
              if (count === row.answer.length - 1) {
                tmpAnswer += answer.name + ' ';
              } else {
                tmpAnswer += answer.name + ' :';
              }
              count++;
            }
            jsonObj[row.questionId] = tmpAnswer;
          }
          rows.push(jsonObj);
        }
        let tableRows = [];
        for (let responses of surveyResponses.rowArr) {
          var rowColsArr = [];
          for (let row of responses.responses) {
            let tmpAnswer = '';
            for (let answer of row.answer) {
              tmpAnswer += 'Answer: ' + answer.name + '\t';
            }
            rowColsArr.push(tmpAnswer);
          }
          tableRows.push(rowColsArr);
        }
        let surveyResponsesObj = {
          csvColumns: headers,
          csvRows: rows,
          data: {
            columns: tableHeaders,
            rows: tableRows,
          },
        };
        dispatch(
          updateSingleFilteredSurvey({
            ...selectedSurvey,
            csv: { ...surveyResponsesObj, fetching: false },
          }),
        );
      })
      .catch((error) => {
        const failed = 'Error in getting the survey responses';
        if (error.response.data.status)
          dispatch(
            updateSingleFilteredSurvey({
              ...selectedSurvey,
              csv: {
                fetching: false,
                error: true,
                message: 'No responses found',
              },
            }),
          );
        else
          toast.error(failed, {
            position: 'top-center',
          });
        return;
      });
  };
};

//GET SURVEY RESPONSES GRAPHICAL--------------------------------------
export const getSurveyResponsesGraphicalSuccess = (data) => {
  return {
    type: GET_SURVEY_RESPONSES_GRAPHICAL_SUCCESS,
    payload: {
      fetching: false,
      data,
    },
  };
};

export const getSurveyResponsesGraphicalError = (data) => {
  return {
    type: GET_SURVEY_RESPONSES_GRAPHICAL_ERROR,
    payload: data,
  };
};

export const updateSurveyFilterParameters = (data) => {
  return {
    type: UPDATE_SURVEY_FILTERS_PARAMETERS,
    payload: data,
  };
};

export const updateFilteredSurveyList = (data) => {
  return {
    type: FILTERED_SURVEY_RESPONSE_LIST,
    payload: data,
  };
};

export const updateSingleFilteredSurvey = (data) => {
  return {
    type: SINGLE_FILTERED_SURVEY_RESPONSE,
    payload: data,
  };
};

export const getSurveyResponsesGraphical = (surveyId, header) => {
  return (dispatch) => {
    dispatch({
      type: GET_SURVEY_RESPONSES_GRAPHICAL_SUCCESS,
      payload: {
        fetching: true,
        data: [],
      },
    });
    return axios
      .get(
        `${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${SURVEY_END_POINT}/${CHARTS_END_POINT}/${surveyId}`,
        {
          headers: header,
        },
      )
      .then((res) => {
        var responseData = res.data.data;
        var chartDataList = responseData?.chartData;
        var chartOptionList = [];
        for (let chartData of chartDataList) {
          var dataList = [['options', 'responsesCount', { role: 'style' }]];
          if (chartData.chartType == enumUtil.responseTypes.RESPONSES_TYPE_SINGLE) {
            for (let dataValue of chartData.responses) {
              var color = randomColor();
              if (!dataValue.label) continue;
              var data = [dataValue.label, dataValue.y, color];
              dataList.push(data);
            }

            let chartObj = {
              questionName: chartData.name,
              questionType: chartData.type,
              totalResponsesCount: chartData.totalResponses,
              chartData: dataList,
              chartType: enumUtil.chartNames.PIE_CHART,
              step: chartData.step,
              correctWrongCount: chartData.correctWrongCount,
            };
            chartOptionList.push(chartObj);
          } else if (chartData.chartType == enumUtil.responseTypes.RESPONSES_TYPE_MULTIPLE) {
            let x_axis = 'Question Options';
            if (chartData.type == enumUtil.questionTypes.RATING_BAR) {
              x_axis = 'Rates';
            }
            var dataList = [[x_axis, 'responsesCount', { role: 'style' }]];
            for (let dataValue of chartData.responses) {
              var color = '#4287f5';
              var data = [dataValue.label, dataValue.y, color];
              dataList.push(data);
            }
            let chartObj = {
              questionName: chartData.name,
              questionType: chartData.type,
              totalResponsesCount: chartData.totalResponses,
              chartData: dataList,
              chartType: enumUtil.chartNames.BAR_CHART,
              step: chartData.step,
              correctWrongCount: chartData.correctWrongCount,
            };
            chartOptionList.push(chartObj);
          } else if (chartData.chartType == enumUtil.responseTypes.RESPONSES_TYPE_BINARY) {
            let chartObj = {
              questionName: chartData.name,
              questionType: chartData.type,
              totalResponsesCount: chartData.totalResponses,
              chartData: chartData.responses,
              chartType: 'PieChart',
              step: chartData.step,
              correctWrongCount: chartData.correctWrongCount,
            };
            chartOptionList.push(chartObj);
          } else {
            var dataList = [];
            if (chartData.responses !== null) {
              dataList = [chartData.responses[0].label, chartData.responses[0].y];
            }
            let chartObj = {
              questionName: chartData.name,
              questionType: chartData.type,
              totalResponsesCount: chartData.totalResponses,
              chartData: dataList,
              chartType: 'text',
              step: chartData.step,
              correctWrongCount: chartData.correctWrongCount,
            };
            chartOptionList.push(chartObj);
          }
        }
        dispatch(
          getSurveyResponsesGraphicalSuccess({ ...responseData, chartData: chartOptionList }),
        );
        dispatch(getSurveyResponsesError(''));
      })
      .catch((error) => {
        const failed = 'Error in getting the survey responses';
        dispatch(getSurveyResponsesError(failed));
        dispatch(getSurveyResponsesGraphicalSuccess([]));
        toast.error(failed, {
          position: 'top-center',
        });
        return;
      });
  };
};

export const saveTitle = (title) => {
  return (dispatch) => {
    dispatch({ type: SAVE_TITLE, payload: { ...title } });
  };
};

export const saveDescription = (description) => {
  return (dispatch) => {
    dispatch({ type: SAVE_DESCRIPTION, payload: { ...description } });
  };
};

export const updateTitle = (title) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_SURVEY_TITLE, payload: title });
  };
};

export const updateDescription = (description) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_SURVEY_DESCRIPTION, payload: description });
  };
};

export const pubLishSurvey = (value) => {
  return (dispatch) => {
    dispatch({ type: PUBLISH_SURVEY, payload: value });
  };
};

export const saveSurvey = (survey, header) => {
  return (dispatch) => {
    dispatch({ type: IS_SAVING, payload: true });
    return axios
      .post(`${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${SURVEY_END_POINT}/`, survey, {
        headers: header,
      })
      .then((res) => {
        toast.success('New Survey created successfully', {
          position: 'top-right',
        });
        if (res.data.data?.surveyId) {
          dispatch(viewSurvey(res.data.data?.surveyId, header));
          dispatch(clearAllSurveyData());
        }
        dispatch({ type: IS_SAVING, payload: false });
      })
      .catch((error) => {
        dispatch({ type: IS_SAVING, payload: false });
        toast.error(error, {
          position: 'top-right',
        });
      });
  };
};

export const saveTemplate = (template, header) => {
  return (dispatch) => {
    return axios
      .post(`${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${SURVEY_END_POINT}/`, template, {
        headers: header,
      })
      .then((res) => {
        toast.success('New Template created successfully', {
          position: 'top-right',
        });
        dispatch(setCanSaveTemplate(false));
      })
      .catch((error) => {
        toast.error(error.response.data?.data || error, {
          position: 'top-right',
        });
      });
  };
};

export const clearAllSurveyData = () => {
  return (dispatch) => {
    dispatch(resetSplashScrConfig());
    dispatch(resetSurveyConfigurationColors());
    dispatch(setQuestionList([]));
    dispatch(resetSurveyDates());
    dispatch({ type: CLEAR_SURVEY });
    dispatch({ type: CLEAR_SURVEY_DATA });
  };
};

export const viewSurveyFromDashboard = (surveyId, header) => {
  return (dispatch) => {
    return axios
      .get(`${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${SURVEY_END_POINT}/${surveyId}`, {
        headers: header,
      })
      .then((res) => {
        const response = res.data.data;

        dispatch({ type: VIEW_SURVEY, payload: response.survey[0] });
        dispatch({
          type: GET_SURVEY_QUESTIONS_SUCCESS,
          payload: response.questions.data,
        });
        dispatch({
          type: GET_SURVEY_CONDITIONAL_QUESTIONS_SUCCESS,
          payload: response.conditionalQuestionList,
        });
        dispatch({
          type: SET_IS_UPDATE_SHEET,
          payload: {
            questionTitleChanged: false,
            questionSequenceChanged: false,
          },
        });
        response.survey[0].type === 'QUIZ'
          ? (window.location = '#/survey-management/update-quiz?fromDashBoard=true')
          : (window.location = '#/survey-management/update-survey?fromDashBoard=true');
      })
      .catch((error) => {
        console.error('error update: ', error.response);
      });
  };
};

export const viewSurvey = (surveyId, header) => {
  return (dispatch) => {
    return axios
      .get(`${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${SURVEY_END_POINT}/${surveyId}`, {
        headers: header,
      })
      .then((res) => {
        const response = res.data.data;

        dispatch({ type: VIEW_SURVEY, payload: response.survey[0] });
        dispatch({
          type: GET_SURVEY_QUESTIONS_SUCCESS,
          payload: response.questions.data,
        });
        dispatch({
          type: GET_SURVEY_CONDITIONAL_QUESTIONS_SUCCESS,
          payload: response.conditionalQuestionList,
        });
        dispatch({
          type: SET_IS_UPDATE_SHEET,
          payload: {
            questionTitleChanged: false,
            questionSequenceChanged: false,
          },
        });
        response.survey[0].type === 'QUIZ'
          ? (window.location = '#/survey-management/update-quiz')
          : (window.location = '#/survey-management/update-survey');
      })
      .catch((error) => {
        console.error('error update: ', error.response);
      });
  };
};

export const createNewFromTemplate = (surveyId, header) => {
  return (dispatch) => {
    return axios
      .get(`${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${SURVEY_END_POINT}/${surveyId}`, {
        headers: header,
      })
      .then((res) => {
        const response = res.data.data;

        dispatch({ type: CREATE_FROM_TEMPLATE, payload: response.survey[0] });
        const tempQuestions =
          response?.questions?.data.map((item) => {
            delete item.questionId;
            delete item.surveyId;
            return item;
          }) || [];

        dispatch({
          type: SET_QUESTION__LIST,
          payload: tempQuestions,
        });
        dispatch({
          type: SET_IS_UPDATE_SHEET,
          payload: {
            questionTitleChanged: false,
            questionSequenceChanged: false,
          },
        });
        response.survey[0].type === 'QUIZ'
          ? (window.location = '#/survey-management/add-new-quiz')
          : (window.location = '#/survey-management/add-new-survey');
      })
      .catch((error) => {
        console.error('error update: ', error.response);
      });
  };
};

export const updateSurvey = (survey, header) => {
  return (dispatch) => {
    dispatch({ type: IS_SAVING, payload: true });
    return axios
      .put(`${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${SURVEY_END_POINT}/${survey.surveyId}`, survey, {
        headers: header,
      })
      .then((res) => {
        toast.success('Survey successfully updated', {
          position: 'top-right',
        });
        dispatch({ type: IS_SAVING, payload: false });
        dispatch(viewSurvey(survey.surveyId, header));
      })
      .catch((error) => {
        console.error('updateSurveyActionError: ', error.response);
        toast.error('Error occurred', {
          position: 'top-right',
        });
        dispatch({ type: IS_SAVING, payload: false });
      });
  };
};

export const sendGoogleSheetIntegrationRequest = (surveyId, header) => {
  return axios
    .post(`${process.env.REACT_APP_GOOGLE_SHEET_URL}get-authorization-url`, {
      survey_id: surveyId,
      headers: header,
    })
    .then((response) => {
      if (response.data.is_success) {
        window.location.href = response.data.data.authorization_url;
      }
    })
    .catch((error) => {
      toast.error(error.response.data.message, {
        position: 'top-right',
      });
    });
};

export const revokeLoginCredentials = (surveyId, header) => {
  return axios.post(`${process.env.REACT_APP_GOOGLE_SHEET_URL}disconnect-account`, {
    survey_id: surveyId,
    headers: header,
  });
};

export const googleSheetIsIntegratedAction = (surveyId) => {
  return axios.post(`${process.env.REACT_APP_GOOGLE_SHEET_URL}is-google-sheet-integrated`, {
    survey_id: surveyId,
  });
};

export const submitDetailsAction = (sheetTitle, surveyId, header) => {
  return axios
    .post(
      `${process.env.REACT_APP_BCONIC_SURVEY_URI}admin/synchronize-google-sheet`,
      {
        title: sheetTitle,
        surveyId: surveyId,
      },
      { headers: header },
    )
    .then((response) => {
      toast.info('Successfully Synchronized', {
        position: 'top-right',
      });
    })
    .catch((error) => {
      toast.error(error.response.data.description, {
        position: 'top-right',
      });
    });
};

/**
 *
 * @param {String} url
 * @param {String} fileName
 * @param {Boolean} isAddsurvey
 * @param {Object} header
 * @returns { Promise}
 */
export const setImageUrl = (url, fileName, isAddsurvey, header) => {
  //--- stop uploading if there are no files in the browser memory, ie: no files to upload OR change
  if (!/^blob:http/.test(url)) return async (dispatch) => Promise.resolve();
  return async (dispatch) => {
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

        if (isAddsurvey) {
          dispatch(changeSurveyBackgroundImageUrl({ url: newUrl, fileName }));
        } else {
          dispatch(updateSurveyBackgroundImageUrl({ url: newUrl, fileName }));
        }
      })
      .catch((error) => {
        toast.error('cannot Upload', {
          position: 'top-right',
        });
        return Promise.reject();
      });
  };
};

export const changeValidations = (payload) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_VALIDATIONS, payload: payload });
  };
};

export const updateValidations = (payload) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_VALIDATIONS, payload: payload });
  };
};

export const addConditionalQuestion = (payload) => {
  return (dispatch) => {
    dispatch({ type: ADD_CONDITIONAL_QUESTION, payload: payload });
  };
};

export const updateConditionalQuestion = (payload) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_CONDITIONAL_QUESTION, payload: payload });
  };
};
