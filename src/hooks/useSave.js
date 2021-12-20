import React from 'react';
import { toast } from 'react-toastify';
import helper from '../util/helper';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAllSurveyData,
  saveSurvey,
  saveTemplate,
  setImageUrl,
  updateSurvey,
  viewSurvey,
} from '../actions/survey.actions';
import { setImageUrlOfQuestions } from '../actions/question.actions';
import store from '../store';
import { updatePostSurveyDescription } from '../actions/postSurveyConfiguration.actions';

export const useSave = ({ isAddSurvey, isQuiz }) => {
  const MAX_CHARACTER_LENGTH = 150;
  const dispatch = useDispatch();
  const headers = useSelector((state) => state.userData.user.headers || '');

  const errorState = useSelector((state) =>
    isAddSurvey ? state.addSurveyObj.errorState : state.updateSurveyObj.errorState,
  );
  const surveyObj = useSelector((state) =>
    isAddSurvey ? state.addSurveyObj.survey : state.updateSurveyObj.survey,
  );

  const questions = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.questions.questionList
      : state.updateSurveyObj.surveyQuestions.data,
  );

  const isSaveInProgress = useSelector((state) => state?.addSurveyObj?.isSaveInProgress || false);

  const validate = () => {
    const titleValue = helper.convertHtmlTextToString(surveyObj.title);
    const purposeValue = helper.convertHtmlTextToString(surveyObj.purpose);

    if (titleValue.length < 1) {
      return toast.error('Title is required', { position: 'top-right' });
    }

    if (titleValue.length > MAX_CHARACTER_LENGTH) {
      return toast.error('Title cannot be greater than 150 characters', { position: 'top-right' });
    }

    if (purposeValue.length < 1) {
      return toast.error('Description is required', {
        position: 'top-right',
      });
    }

    if (purposeValue.length > MAX_CHARACTER_LENGTH) {
      return toast.error('Description cannot be greater than 150 characters', {
        position: 'top-right',
      });
    }

    if (questions.length === 0) {
      return toast.error('Should At least have one question', {
        position: 'top-right',
      });
    }

    //--- validate the startAt and endAt dates
    if (moment(surveyObj.startDate).valueOf() > moment(surveyObj.endAt).valueOf()) {
      return toast.error('Start date cannot be greater than the end date', {
        position: 'top-right',
      });
    }

    for (const questionObj of questions) {
      if (questionObj.name.length < 1) {
        return toast.error('Cannot contain empty question title', {
          position: 'top-right',
        });
      }
      if (questionObj.name.length > MAX_CHARACTER_LENGTH) {
        return toast.error('Question title should be less than 150 characters', {
          position: 'top-right',
        });
      }
      for (let i = questionObj.questionAnswers.length - 1; i >= 0; i--) {
        if (!questionObj.questionAnswers[i].name) {
          questionObj.questionAnswers.splice(i, 1);
        }
      }
    }
  };

  const OnSaveSurvey = async (e, values = {}) => {
    const temp = e?.preventDefault();

    validate();
    try {
      await dispatch(
        setImageUrl(
          surveyObj.configurationData.surveyBackgroundImageUrl,
          surveyObj.configurationData?.fileName,
          isAddSurvey,
          headers,
        ),
      );

      await dispatch(setImageUrlOfQuestions(questions, headers, isAddSurvey));
    } catch (error) {
      return toast.error('Could not save Background Images', {
        position: 'top-right',
      });
    }

    const storeSurveyObj = isAddSurvey
      ? store.getState().addSurveyObj
      : store.getState().updateSurveyObj;
    const questionList = isAddSurvey
      ? storeSurveyObj.questions.questionList
      : storeSurveyObj.surveyQuestions.data;
    const configurationData = storeSurveyObj.survey.configurationData;
    const colorSchema = storeSurveyObj.survey.colorSchema;
    const postSubmissionData = storeSurveyObj.survey.postSubmissionData;
    const sharingData = storeSurveyObj.survey.sharingData;
    const { conditionalQuestionList } = storeSurveyObj;

    const newSurvey = {
      title: surveyObj.title,
      type: isQuiz ? 'QUIZ' : 'SURVEY',
      purpose: surveyObj.purpose,
      startAt: surveyObj.startAt,
      endAt: surveyObj.endAt,
      isPublished: surveyObj.isPublished,
      colorSchema: colorSchema,
      configurationData: configurationData,
      sharingData: sharingData,
      postSubmissionData: postSubmissionData,
      questionList: questionList,
      metadata: surveyObj.metadata,
      conditionalQuestionList,
      ...values,
    };
    try {
      isAddSurvey
        ? dispatch(saveSurvey(newSurvey, headers))
        : dispatch(updateSurvey({ ...newSurvey, surveyId: surveyObj.surveyId }, headers));
    } catch (error) {
      return toast.error('Survey Could not save', {
        position: 'top-right',
      });
    }
  };

  const OnSaveTemplate = async ({ e, templateName }) => {
    e.preventDefault();

    validate();
    try {
      await dispatch(
        setImageUrl(
          surveyObj.configurationData.surveyBackgroundImageUrl,
          surveyObj.configurationData?.fileName,
          isAddSurvey,
          headers,
        ),
      );

      await dispatch(setImageUrlOfQuestions(questions, headers, isAddSurvey));
    } catch (error) {
      return toast.error('Could not save Background Images', {
        position: 'top-right',
      });
    }

    const storeSurveyObj = store.getState().addSurveyObj;
    const questionList = storeSurveyObj.questions.questionList;
    const configurationData = storeSurveyObj.survey.configurationData;
    const colorSchema = storeSurveyObj.survey.colorSchema;

    const newTemplate = {
      title: surveyObj.title,
      type: isQuiz ? 'QUIZ' : 'SURVEY',
      purpose: surveyObj.purpose,
      startAt: surveyObj.startAt,
      endAt: surveyObj.endAt,
      colorSchema: colorSchema,
      configurationData: configurationData,
      is_enable_splash_scr: surveyObj.isEnableSplashScr,
      questionList: questionList,
      templateName: templateName,
      isTemplate: true,
    };

    try {
      dispatch(saveTemplate(newTemplate, headers));
    } catch (error) {
      return toast.error('Survey Could not save', {
        position: 'top-right',
      });
    }
  };

  const handleDiscard = () => {
    dispatch(clearAllSurveyData());
    if (!isAddSurvey) {
      dispatch(updatePostSurveyDescription(''));
      dispatch(viewSurvey(surveyObj.surveyId, headers));
    }
  };

  return { errorState, handleDiscard, OnSaveSurvey, isSaveInProgress, OnSaveTemplate };
};
