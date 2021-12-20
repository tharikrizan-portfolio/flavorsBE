import React, { useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import {
  chartBackgroundColors,
  correctWrongBackgroundColors,
  questionTypes,
} from '../../../../util/enumerations';
import TextView from './TextView';
import { Bar, Doughnut } from 'react-chartjs-2';

const ChartView = ({ chartData, type }) => {
  const options = {
    scales: {
      x: {
        ticks: {
          precision: 0,
          beginAtZero: true,
        },
        display: true,
        title: {
          display: true,
          text: chartData.chartData?.[0]?.[0] || 'No data',
          font: {
            size: 20,
            weight: 'normal',
            lineHeight: 1.2,
          },
          padding: { top: 20, left: 0, right: 0, bottom: 0 },
        },
      },
      y: {
        ticks: {
          precision: 0,
          beginAtZero: true,
        },
        display: true,
        title: {
          display: true,
          text: 'Response count',
          font: {
            size: 20,
            style: 'bold',
            lineHeight: 1.2,
          },
          padding: { top: 30, left: 0, right: 0, bottom: 0 },
        },
      },
    },
  };

  const data = useCallback(
    {
      labels: chartData.chartData
        .filter((chartValue, index) => index !== 0)
        .map((chartValue) => chartValue[0]),
      datasets: [
        {
          label: chartData.chartData?.[0]?.[1] || 'No data',
          data: chartData.chartData
            .filter((chartValue, index) => index !== 0)
            .map((chartValue) => chartValue[1]),
          backgroundColor: chartBackgroundColors,
          borderWidth: 1,
        },
      ],
    },
    chartData,
  );

  const getCorrectAnswer = () => {
    return {
      labels: ['Correct', 'Wrong'],
      datasets: [
        {
          data: [chartData.correctWrongCount.correctCount, chartData.correctWrongCount.wrongCount],
          backgroundColor: correctWrongBackgroundColors,
          borderWidth: 1,
        },
      ],
    };
  };

  const getChart = (questionType) => {
    switch (questionType) {
      case questionTypes.LINE_TEXT:
        return (
          <div className="center-w50">
            <TextView responses={chartData?.chartData} type={type} />
          </div>
        );
      case questionTypes.RADIO_BUTTON:
      case questionTypes.LONG_LIST:
        return (
          <span
            className={data.labels.length < 10 ? 'graph-view-doughnut' : 'graph-view-doughnut-w50'}
          >
            <Doughnut data={data} />
          </span>
        );
      case questionTypes.CHECKBOX:
      case questionTypes.RATING_BAR:
        return (
          <span className="center-w50">
            <Bar data={data} options={options} />
          </span>
        );
      default:
        return <></>;
    }
  };

  const getAnswerChart = (
    <div className="graph-view-doughnut-padding">
      <Doughnut data={getCorrectAnswer} />
    </div>
  );

  return (
    <div className="flex">
      {getChart(chartData.questionType)}
      {type === 'QUIZ' && getAnswerChart}
    </div>
  );
};

ChartView.propTypes = {
  chartData: PropTypes.object,
  type: PropTypes.string,
};

export default memo(ChartView);
