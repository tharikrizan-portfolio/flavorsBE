import React from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LanguageIcon from '@material-ui/icons/Language';
import { createNewFromTemplate } from '../../../actions/survey.actions';
import { useDispatch, useSelector } from 'react-redux';

const TemplateCard = ({ template }) => {
  const dispatch = useDispatch();
  const headers = useSelector((state) => state.userData?.user?.headers || '');
  
  return (
    <Grid item xs={12} lg={3}>
      <div
        className="template-card"
        style={{
          position: 'relative',
          backgroundImage: `url(${template?.configurationData?.surveyBackgroundImageUrl}`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        onClick={() => dispatch(createNewFromTemplate(template.surveyId, headers))}
      >
        <div
          className="bg"
          style={{
            backgroundColor: template?.colorSchema?.question_scr || '#FFFFFF',
            opacity: template?.configurationData?.surveyBackgroundImageUrl
              ? template?.configurationData?.surveyBackgroundImageOpacity || 0
              : 1,
          }}
        />
        <IconButton className="template-icon">
          {template.accountId ? <AccountCircleIcon /> : <LanguageIcon />}
        </IconButton>
        <div style={{ textAlign: 'center', marginTop: '10%' }}>
          <Typography
            style={{ color: template?.colorSchema?.title_font || '#1E94A5' }}
            variant={'h4'}
          >
            Title
          </Typography>
          <Typography
            style={{ color: template?.colorSchema?.subtitle_font || '#6E80AE' }}
            variant={'h6'}
            gutterBottom
          >
            Description
          </Typography>
        </div>
        <div className="template-name-bar">
          <Typography variant={'subtitle1'} gutterBottom>
            {template.templateName}
          </Typography>
        </div>
      </div>
    </Grid>
  );
};

TemplateCard.propTypes = {
  template: PropTypes.object,
};

export default TemplateCard;
