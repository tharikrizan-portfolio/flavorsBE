import React, { Component } from "react";
import {
  Button,
  Card,
  CardImg,
  Row,
  Col,
  CardFooter,
  Container,
  CardBody,
  ButtonToggle,
} from "reactstrap";
import { Typography } from "@material-ui/core";
import halfLifeImg from "../../../../assets/images/halfLifeLogo.png";
import { finalScreenCustomStyle } from "../../../../util/finalScreenCustomStyle";
import enumerations from "../../../../util/enumerations";
import "../../../../assets/css/custom.css";
import {
  handleSubmitErrors,
  setStep,
} from "../../../../actions/preview.actions";
import { connect } from "react-redux";

class FinalScreen extends Component {
  state = {
    surveyObj: {},
    isError: false,
    errorMsg: "Sorry , we will try next time!",
    showFinalScreen: true,
  };

  setShowFinalScreen = () => {
    const { showFinalScreen } = this.state;
    this.setState({
      showFinalScreen: !showFinalScreen,
    });
  };

  continue = (e) => {
    e.preventDefault();
    this.props.setStep(this.props.stepCount + 1);
  };

  componentWillReceiveProps(props) {
    this.setState({
      surveyObj: props.surveyPropObj,
      isError: this.props.isError,
    });
  }

  componentDidMount() {
    this.setState({
      surveyObj: this.props.surveyObj,
      isError: this.props.isError,
    });
  }

  getValue = () => {
    let score_ = parseFloat(this.props.score);
    return Math.floor(score_);
  };

  render() {
    const classes = finalScreenCustomStyle();
    if (!this.state.showFinalScreen) {
      return (
        <div></div>
        // <Graphs
        //   setShowFinalScreen={this.setShowFinalScreen}
        //   id={this.props.surveyPropObj.surveyId}
        // />
      );
    } else {
      return (
        <div
          className="app flex-row align-items-center"
          style={{
            backgroundColor: this.props.surveyObj?.colorSchema?.question_scr,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",
          }}
        >
          <Container>
            {
              /* {this.props.isError */ false ? (
                <Typography
                  className={"MuiTypography--heading preview-survey-title"}
                  variant={"h5"}
                  gutterBottom
                >
                  <strong>{this.props.customErrorMsg}</strong>
                </Typography>
              ) : this.props.surveyObj.type ===
                enumerations.surveyTypes.QUIZ ? (
                <Typography
                  className={"MuiTypography--heading preview-survey-title"}
                  variant={"h4"}
                  gutterBottom
                >
                  <strong>
                    You have successfully submitted answers for the survey
                    {this.props.surveyObj.title}.
                  </strong>
                  <br />
                  <strong>You have scored {this.getValue()}%</strong>
                  <br />
                </Typography>
              ) : (
                <Typography
                  className={"MuiTypography--heading preview-survey-title"}
                  gutterBottom
                >
                  <span
                    style={{
                      color: this.props.surveyObj?.colorSchema?.title_font,
                      fontFamily: "sans-serif",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: this.props.surveyObj.title,
                    }}
                  />
                  <br />

                  <span
                    style={{
                      color: this.props.surveyObj?.colorSchema?.subtitle_font,
                      fontFamily: "sans-serif",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: this.props.surveyObj?.postSubmissionData
                        .description,
                    }}
                  />

                  <br />
                </Typography>
              )
            }

            <Row className="justify-content-center">
              <Col md="9" lg="7" xl="6">
                <Card className="mx-4">
                  <CardBody className="p-4">
                    <CardImg
                      variant="center"
                      src={this.props.qrCodeSurveyImgUrl || halfLifeImg}
                    />
                    <CardFooter className="center-align-bolder">
                      <div>Powered By HalfLife</div>
                    </CardFooter>
                  </CardBody>
                  <CardFooter className="center-align-bolder">
                    {this.state.surveyObj !== undefined ? (
                      <ButtonToggle
                        onClick={this.setShowFinalScreen}
                        color="success"
                      >
                        View Responses
                      </ButtonToggle>
                    ) : null}
                    <br />
                    <hr />
                    {this.props?.surveyObj?.postSubmissionData
                      .isMultipleResponse && (
                      <button
                        onClick={() => {
                          window.location.reload();
                        }}
                        style={{ color: "blue" }}
                      >
                        Submit another response
                      </button>
                    )}
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
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
    handleSubmitErrors: () => dispatch(handleSubmitErrors()),
    setStep: (step) => dispatch(setStep(step)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinalScreen);
