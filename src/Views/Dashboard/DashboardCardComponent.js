import React from 'react';
import { Card } from 'react-bootstrap';
import '../../assets/css/custom.css';
import ImgSheets from './formTypeImages/Survey1.svg';
import ImgQuiz from './formTypeImages/Quiz1.svg';

const DashboardCardComponent = ({ total, label, totalSurveys, totalQuizzes }) => {
  return (
    <div className="rounded-card" style={{ marginBottom: '20px', color: '#454545' }}>
      <div className="row flex-space-between align-items-center">
        <div className="col-12">
          <h3 className="f-w-300  text-uppercase" className="summary-card-total-section">
            <b className="summary-card-total">{total}</b>
            <span className="summary-card-total-label">
              <strong>{label}</strong>
            </span>
          </h3>
          <hr className="horizontal-line-card" />
        </div>

        <div className="flex-space-even" style={{ width: '100%' }}>
          <div style={{ width: '45%' }} className="flex-space-even">
            <img src={ImgSheets} className="survey-image"></img>
            <div>
              <h3 style={{ margin: '0px' }}>
                <b>{totalSurveys}</b>
              </h3>
              <span className="text-uppercase">Surveys</span>
            </div>
          </div>
          <div className="vertical-line-card"></div>
          <div style={{ width: '50%' }} className="flex-space-even">
            <img src={ImgQuiz} className="quiz-image"></img>
            <div>
              <h3 style={{ margin: '0px' }}>
                <b>{totalQuizzes}</b>
              </h3>
              <span className="text-uppercase">Quizzes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCardComponent;
