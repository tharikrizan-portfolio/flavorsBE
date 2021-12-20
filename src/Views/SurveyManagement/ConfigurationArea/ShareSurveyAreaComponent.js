import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';
import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import SurveyDates from '../../components/common/SurveyDates/SurveyDates';
import LinkTabComponent from '../../components/ShareSurvey/LinkTabComponent';
import { pubLishSurvey } from '../../../actions/survey.actions';
import { updatePublishSurvey } from '../../../actions/updateQuestion.actions';
import { useDispatch } from 'react-redux';
import MaterialButton from '../../components/common/Buttons/MaterialButton';
import { makeStyles } from '@material-ui/core';

const ShareSurveyAreaComponent = ({ isAddSurvey }) => {
  const dispatch = useDispatch();
  const isPublished = useSelector((state) =>
    isAddSurvey ? state.addSurveyObj.survey.isPublished : state.updateSurveyObj.survey.isPublished,
  );

  const surveyId = useSelector((state) => !isAddSurvey && state.updateSurveyObj.survey.surveyId);
  const server = window.location.host;
  const surveyLink = `http://${server}/#/preview/${surveyId}/link`;

  const useStyles = makeStyles((theme) => ({
    MaterialButton: {
      color: theme.palette.warning,
    },
  }));
  return (
    <>
      <div className="rounded-card">
        <h4>Publish Survey</h4>
        <div className="share-survey-date-section">
          <SurveyDates isAddSurvey={isAddSurvey} />
          <div className="share-survey-publish-toggle">
            <span className="float-left publish-description" style={{ padding: '10px' }}>
              {isPublished
                ? 'This survey is in published state. Please press unpublish button to edit the survey.'
                : 'This survey is in unpublished state. Please press publish button to publish the survey.'}
            </span>
            <MaterialButton
              color={isPublished ? 'secondary' : 'primary'}
              className={`global-class-name float-right publish-button ${
                isPublished ? 'warning' : ''
              }`}
              label={isPublished ? 'UNPUBLISH' : 'PUBLISH'}
              handleClick={() => {
                isAddSurvey
                  ? dispatch(pubLishSurvey(!isPublished))
                  : dispatch(updatePublishSurvey(!isPublished));
              }}
            />
          </div>
        </div>
        <br />
      </div>
      <div className={`rounded-card ${!isPublished ? 'share-survey-inactive' : ''} `}>
        <h4>Share Survey</h4>
        <LinkTabComponent isPublished={true} surveyLink={surveyLink} />
      </div>
    </>
  );
};

ShareSurveyAreaComponent.propTypes = {
  description: PropTypes.string,
  onChangeDescription: PropTypes.func,
  isMultipleResponse: PropTypes.bool,
  changePostSurveyMultipleResponse: PropTypes.func,
};

export default ShareSurveyAreaComponent;
