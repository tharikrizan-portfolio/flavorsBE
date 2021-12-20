import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import commonConstants from '../../../util/common.constants';
import ChartView from '../../components/common/GraphicalViews/ChartView';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const SummaryCard = ({ value, onCardClick, type }) => {
  const questionType = commonConstants.QUESTION_TYPES.find((x) => x.value === value.questionType);

  return (
    <>
      <div
        className={`rounded-card grey-background ${value.isExpanded ? 'expanded' : 'collapsed'}`}
      >
        <div className="graph-view-header" onClick={() => onCardClick()}>
          <Typography variant={'h6'} gutterBottom>
            {value.isExpanded ? <ExpandLess fontSize="large" /> : <ExpandMore fontSize="large" />}
            {value.questionName}
          </Typography>
          <Typography gutterBottom>{value.totalResponsesCount} Responses</Typography>
        </div>

        {value.isExpanded && (
          <div className="summary-card-expanded">
            <div className="flex-space-between">
              <Typography gutterBottom>
                {value.chartData.length ? 'Responses' : 'No responses'}
              </Typography>
              <div>
                {questionType && (
                  <>
                    <questionType.Icon fontSize="small" /> {questionType.label}
                  </>
                )}
              </div>
            </div>
            <div>
              <ChartView chartData={value} type={type} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

SummaryCard.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object),
  onCardClick: PropTypes.func,
  type: PropTypes.string,
};

export default SummaryCard;
