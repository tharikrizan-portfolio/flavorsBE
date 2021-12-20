import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { Typography } from '@material-ui/core';
import ShadowScrollbar from '../ShadowScrollBar/ShadowScrollBar';

const TextView = ({ responses }) => {
  return (
    <ShadowScrollbar
      style={{
        height: '350px',
      }}
      shadowColor="grey"
      scrollColor="grey"
    >
      {responses.map((item) => (
        <div className="summary-card-text-view">
          <Typography variant={'subtitle2'} gutterBottom>
            {item}
          </Typography>
        </div>
      ))}
    </ShadowScrollbar>
  );
};

TextView.propTypes = {
  chartData: PropTypes.array,
};

export default TextView;
