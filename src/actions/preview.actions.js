import axios from 'axios';
import { toast } from 'react-toastify';
import {
  SET_STEP_COUNT,
  PREVIEW_SURVEY_FETCH_SURVEY,
  PREPARE_RESPONSE_LIST,
  PREPARE_TEXT_RESPONSE_MAP,
  HANDLE_SUBMIT_ERRORS,
  SET_STEP,
  SET_VALUE,
  SET_QUESTIONS,
  RESET_PREVIEW_SURVEY,
  SET_QUESTION_ANSWER,
  FILTER_QUESTIONS,
} from './types';

import {
  AUTH_ENDPOINT,
  BCONIC_SURVEY_URI,
  QUESTION_END_POINT,
  SURVEY_END_POINT,
  TRACECLAW_USERS_END_POINT,
  ANSWER_END_POINT,
  USER_API,
} from '../store/constant';
import cookie from 'react-cookies';
import enumerations from '../util/enumerations';
import { detect } from 'detect-browser';
import publicIp from 'public-ip';

export const handleSubmitErrors = () => {
  return (dispatch) => {
    dispatch({ type: HANDLE_SUBMIT_ERRORS, payload: true });
  };
};
export const getSurvey = (surveyId, header, qrCodeId, userId, textResponseMap) => {
  return async (dispatch) => {
    dispatch({ type: RESET_PREVIEW_SURVEY });
    axios
      .get(`${BCONIC_SURVEY_URI}${USER_API}${SURVEY_END_POINT}/${surveyId}`, {
        headers: header,
      })
      .then(async (res) => {
        let surveyObj = res.data.data[0];
        let step;

        if (surveyObj.isEnableSplashScr === false) {
          step = 0;
        } else {
          step = -1;
        }

        let surveyData = {
          surveyObj: surveyObj,
          step: step,
          customErrorMsg: null,
        };

        if (new Date() > new Date(surveyObj.endAt) || !surveyObj.isPublished) {
          const failed = !surveyObj.isPublished
            ? 'Oops, looks like the survey/form you’re trying to open is unavailable. The survey/form creator may have  made it temporarily unavailable. Please try again later'
            : 'Sorry, the survey is expired!!!';
          toast.error(failed, {
            position: 'top-center',
          });
          surveyData.step = step + 3;
          surveyData.customErrorMsg = 'Sorry, the survey is expired!!!';
          dispatch(handleSubmitErrors());
        } else {
          dispatch(prepareResponseList(surveyObj.questions, textResponseMap));
          dispatch({ type: SET_QUESTIONS, payload: surveyObj.questions });
          dispatch({
            type: SET_STEP_COUNT,
            payload: surveyObj.questions.length,
          });
        }
        dispatch({ type: PREVIEW_SURVEY_FETCH_SURVEY, payload: surveyData });
        return;
      })
      .catch((error) => {
        const failed = 'Error Occurred!!';
        toast.error(failed, {
          position: 'top-center',
        });
      });
  };
};

export const getQuestionList = async (questions, surveyId, header, userId, textResponseMap) => {
  let defaultURL = `${BCONIC_SURVEY_URI}${USER_API}${SURVEY_END_POINT}/${surveyId}/${QUESTION_END_POINT}/`;
  if (userId !== null) {
    defaultURL += `${TRACECLAW_USERS_END_POINT}/${userId}`;
  }
  return async (dispatch) => {
    await axios
      .get(defaultURL, {
        headers: header,
      })
      .then(async (res) => {
        try {
          let questionObjList = res.data.data;
          dispatch({ type: SET_QUESTIONS, payload: questionObjList });
          dispatch({ type: SET_STEP_COUNT, payload: questionObjList.length });
          dispatch(prepareResponseList(questionObjList, textResponseMap));
          return;
        } catch (error) {
          const failed = 'Error Occurred!!';
          toast.error(failed, {
            position: 'top-center',
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: 'top-center',
        });
      });
  };
};

export const prepareResponseList = (questionObjList, textResponseMap) => {
  return (dispatch) => {
    let responseList_ = [];
    for (let questionObj of questionObjList) {
      let responseObj = {
        questionId: '',
        questionName: '',
        type: questionObj.type,
        answer: [],
        value: [],
        useragent: 'POSTMAN',
        ipAddress: '0.1.1.0',
      };
      responseObj.questionId = questionObj.questionId;
      responseObj.questionName = questionObj.name;
      //Cant understand the logic here
      // if (questionObj.type == enumerations.questionTypes.LINE_TEXT) {
      //   responseObj.answer = questionObj.questionAnswers;
      //   responseObj.value = questionObj.questionAnswers;
      // }
      responseList_.push(responseObj);
    }

    dispatch({ type: PREPARE_RESPONSE_LIST, payload: responseList_ });
    dispatch(setDefaultTextValues(questionObjList, responseList_, textResponseMap));
    return;
  };
};

export const setDefaultTextValues = (questionObjList, responseList_, textResponseMap) => {
  return (dispatch) => {
    for (let questionObj of questionObjList) {
      let value = '';
      let questionId = questionObj.questionId;
      if (value !== null && value.length !== 0) {
        dispatch(handleOnChange(questionId, value, value, responseList_));
        dispatch(handleTextChange(questionId, value, textResponseMap));
      } else {
        if (questionObj.hasOwnProperty('mappedCol') && questionObj['mappedCol'] !== null) {
          let cookie_Val = cookie.load(questionObj['mappedCol']);
          let answerArr = [];
          if (cookie_Val && cookie_Val.length > 0) {
            answerArr.push(cookie_Val);
            this.handleOnChange(questionId, answerArr, answerArr, responseList_);
            dispatch(handleTextChange(questionId, answerArr, textResponseMap));
          }
        }
      }
    }
    return;
  };
};

export const handleOnChange = (questionId, answer, value, responseList_) => {
  return (dispatch) => {
    let index = 0;
    for (let responseObj of responseList_) {
      if (responseObj.questionId === questionId) {
        responseList_[index].answer = answer;
        responseList_[index].value = value;
        dispatch({ type: PREPARE_RESPONSE_LIST, payload: responseList_ });
      }
      index++;
    }
    return;
  };
};

export const handleTextChange = (questionId, value, textResponseMap) => {
  return (dispatch) => {
    let textResponseMapTmp = textResponseMap;
    //textResponseMapTmp.set(questionId, value);
    //we cant store Maps in redux store  therefore we should do it as an object
    textResponseMapTmp[questionId] = value;
    dispatch({ type: PREPARE_TEXT_RESPONSE_MAP, payload: textResponseMapTmp });
    return;
  };
};

export const setStep = (step) => {
  return (dispatch) => {
    dispatch({ type: SET_STEP, payload: step });
    return;
  };
};

export const setValue = (value) => {
  return (dispatch) => {
    dispatch({ type: SET_VALUE, payload: value });
    return;
  };
};

export const setQuestionAnswer = (value) => {
  return (dispatch) => {
    dispatch({ type: SET_QUESTION_ANSWER, payload: value });
    return;
  };
};

export const handleCheckBoxList = (questionObj, questionObjList) => {
  return (dispatch) => {
    let list_ = questionObjList;
    let index = 0;
    for (let questionObj_ of list_) {
      if (questionObj.questionId === questionObj_.questionId) {
        questionObjList[index] = questionObj;
        break;
      }
      index++;
    }
    dispatch({ type: SET_QUESTIONS, payload: questionObjList });
    return;
  };
};

export const setQuestionObj = (questionObj, questionObjList) => {
  return (dispatch) => {
    let list_ = [];
    for (let option of questionObj.questionAnswers) {
      option.isChecked = false;
      list_.push(option);
    }
    questionObj.optionList = list_;
    dispatch(handleCheckBoxList(questionObj, questionObjList));
    return;
  };
};

export const addResponse = (
  step,
  surveyPropObj,
  questionObjList,
  responseList,
  userId,
  locationId,
  surveyId,
  headers,
  locationDisplayName,
) => {
  return async (dispatch) => {
    try {
      let answerList = [];
      const browser = new detect();
      if (!browser) {
        dispatch(handleSubmitErrors());
        const failed = 'Sorry browser is not supported';
        toast.error(failed, {
          position: 'top-center',
        });
        dispatch(setStep(step + 2));
      }
      let publicIp_ = '';
      await publicIp.v4().then((ip) => {
        publicIp_ = ip;
      });
      let questionList_ = questionObjList;
      for (let response of responseList) {
        let responseObj = {
          questionId: '',
          answer: [],
          actualAnswer: [],
          useragent: 'POSTMAN',
          ipAddress: '0.1.1.0',
        };
        let answerArr = [];
        let actualAnswerArr = [];
        if (
          response.type === enumerations.questionTypes.CHECKBOX ||
          response.type === enumerations.questionTypes.LONG_LIST_MULTIPLE
        ) {
          const answeredCheckBoxes = [];
          for (let answer of response.answer) {
            if (answer.isChecked) {
              answerArr.push(answer.questionAnswerId);
              answeredCheckBoxes.push(answer.value);
            }
          }
          actualAnswerArr.push(answeredCheckBoxes.join(' '));
        } else if (
          response.type === enumerations.questionTypes.RADIO_BUTTON ||
          response.type === enumerations.questionTypes.LONG_LIST
        ) {
          for (let answer of response.answer) {
            answerArr.push(answer);
          }
          for (let value of response.value) {
            actualAnswerArr.push(value);
          }
        } else if (response.type === enumerations.questionTypes.RATING_BAR) {
          answerArr.push(response.answer);
          actualAnswerArr.push(response.answer[0]);
        } else {
          answerArr.push(response.answer);
          actualAnswerArr.push(response.answer);
        }
        responseObj.questionId = response.questionId;
        for (let question of questionList_) {
          if (question.questionId === response.questionId && question.hasOwnProperty('mappedCol')) {
            if (question['mappedCol'] !== null) {
              const expires = new Date();
              expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
              cookie.remove(question['mappedCol'], { path: '/' });
              cookie.save(question['mappedCol'], answerArr, {
                path: '/',
                expires,
                maxAge: 1000 * 60 * 60 * 24 * 14,
              });
            }
          }
        }
        responseObj.actualAnswer = actualAnswerArr;
        responseObj.answer = answerArr;
        responseObj.useragent = browser.name;
        responseObj.ipAddress = publicIp_;
        answerList.push(responseObj);
      }
      let metadata = {
        userId: userId,
        locationId: locationId,
      };

      let modifiedAnswer = {
        metadata,
        answers: answerList,
      };
      await axios
        .post(
          `${BCONIC_SURVEY_URI}${AUTH_ENDPOINT}${ANSWER_END_POINT}/${surveyId}`,
          modifiedAnswer,
          {
            headers: headers,
          },
        )
        .then((res) => {
          if (surveyPropObj.type === enumerations.surveyTypes.QUIZ) {
            dispatch(setValue(res.data.data));
          }
          if (
            locationDisplayName == null ||
            locationDisplayName == '' ||
            locationDisplayName == undefined
          ) {
            toast.success('Answer Submitted Successfully', {
              position: 'top-center',
            });
          } else {
            //this.setSuccessMsg(locationDisplayName);
          }
          return;
        })
        .catch((error) => {
          dispatch(handleSubmitErrors());
          toast.error(error, {
            position: 'top-center',
          });
        });
    } catch (error) {
      dispatch(handleSubmitErrors());
      dispatch(setStep(step + 2));
    }
  };
};

export const filterQuestions = (value) => {
  return (dispatch) => {
    return dispatch({ type: FILTER_QUESTIONS, payload: value });
  };
};
