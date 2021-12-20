import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  CardTitle,
  CardSubtitle,
  CardFooter,
} from "reactstrap";
import { detect } from "detect-browser";
import { Typography } from "@material-ui/core";
import { toast } from "react-toastify";
import "../../../../assets/css/custom.css";
import { customWelcomeScreenStyles } from "../../../../util/welcomeScreenCustomStyle";
import { connect } from "react-redux";
import {
  getSurvey,
  handleSubmitErrors,
  setStep,
} from "../../../../actions/preview.actions";
import '../buttonStyles.css'

const innerCardStyle = {
  borderRadius: "1rem",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "90vh",
  width: "90%",
};

const outerCardStyles = {
  display: "flex",
  justifyContent: "center",
  height: "100vh",
};
class WelcomeScreen extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.setStep(this.props.step + 1);
  };

  componentWillReceiveProps(props) {
    const browser = new detect();
    if (!browser) {
      this.props.handleSubmitErrors();
      toast.error("Sorry browser is not supported!!!", {
        position: "top-right",
      });
      this.props.setStep(this.props.stepCount + 2);
    }
  }

  render() {
    const classes = customWelcomeScreenStyles();

    return this.props?.surveyObj?.colorSchema ? (
      <div className="app flex-row align-items-center" style={outerCardStyles}>
        <div
          className="app flex-row align-items-center"
        >
          <CardBody className="p-4">
            <CardTitle>
              <Typography
                className={"MuiTypography--heading center-align-bolder"}
                variant={"h5"}
                gutterBottom
              >
                <div
                  style={{
                    color: `${
                      this.props.surveyObj.sharingData !== null
                        ? this.props.surveyObj.sharingData.descriptionFontColor
                        : "black"
                    }`,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: this.props.surveyObj.sharingData.descriptionText,
                  }}
                />
              </Typography>
            </CardTitle>
            <div className="welcome-screen-continue-button-div">
              <button
                className="welcome-screen-continue-button "
                style={{
                  color: this.props?.surveyObj?.sharingData?.buttonFontColor,

                  backgroundColor: this.props?.surveyObj?.sharingData
                    ?.buttonBgColor,
                  maxWidth: 'fit-content',
                  minWidth: '200px'
                }}
                onClick={this.continue}
                block
              >
                {this.props?.surveyObj?.sharingData?.buttonText}
                <i
                  className="fa fa-chevron-circle-right align-left-icon"
                  aria-hidden="true"
                ></i>
              </button>
            </div>
          </CardBody>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = (state) => {
  return {
    step: state.previewSurvey.step,
    headers: state.userData.user.headers || "",
    surveyObj: state.previewSurvey.surveyObj,
    surveyId: state.previewSurvey.surveyObj.surveyId,
    textResponseMap: state.previewSurvey.textResponseMap,
    responseList: state.previewSurvey.responseList,
    checkedList: state.previewSurvey.checkedList,
    qrCodeSurveyImgUrl: state.previewSurvey.qrCodeSurveyImgUrl,
    stepCount: state.previewSurvey.stepCount,
    score: state.previewSurvey.score,
    locationDisplayName: state.previewSurvey.locationDisplayName,
    locationId: state.previewSurvey.locationId,
    userId: state.previewSurvey.userId,
    isError: state.previewSurvey.isError,
    customErrorMsg: state.previewSurvey.customErrorMsg,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSurvey: (surveyId, header, qrCodeId, userId, textResponseMap) =>
      dispatch(getSurvey(surveyId, header, qrCodeId, userId, textResponseMap)),
    handleSubmitErrors: () => dispatch(handleSubmitErrors()),
    setStep: (step) => dispatch(setStep(step)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
