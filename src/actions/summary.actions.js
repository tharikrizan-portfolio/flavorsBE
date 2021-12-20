import { 
    SUMMARY_FAILURE, SUMMARY_SUCCESS, 
    GET_SURVEY_LIST_FOR_TABLE,
    GET_SURVEY_LIST_FOR_TABLE_SUCCESS, 
    GET_SURVEY_LIST_FOR_TABLE_FAIL 
} from "./types";


import { BCONIC_SURVEY_URI, ADMIN_ENDPOINT, SUMMARY_END_POINT, ROUTE_SURVEY_LIST } from '../store/constant.js'
import axios from "axios";
import { toast } from "react-toastify";

//GET SURVEY LIST--------------------------------------
export const getSummarySuccess = (data) => {
    return {
        type: SUMMARY_SUCCESS,
        payload: data,
    };
};

export const getSummaryError = (data) => {
    return {
        type: SUMMARY_FAILURE,
        payload: data,
    };
};

export const getSurveyListForTable = (data) => {
    return {
        type: GET_SURVEY_LIST_FOR_TABLE_SUCCESS,
        payload: data,
    };
};

export const getSummaryDetails = (header) => {
    return (dispatch) => {
        return axios
            .get(`${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${SUMMARY_END_POINT}/`, {
                headers: header,
            })
            .then((response) => {
                let summaryObj = {
                    spam: response.data.data.spam || 0,
                    responded: response.data.data.responded || 0,
                    total: response.data.data.total || 0,
                    published: response.data.data.published || 0,
                    totResponses: response.data.data.totResponses || 0,
                    totalQuizzes: response.data.data.totalQuizzes|| 0,
                    publishedQuizzes: response.data.data.publishedQuizzes|| 0,
                    totalResponsesToQuizzes: response.data.data.totalResponsesToQuizzes|| 0,
                }
                dispatch(getSummarySuccess(summaryObj));
                dispatch(getSummaryError(""));
            })
            .catch((error) => {
                const failed = "Error in getting the summary details";
                dispatch(getSummaryError(failed));
                toast.error(failed, {
                    position: "top-center",
                });
                return;
            });
    };
};

/**
 * Send as get request to the backend to get the list of survey data
 * @param {Object} header header object with auth tokens
 */
export const getSurveyTableInfo = (header) => {
    return (dispatch) => {
        dispatch({
            type: GET_SURVEY_LIST_FOR_TABLE,
        });
        return axios
            .get(`${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${ROUTE_SURVEY_LIST}/`, {
                headers: header,
            })
            .then((response) => {
                dispatch(getSurveyListForTable(response.data.data || []));
            })
            .catch((error) => {
                const failed = "Error in getting the summary details";
                dispatch(getSummaryError(failed));
                dispatch({
                    type: GET_SURVEY_LIST_FOR_TABLE_FAIL,
                    payload:'Error in getting the survey details',
                });
                toast.error(failed, {
                    position: "top-center",
                });
                return;
            });
    };
};
