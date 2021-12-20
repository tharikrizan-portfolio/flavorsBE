import React, { Component } from 'react';
import { CardHeader, Card, Row, Col, Container, CardBody, CardTitle, CardFooter } from 'reactstrap';
import '../../../../assets/css/custom.css';
import '../buttonStyles.css';
import { CardContent, Typography } from '@material-ui/core';
import enumerations from '../../../../util/enumerations';
import confirmBgImg from '../../../../assets/images/confirmscreen.png';
import cookie from 'react-cookies';
import {
  addResponse,
  getSurvey,
  handleSubmitErrors,
  setStep,
} from '../../../../actions/preview.actions';
import { toast } from 'react-toastify';
import CustomCard from '../../../widgets/CustomCard';
import CustomCardFooter from '../../../widgets/CustomCardFooter';
import ResponseNavigationButton from '../../../components/common/Buttons/navigation/ResponseNavigationButton';
import { connect } from 'react-redux';
import { MOBILE_WIDTH } from '../previewConstants';
import ShadowScrollbar from '../../../components/common/ShadowScrollBar/ShadowScrollBar';
import ReactPixel from 'react-facebook-pixel';
import { convertHTMLTagToInnerText } from '../../../../util/helper';
class ConfirmScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseList: [],
      surveyId: '',
      locationDisplayName: '',
      locationId: '',
      userId: '',
      isMobile: false,
    };
    this.onWindowSizeChanged = this.onWindowSizeChanged.bind(this);
  }

  componentDidMount() {
    if (this.props.surveyObj?.metadata?.pixelId) {
      ReactPixel.trackSingleCustom(this.props.surveyObj?.metadata?.pixelId, 'ConfirmationScreen', {
        value: {
          surveyTitle: convertHTMLTagToInnerText(this.props.surveyObj.title),
          surveyId: this.props.surveyObj.surveyId,
        },
      });
    }
    //--- added the window size event listener
    this.onWindowSizeChanged();
    window.addEventListener('resize', this.onWindowSizeChanged);
    const filteredQuestionIds = this.props.questionObjList.map((x) => x.questionId);
    if (!this.props.isError) {
      this.setState({
        responseList: this.props.responseList.filter((question) =>
          filteredQuestionIds.includes(question.questionId),
        ),
        surveyId: this.props.surveyId,
        locationDisplayName: this.props.locationDisplayName,
        userId: this.props.userId,
        locationId: this.props.locationId,
      });
    } else {
      this.props.setStep(this.props.stepCount + 2);
    }
  }

  componentWillUnmount() {
    //--- removed the window size event listener
    window.removeEventListener('resize', this.onWindowSizeChanged);
  }

  //--- runs on window gets resized
  onWindowSizeChanged(e) {
    this.setState({
      isMobile: window.innerWidth < MOBILE_WIDTH,
    });
  }

  createResponse = () => {
    const {
      step,
      surveyObj,
      questionObjList,
      userId,
      locationId,
      responseList,
      surveyId,
      headers,
      locationDisplayName,
    } = this.props;

    this.props.addResponse(
      step,
      surveyObj,
      questionObjList,
      responseList,
      userId,
      locationId,
      surveyId,
      headers,
      locationDisplayName,
    );
  };

  continue = async (e) => {
    e.preventDefault();
    await this.createResponse();

    if (this.props.surveyObj?.metadata?.pixelId) {
      ReactPixel.trackSingle(this.props.surveyObj?.metadata?.pixelId, 'SubmitApplication', {
        surveyTitle: convertHTMLTagToInnerText(this.props.surveyObj.title),
        surveyId: this.props.surveyObj.surveyId,
      });
    }
    //--- update the step
    this.props.setStep(this.props.step + 1);
  };

  previous = (e) => {
    e.preventDefault();
    this.props.setStep(this.props.step - 1);
  };

  render() {
    return (
      <CardBody
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <span
          style={{
            marginLeft: '5%',
            color: this.props.surveyObj?.colorSchema?.title_font,
            fontFamily: 'sans-serif',
          }}
          dangerouslySetInnerHTML={{
            __html: this.props.surveyObj?.title,
          }}
        />
        <hr />
        <Row
          style={{
            width: '100%',
            justifyContent: 'flex-start',
            marginLeft: '5%',
          }}
        >
          <Typography
            className={'MuiTypography--heading center-align-bolder'}
            variant={'h5'}
            gutterBottom
            style={{
              color: this.props.surveyObj?.colorSchema?.title_font,
              textAlign: 'left',
            }}
          >
            <strong>Confirm your Answers</strong>
          </Typography>
          <Col md="10" lg="10" xl="10">
            <ShadowScrollbar
              style={{
                height: '40vh',
                width: '820px',
                marginLeft: '-15px',
              }}
              shadowColor={this.props.surveyObj?.colorSchema?.subtitle_font}
              scrollColor={this.props.surveyObj?.colorSchema?.subtitle_font}
            >
              <CardBody>
                {this.state.responseList.map((response, index) => (
                  <div
                    key={index}
                    style={{
                      color: `${this.props.surveyObj.colorSchema.subtitle_font}`,
                    }}
                  >
                    <Typography
                      className={'MuiTypography--subheading'}
                      variant={'h6'}
                      style={{
                        color: this.props.surveyObj?.colorSchema?.title_font,
                      }}
                    >
                      <strong>
                        {index + 1}) {response.questionName}
                      </strong>
                    </Typography>
                    {response.type !== enumerations.questionTypes.CHECKBOX ? (
                      response.type !== enumerations.questionTypes.LINE_TEXT ? (
                        <div>
                          <CustomCard
                            colorFont={this.props.surveyObj?.colorSchema?.subtitle_font}
                            length={response.value.length}
                            responseVal={response.value}
                          />
                        </div>
                      ) : (
                        //NOt necessary For future needs
                        <div>
                          <CustomCard
                            length={response.value.length}
                            responseVal={response.value}
                            colorFont={this.props.surveyObj?.colorSchema?.subtitle_font}
                          />
                        </div>
                      )
                    ) : (
                      <div>
                        <CardContent>
                          {response.answer.map(
                            (answer, answerIndex) =>
                              answer.isChecked && (
                                <Row>
                                  <Typography
                                    style={{
                                      paddingLeft: '15px',
                                      color: this.props.surveyObj?.colorSchema?.subtitle_font,
                                    }}
                                    className={'MuiTypography--subheading'}
                                    variant={'h6'}
                                  >
                                    {answer.name}
                                  </Typography>
                                </Row>
                              ),
                          )}
                        </CardContent>
                      </div>
                    )}
                  </div>
                ))}
              </CardBody>
            </ShadowScrollbar>
            <button
              onClick={this.continue}
              className={`response-navigation-button center`}
              style={{
                color: this.props.surveyObj?.colorSchema?.button_font,
                backgroundColor: this.props.surveyObj?.colorSchema?.button,
                marginTop: '5%',
                marginLeft: '-15px',
              }}
            >
              Continue
            </button>
          </Col>
        </Row>
      </CardBody>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    step: state.previewSurvey.step,
    headers: state.userData.user.headers || '',
    surveyObj: state.previewSurvey.surveyObj,
    surveyId: state.previewSurvey.surveyObj.surveyId,
    questionObjList: state.previewSurvey.questionObjList,
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
    addResponse: (
      step,
      surveyPropObj,
      questionObjList,
      responseList,
      userId,
      locationId,
      surveyId,
      headers,
      locationDisplayName,
    ) =>
      dispatch(
        addResponse(
          step,
          surveyPropObj,
          questionObjList,
          responseList,
          userId,
          locationId,
          surveyId,
          headers,
          locationDisplayName,
        ),
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmScreen);
