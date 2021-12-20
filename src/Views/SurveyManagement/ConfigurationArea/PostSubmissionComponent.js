import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changePostSurveyDescription,
  updatePostSurveyDescription,
  changePostSurveyMultipleResponse,
  updatePostSurveyMultipleResponse,
} from '../../../actions/postSurveyConfiguration.actions';
import CustomEditor from '../../components/common/Inputs/CustomEditor';

const PostSubmissionComponent = ({ isAddSurvey }) => {
  const description = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.survey.postSubmissionData?.description || 'Thank you for the response !'
      : state.updateSurveyObj.survey.postSubmissionData?.description,
  );
  const isMultipleResponse = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.survey.postSubmissionData?.isMultipleResponse
      : state.updateSurveyObj.survey.postSubmissionData?.isMultipleResponse,
  );

  const dispatch = useDispatch();
  const onChangeDescription = (data) => {
    isAddSurvey
      ? dispatch(changePostSurveyDescription(data))
      : dispatch(updatePostSurveyDescription(data));
  };

  const onChangePostSurveyMultipleResponse = (data) => {
    isAddSurvey
      ? dispatch(changePostSurveyMultipleResponse(data))
      : dispatch(updatePostSurveyMultipleResponse(data));
  };
  return (
    <div className="rounded-card">
      <h4>Post Submission</h4>
      <div className="response-message">
        <CustomEditor
          textAlign="center"
          content={description}
          onChange={onChangeDescription}
          placeholder="Description..."
        />
      </div>
      <br />
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={isMultipleResponse}
              onChange={() => onChangePostSurveyMultipleResponse(!isMultipleResponse)}
            />
          }
          label="Enable Multiple Response"
        />
      </FormGroup>
    </div>
  );
};

PostSubmissionComponent.propTypes = {
  isAddSurvey: PropTypes.bool,
};

export default PostSubmissionComponent;
