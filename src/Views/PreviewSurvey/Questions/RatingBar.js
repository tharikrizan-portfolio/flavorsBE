import React, { Component } from "react";
import { Row, Button, FormGroup, Label } from "reactstrap";

import { connect } from "react-redux";
import {
  getSurvey,
  handleOnChange,
  handleSubmitErrors,
  setStep,
} from "../../../actions/preview.actions";

import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import MaterialCircularProgress from "../../components/common/Loader/MaterialCircularProgress";

const styles = () => ({
  emptyState: {
    color: (p) => p.surveyObj?.colorSchema?.subtitle_font || "blue ",
  },
  hoverColor: {
    color: "orange",
  },
});
class RatingBarScreen extends Component {
  state = {
    questionObj: {},
    optionList: [],
    hoverRating: 0,
    isAnswered: false,
  };

  handleChange = async (rating, event) => {
    try {
      let optionList_ = [];
      this.props.handleOnChange(
        this.state.questionObj.questionId,
        [rating - 1],
        [rating - 1],
        this.props.responseList
      );
      optionList_.push(rating - 1);
      this.setState({
        optionList: optionList_,
      });
      this.forceUpdate();
      this.setState({
        isAnswered: true,
      });
      setTimeout(() => {
        this.setState({
          isAnswered: false,
        });
        this.props.continue(event);
      }, 500);
    } catch (error) {
      this.props.handleSubmitErrors();
      this.props.setStep(this.props.stepCount + 2);
    }
  };

  componentWillReceiveProps(props) {
    if (!this.props.isError) {
      this.setState({
        questionObj: props.questionPropObj,
        optionList: props.questionPropObj.optionList,
      });
    } else {
      this.props.setStep(this.props.stepCount + 2);
    }
  }
  componentDidMount() {
    if (!this.props.isError) {
      this.setState({
        questionObj: this.props.questionPropObj,
        optionList: this.props.questionPropObj.optionList,
      });
    } else {
      this.props.setStep(this.props.stepCount + 2);
    }
  }

  render() {
    const { optionList } = this.state;
    const ratedValue = this.state.hoverRating === parseInt(this.props.questionPropObj.metadata.max) ? 
    `${this.state.hoverRating} (${this.props.questionPropObj.metadata.maxLabel})`: 
    this.state.hoverRating === parseInt(this.props.questionPropObj.metadata.min) ? 
    `${this.state.hoverRating} (${this.props.questionPropObj.metadata.minLabel})`:
    this.state.hoverRating
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Row>
            
            {this.state.isAnswered ? (
              <div className="custom-rating-bar-max-label-preview">
                <MaterialCircularProgress size={30} />
              </div>
            ):(
              <>
            <Rating
              classes={{
                iconHover: this.props.classes.hoverColor,
                iconEmpty: this.props.classes.emptyState,
              }}
              size="large"
              icon={
                <div className="custom-rating-bar-padding-preview">
                  <RadioButtonCheckedIcon />
                </div>
              }
              defaultChecked={false}
              max={
                parseInt(this.props.questionPropObj.metadata.max) -
                parseInt(this.props.questionPropObj.metadata.min) +
                1
              }
              name="hover-feedback"
              value={
                this.props.textResponseMap[
                  this.props.questionPropObj.questionId
                ]
              }
              precision={1}
              onChange={(event, rating) => {
                this.handleChange(
                  rating + parseInt(this.props.questionPropObj.metadata.min),
                  event
                );
              }}
              onChangeActive={(event, newHover) => {
                const hoverRating_ =
                  newHover -
                  1 +
                  parseInt(this.props.questionPropObj.metadata.min);
                if (hoverRating_ >= 0) {
                  this.setState({
                    hoverRating: hoverRating_,
                  });
                }
              }}
            />
              </>
            )}
          </Row>
            <h4 style={{ textAlign: 'center' }}>
              { ratedValue }
            </h4>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    step: state.previewSurvey.step,
    surveyObj: state.previewSurvey.surveyObj,
    textResponseMap: state.previewSurvey.textResponseMap,
    responseList: state.previewSurvey.responseList,
    stepCount: state.previewSurvey.stepCount,    
    isError: state.previewSurvey.isError,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmitErrors: () => dispatch(handleSubmitErrors()),
    setStep: (step) => dispatch(setStep(step)),
    handleOnChange: (questionId, answer, value, responseList) =>
      dispatch(handleOnChange(questionId, answer, value, responseList)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RatingBarScreen));
