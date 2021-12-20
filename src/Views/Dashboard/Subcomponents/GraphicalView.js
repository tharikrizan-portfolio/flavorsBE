import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Typography } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ChartList from './ChartList';
import renderHTML from 'react-render-html';

const GraphicalView = ({ onBack, selectedSurvey, chartOptionList }) => {
  const { title, purpose, totalResponses, chartData, type } = chartOptionList;

  return (
    <>
      <div className="title-with-button ">
        <div className="flex">
          <IconButton onClick={() => onBack()}>
            <NavigateBeforeIcon fontSize="large" color="primary" />
          </IconButton>
          <Typography variant={'h6'} gutterBottom>
            {selectedSurvey?.type === 'QUIZ' ? 'Quiz Summary' : 'Survey Summary'}
          </Typography>
        </div>
        <Typography variant={'h6'} gutterBottom>
          Total Responses : {totalResponses}
        </Typography>
      </div>

      <div className="rounded-card mt-15 grey-background" style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center' }}>
          <span>{renderHTML(title)}</span>
          <span>{renderHTML(purpose)}</span>
        </div>
      </div>
      <ChartList values={chartData} type={type} />
    </>
  );
};

GraphicalView.propTypes = {};

export default GraphicalView;
