import React from 'react';
import '../../../App.css';
import PostSubmissionComponent from './PostSubmissionComponent';
import PixelIntegration from './PixelIntegration';
import ShareSurveyAreaComponent from './ShareSurveyAreaComponent';
import ThirdPartyIntegrationComponent from './ThirdPartyIntegrationComponent';
import { Grid } from '@material-ui/core';

const QuestionConfiguration = ({ isAddSurvey, cardColor }) => {
  return (
    <React.Fragment>
      <div>
        <PostSubmissionComponent isAddSurvey={isAddSurvey} />
        <Grid container spacing={0} style={{ width: '98%' }}>
          <Grid item xs={6} style={{ 'margin-right': '-3%' }}>
            <PixelIntegration isAddSurvey={isAddSurvey} />
          </Grid>
          <Grid item xs={6}>
            <ThirdPartyIntegrationComponent cardColor={cardColor} isAddSurvey={isAddSurvey} />
          </Grid>
        </Grid>
        <ShareSurveyAreaComponent isAddSurvey={isAddSurvey} />
      </div>
    </React.Fragment>
  );
};

export default QuestionConfiguration;
