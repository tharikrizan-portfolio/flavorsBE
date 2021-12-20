import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getSurvey,
  handleSubmitErrors,
  prepareResponseList,
  setDefaultTextValues,
  handleOnChange,
  handleTextChange,
  setStep,
  setValue,
  handleCheckBoxList,
  setQuestionObj,
} from '../../../actions/preview.actions';
import WelcomeScreen from '../Screens/Welcome/WelcomeScreen';
import enumerations from '../../../util/enumerations';
import QuestionScreen from '../Screens/Question/QuestionScreen';
import ConfirmScreen from '../Screens/Confirm/ConfirmScreen';
import InitialScreen from '../Screens/Initial/InitialScreen';
import PreviewFinalScreen from '../Screens/Final/PreviewFinalScreen';
import { Card, Row, Col } from 'reactstrap';
import CustomCardFooter from '../../widgets/CustomCardFooter';
import { MOBILE_WIDTH } from '../Screens/previewConstants';
import { isValidAnswer } from '../../../helper/previewSurveyQuestionValidation';
import PreviewFinalScreenQuiz from '../Screens/Final/PreviewFinalScreenQuiz';
import ResponseNavigationButton from '../../components/common/Buttons/navigation/ResponseNavigationButton';
import { useSelector } from 'react-redux';
import ReactPixel from 'react-facebook-pixel';
import './SurveyDesign.scss';

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: -1,
      surveyObj: {},
      surveyId: '',
      questionObjList: [],
      textResponseMap: new Map(),
      responseList: [],
      checkedList: [],
      qrCodeSurveyImgUrl: '',
      stepCount: 0,
      score: 0,
      locationDisplayName: null,
      locationId: null,
      userId: null,
      isError: false,
      customErrorMsg: null,
      previewType: this.props.match.params.type,
      currentQuestion: {},
      isMobile: false,
    };
  }

  setStep = (step) => {
    this.props.setStep(step);
    this.setState({
      step: step,
    });
  };

  setValue = (value) => {
    this.props.setValue(value);
    this.setState({
      score: value,
    });
  };

  moveToFinalScreen = () => {
    const { stepCount } = this.state;
    this.props.setStep(stepCount + 2);
    this.setState({
      step: stepCount + 2,
    });
  };

  handleCheckBoxList = (questionObj) => {
    let list_ = this.props.questionObjList;
    this.props.handleCheckBoxList(questionObj, this.props.questionObjList);
    let index = 0;
    for (let questionObj_ of list_) {
      if (questionObj.questionId === questionObj_.questionId) {
        break;
      }
      index++;
    }
    return this.props.questionObjList[index];
  };

  handleOnNext = (questionId, answer, value) => {
    let responseList_ = this.props.responseList;
    this.props.handleOnChange(questionId, answer, value, responseList_);
    this.setState({
      responseList: this.props.responseList,
    });
  };

  getQuestion = (step) => {
    for (let questionObj of this.props.questionObjList) {
      if (questionObj.step == step) {
        return questionObj;
      }
    }
  };

  prepareCheckboxAnswerList = (questionObj, questionObjList) => {
    this.props.setQuestionObj(questionObj, questionObjList);
    this.setState({
      questionObjList: questionObjList,
    });
  };

  componentDidMount = () => {
    this.onWindowResized();
    window.addEventListener('resize', this.onWindowResized);

    let qrCodeId = null;
    let userId = null;

    this.props.getSurvey(
      this.props.match.params.id,
      this.props.headers,
      qrCodeId,
      userId,
      this.state.textResponseMap,
    );
    this.setState({
      previewType: this.props.match.params.type,
      surveyId: this.props.match.params.id,
      surveyObj: this.props.surveyObj,
    });

    //--- facebook pixel integration
    if (this.props.surveyObj?.metadata?.pixelId) {
      ReactPixel.init(this.props.surveyObj?.metadata?.pixelId);
      ReactPixel.pageView();
    }
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResized);
  }

  onWindowResized = () => {
    this.setState({
      isMobile: window.innerWidth < MOBILE_WIDTH,
    });
  };

  screens = () => {
    const { step, stepCount, surveyObj } = this.props;
    let step_ = this.props.step;
    const type = this.props.match.params.type;

    if (type === 'link' && step_ === -1) {
      this.setStep(0);
      step_ = 0;
    } else if (surveyObj.isEnableSplashScr === false && step_ === -1) {
      this.setStep(0);
    }

    let totalStepCount = stepCount + 2;

    if (step_ === -1 && type === 'iframe') {
      return <WelcomeScreen />;
    }
    if (step_ === 0) {
      return <InitialScreen />;
    }

    if (step_ === totalStepCount - 1) {
      return (
        <div>
          <ConfirmScreen />
        </div>
      );
    }
    if (step_ >= totalStepCount) {
      if (surveyObj.type === 'QUIZ') {
        return <PreviewFinalScreenQuiz />;
      } else {
        return <PreviewFinalScreen />;
      }
    } else {
      let questionObj = this.getQuestion(step_);
      if (!questionObj) {
        return null;
      }
      if (
        questionObj.type !== enumerations.questionTypes.LINE_TEXT &&
        questionObj.type !== enumerations.questionTypes.RATING_BAR
      ) {
        if (!questionObj.hasOwnProperty('optionList')) {
          this.prepareCheckboxAnswerList(questionObj, this.props.questionObjList);
        }
        return (
          <div>
            <QuestionScreen questionPropObj={questionObj} />
          </div>
        );
      }
      return (
        <div>
          <QuestionScreen questionPropObj={questionObj} />
        </div>
      );
    }
  };

  continue = () => {
    const questionObj = this.getQuestion(this.props.step);
    let validator = this.eligibleToNext(questionObj);
    if (validator.isEligible) {
      this.props.setStep(this.props.step + 1);
    } else {
      toast.error(validator.message, {
        position: 'top-right',
      });
    }
  };

  previous = (e) => {
    this.props.setStep(this.props.step - 1);
  };

  eligibleToNext = (questionObj) => {
    if (questionObj.type === enumerations.questionTypes.LINE_TEXT) {
      const textAnswer = this.props.responseList[this.props.step - 1].answer;
      const answerStatus = isValidAnswer(questionObj.metadata.validation, textAnswer);
      if (!answerStatus.isValid) {
        return {
          validator: false,
          message: 'Please enter valid email address',
        };
      }
    }

    let isRequired = questionObj.required;
    let isEligible = true;
    let numOfChecked = 0;
    let questionId = questionObj.questionId;
    if (isRequired && questionObj.type !== enumerations.questionTypes.CHECKBOX) {
      for (let responseObj of this.props.responseList) {
        if (questionId === responseObj.questionId) {
          if (responseObj.answer.length == 0) {
            isEligible = false;
            break;
          }
        }
      }
    } else if (isRequired && questionObj.type === enumerations.questionTypes.CHECKBOX) {
      for (let responseObj of this.props.responseList) {
        if (questionId === responseObj.questionId) {
          for (let answerObj of responseObj.answer) {
            if (answerObj.isChecked) {
              numOfChecked++;
            }
          }
        }
      }
      if (numOfChecked == 0) {
        isEligible = false;
      }
    }
    return {
      isEligible,
      message: 'Require answer to proceed to next step',
    };
  };

  render() {
    return (
      <Card
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#F0F1F2',
        }}
      >
        <div
          className="rounded-card "
          style={{
            borderRadius: this.state.isMobile ? '0px' : '1rem',
            backgroundImage: `url(${
              this.getQuestion(this.props.step)?.metadata?.questionBackgroundImageUrl
            })`,

            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: this.state.isMobile ? '100vh' : '90vh',
            width: this.state.isMobile ? '100%' : '70%',
            overflow: 'hidden',
          }}
        >
          <div
            className="bg"
            style={{
              borderRadius: this.state.isMobile ? '0px' : '1rem',
              backgroundColor: this.props.surveyObj?.colorSchema?.question_scr,
              opacity:
                this.getQuestion(this.props.step)?.metadata?.questionBackgroundImageOpacity || 1,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              height: this.state.isMobile ? '100vh' : '90vh',
              width: this.state.isMobile ? '100%' : '70%',
              overflow: 'hidden',
            }}
          />
          <div style={{ opacity: 500 }}>{this.screens()}</div>
          {this.state.isMobile && this.props.step > 0 && (
            <div
              style={{
                position: 'fixed',
                left: '2px',
                top: this.props.step === this.props.stepCount + 1 ? '80%' : '60%',
              }}
            >
              {this.props.step !== this.props.stepCount + 2 && (
                <div>
                  <ResponseNavigationButton
                    buttonLabel="Back"
                    type="left"
                    onClick={this.previous}
                    iColor={this.props.surveyObj.colorSchema?.subtitle_font}
                  />
                </div>
              )}
              {this.props.step < this.props.stepCount + 1 && (
                <div style={{ position: 'fixed', right: '25px', top: '60%' }}>
                  <ResponseNavigationButton
                    buttonLabel="Next"
                    type="right"
                    onClick={this.continue}
                    iColor={this.props.surveyObj.colorSchema?.subtitle_font}
                  />
                </div>
              )}
            </div>
          )}

          {this.props.step > 0 && this.props.step < this.props.stepCount + 2 && (
            <CustomCardFooter
              stepCount={this.props.stepCount}
              step={this.props.step}
              continue={this.continue}
              previous={this.previous}
              bgColor={this.props.surveyObj.colorSchema?.question_scr}
              fColor={this.props.surveyObj.colorSchema?.subtitle_font}
              isConfirmScreen={this.props.stepCount + 1 === this.props.step}
              isMobileScreenDisplay={this.state.isMobile}
            />
          )}
        </div>
      </Card>
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
    stepCount: state.previewSurvey.questionObjList.length,
    score: state.previewSurvey.score,
    locationDisplayName: state.previewSurvey.locationDisplayName,
    locationId: state.previewSurvey.locationId,
    userId: state.previewSurvey.userId,
    isError: state.previewSurvey.isError,
    customErrorMsg: state.previewSurvey.customErrorMsg,
    bgImage: state.updateSurveyObj?.survey?.configurationData?.surveyBackgroundImageUrl,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSurvey: (surveyId, header, qrCodeId, userId, textResponseMap) =>
      dispatch(getSurvey(surveyId, header, qrCodeId, userId, textResponseMap)),
    handleSubmitErrors: () => dispatch(handleSubmitErrors()),
    prepareResponseList: (questionObjList, textResponseMap) =>
      dispatch(prepareResponseList(questionObjList, textResponseMap)),
    setDefaultTextValues: (questionObjList, responseList_, textResponseMap) =>
      dispatch(setDefaultTextValues(questionObjList, responseList_, textResponseMap)),
    handleOnChange: (questionId, answer, value, responseList_) =>
      dispatch(handleOnChange(questionId, answer, value, responseList_)),
    handleTextChange: (questionId, value, textResponseMap) =>
      dispatch(handleTextChange(questionId, value, textResponseMap)),
    setStep: (step) => dispatch(setStep(step)),
    setValue: (value) => dispatch(setValue(value)),
    handleCheckBoxList: (questionObj, questionObjList) =>
      dispatch(handleCheckBoxList(questionObj, questionObjList)),
    setQuestionObj: (questionObj, questionObjList) =>
      dispatch(setQuestionObj(questionObj, questionObjList)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
