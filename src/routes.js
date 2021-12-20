import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Views/Dashboard/Default'));
const AddNewSurvey = React.lazy(() => import('./Views/SurveyManagement/AddNewSurvey'));

const UpdateSurvey = React.lazy(() => import('./hoc/updateSurveyHoc'));
const AddQuizHoc = React.lazy(() => import('./hoc/addQuizHoc'));
const UpdateQuizHoc = React.lazy(() => import('./hoc/updateQuizHoc'));
const ViewSurveys = React.lazy(() => import('./Views/SurveyOverview/Surveys'));
const SurveyResponses = React.lazy(() => import('./Views/SurveyOverview/SurveyResponses'));
const SurveyResponsesGraph = React.lazy(() =>
  import('./Views/SurveyOverview/SurveyResponsesGraph'),
);

const Profile = React.lazy(() => import('./Views/ProfileManagement/Profile'));
const TemplateView = React.lazy(() => import('./Views/Templates/TemplateView'));


const routes = [
  {
    path: '/survey-management/add-new-quiz',
    exact: true,
    name: 'Quiz',
    component: AddQuizHoc,
  },
  {
    path: '/dashboard',
    exact: true,
    name: 'Default',
    component: DashboardDefault,
  },
  {
    path: '/survey-management/add-new-survey',
    exact: true,
    name: 'Add New Survey',
    component: AddNewSurvey,
  },
  {
    path: '/survey-overview/view-surveys',
    exact: true,
    name: 'View Surveys',
    component: ViewSurveys,
  },
  {
    path: '/survey-overview/survey-responses',
    exact: true,
    name: 'Survey Responses',
    component: SurveyResponses,
  },
  {
    path: '/survey-overview/survey-responses-graphical',
    exact: true,
    name: 'Graphical Response View',
    component: SurveyResponsesGraph,
  },
  {
    path: '/survey-management/update-survey',
    exact: true,
    name: 'update survey',
    component: UpdateSurvey,
  },
  {
    path: '/survey-management/update-quiz',
    exact: true,
    name: 'update survey',
    component: UpdateQuizHoc,
  },
  {
    path: '/profile-management/profile',
    exact: true,
    name: 'Profile',
    component: Profile,
  },

  {
    path: '/survey-management/templates',
    exact: true,
    name: 'templates',
    component: TemplateView,
  },
];

export default routes;
