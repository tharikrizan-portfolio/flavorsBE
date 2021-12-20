import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SummaryCard from './SummaryCard';
import { Button, Typography } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const ChartList = ({ values, type }) => {
  const [chartData, setChartData] = useState(values.map((x) => ({ ...x, isExpanded: false })));

  const onCardClick = (index) => {
    chartData[index].isExpanded = !chartData[index].isExpanded;
    setChartData([...chartData]);
  };

  const expandCollapse = (isExpand) => {
    const tempData = chartData.map((x) => {
      x.isExpanded = isExpand;
      return x;
    });
    setChartData([...tempData]);
  };
  return (
    <>
      <span className="title-with-button mb-3">
        <div />
        {chartData.filter((x) => x.isExpanded == true).length > 0 ? (
          <div>
            <Button variant="outlined" onClick={() => expandCollapse(false)}>
              <ExpandLess />
              <Typography variant={'subtitle2'} gutterBottom>
                Collapse All
              </Typography>
            </Button>
          </div>
        ) : (
          <div>
            <Button variant="outlined" onClick={() => expandCollapse(true)}>
              <ExpandMore />
              <Typography variant={'subtitle2'} gutterBottom>
                Expand All
              </Typography>
            </Button>
          </div>
        )}
      </span>
      {chartData &&
        chartData
          .sort((a, b) => a.step - b.step)
          .map((value, i) => (
            <SummaryCard key={i} type={type} value={value} onCardClick={() => onCardClick(i)} />
          ))}
    </>
  );
};

ChartList.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
};

export default ChartList;
