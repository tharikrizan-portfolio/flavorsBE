import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import uiReducer from './ui.reducer';
import surveyReducer from './survey.reducer';
import summaryReducer from './summary.reducer';
import updateSurveyReducer from './updateSurvey.reducer';
import previewReducer from './preview.reducer';
import addSurveyReducer from './addSurvey.reducer';
import templateReducer from './template.reducer';

export default combineReducers({
  userData: userReducer,
  uiData: uiReducer,
  surveyData: surveyReducer,
  summaryData: summaryReducer,
  previewSurvey: previewReducer,
  updateSurveyObj: updateSurveyReducer,
  addSurveyObj: addSurveyReducer,
  template: templateReducer,
});
