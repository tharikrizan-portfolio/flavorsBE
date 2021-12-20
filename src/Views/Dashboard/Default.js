import React from 'react';
import Aux from '../../hoc/_Aux';
import '../../assets/css/custom.css';
import { connect } from 'react-redux';
import { getSummaryDetails } from '../../actions/summary.actions';
import DashboardTable from './DashboardTable';
import DashboardCardComponent from './DashboardCardComponent';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.onSummaryDetails(this.props.headers);
  }

  render() {
    return (
      <Aux>
        <div className="flex-space-between">
          <DashboardCardComponent
            totalSurveys={this.props.summaryObj.total}
            totalQuizzes={this.props.summaryObj.totalQuizzes}
            total={this.props.summaryObj.total + this.props.summaryObj.totalQuizzes}
            label={'Total Forms'}
          />
          <DashboardCardComponent
            totalSurveys={this.props.summaryObj.published}
            totalQuizzes={this.props.summaryObj.publishedQuizzes}
            total={this.props.summaryObj.published + this.props.summaryObj.publishedQuizzes}
            label={'Total Published'}
          />
          <DashboardCardComponent
            totalSurveys={this.props.summaryObj.totResponses}
            totalQuizzes={this.props.summaryObj.totalResponsesToQuizzes}
            total={
              this.props.summaryObj.totResponses + this.props.summaryObj.totalResponsesToQuizzes
            }
            label={'Total Responses'}
          />

          {/* table */}
        </div>
        <DashboardTable />
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.errors || '',
    headers: state.userData.user.headers || '',
    summaryObj: state.summaryData.summaryObj || null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSummaryDetails: (headers) => {
      dispatch(getSummaryDetails(headers));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
