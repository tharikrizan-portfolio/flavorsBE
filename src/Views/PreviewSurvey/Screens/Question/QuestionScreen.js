import React, { Component } from 'react';
import { Row, Col, FormGroup, Label } from 'reactstrap';
import { Input } from '@material-ui/core';
import { toast } from 'react-toastify';
import enumerations from '../../../../util/enumerations';
import '../../../../assets/css/custom.css';
import LongList from '../../Questions/LongList';
import RatingBar from '../../Questions/RatingBar';
import CheckboxScreen from '../../Questions/Checkbox';
import RadioButtonScreen from '../../Questions/Radiobutton';
import {
  handleSubmitErrors,
  setStep,
  handleOnChange,
  handleTextChange,
} from '../../../../actions/preview.actions';
import { connect } from 'react-redux';
import PressEnterBar from './PressEnterBar';
import { MOBILE_WIDTH } from '../previewConstants';
import { isValidAnswer } from './../../../../helper/previewSurveyQuestionValidation';
import ShadowScrollbar from '../../../components/common/ShadowScrollBar/ShadowScrollBar';

class QuestionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionObj: {},
      hoverRating: 0,
      textResponseMap: {},
      isAnswered: false,
      isMobile: false,
    };
    this.onPressEnter = this.onPressEnter.bind(this);
    this.setCanShowEnter = this.setCanShowEnter.bind(this);
    this.onWindowSizeChanged = this.onWindowSizeChanged.bind(this);
  }

  continue = (e) => {
    e && e.preventDefault();
    let validator = this.eligibleToNext(this.state.questionObj);
    if (validator.isEligible) {
      this.props.setStep(this.props.step + 1);
    } else {
      toast.error(validator.message, {
        position: 'top-right',
      });
    }
  };

  eligibleToNext = (questionObj) => {
    if (this.state.questionObj.type === enumerations.questionTypes.LINE_TEXT) {
      const textAnswer =
        this.state.textResponseMap[this.state.questionObj.questionId] ||
        this.props.textResponseMap[this.props.questionPropObj.questionId];
      const answerStatus = isValidAnswer(this.state.questionObj.metadata.validation, textAnswer);
      if (!answerStatus.isValid) {
        return {
          validator: false,
          message: answerStatus.message,
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

  previous = (e) => {
    e && e.preventDefault();
    this.props.setStep(this.props.step - 1);
  };

  handleOnChangeAnswer = (e) => {
    e.preventDefault();

    this.props.handleTextChange(
      this.props.questionPropObj.questionId,
      e.target.value,
      this.props.textResponseMap,
    );
    this.props.handleOnChange(
      this.state.questionObj.questionId,
      e.target.value,
      e.target.value,
      this.props.responseList,
    );
    this.setState({
      textResponseMap: this.props.textResponseMap,
    });
  };

  componentWillReceiveProps(props) {
    this.setState({
      questionObj: props.questionPropObj,
      textResponseMap: props.textResponseMap,
    });
  }

  componentDidMount() {
    //--- added the window size event listener
    this.onWindowSizeChanged();
    window.addEventListener('resize', this.onWindowSizeChanged);

    this.setState({
      questionObj: this.props.questionPropObj,
      textResponseMap: this.props.textResponseMap,
    });

    if (this.props.questionPropObj.type !== enumerations.questionTypes.CHECKBOX) {
      this.setState({
        isAnswered:
          this.props.questionPropObj?.optionList?.filter((option) => option.isChecked)?.length > 0,
      });
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

  setCanShowEnter(canAnswer) {
    this.setState({
      isAnswered: canAnswer,
    });
  }

  onPressEnter(e) {
    const code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      this.continue(e);
    }
  }

  render() {
    return (
      <>
          <div className="preview-questions-align">
            <Row>
              <Col md="12" lg="12" xl="12">
                <div className="mx-4" style={{ borderRadius: '1rem', height: '70%' }}>
                  <div
                    style={{
                      backgroundColor: 'transparent',
                      color: `${this.props.surveyObj.colorSchema.subtitle_font}`,
                      fontFamily: 'sans-serif',
                    }}
                  >
                    <div className="question-name-padding">
                      <FormGroup row className="my-0">
                        <Col xs="12">
                          <FormGroup style={{ marginLeft: '2%' }}>
                            <Label
                              htmlFor="name"
                              style={{
                                fontSize: this.state.isMobile ? '28px' : '40px',
                                fontWeight: 'bold',
                                fontFamily: 'sans-serif',
                              }}
                            >
                              {this.props.questionPropObj.name}
                              {this.props.questionPropObj.required ? (
                                <span style={{ marginLeft: '3px' }}>*</span>
                              ) : (
                                ''
                              )}
                            </Label>
                          </FormGroup>
                        </Col>
                      </FormGroup>
                    </div>
                    {enumerations.questionTypes.LONG_LIST === this.props.questionPropObj.type ? (
                      <FormGroup row className="my-0 align-left-icon">
                        <LongList
                          questionPropObj={this.props.questionPropObj}
                          showNextQuestion={this.continue}
                        />
                      </FormGroup>
                    ) : enumerations.questionTypes.CHECKBOX === this.props.questionPropObj.type ? (
                      <>
                        <ShadowScrollbar
                          style={{
                            height: '35vh',
                            marginTop: '-55px',
                          }}
                          shadowColor={this.props.surveyObj?.colorSchema?.subtitle_font}
                          scrollColor={this.props.surveyObj?.colorSchema?.subtitle_font}
                        >
                          <FormGroup row className="my-0 align-left-icon">
                            <CheckboxScreen
                              questionPropObj={this.props.questionPropObj}
                              setCanShowEnter={this.setCanShowEnter}
                              onPressEnter={this.onPressEnter}
                            />
                          </FormGroup>
                        </ShadowScrollbar>
                        {this.state.isAnswered && (
                          <div className="enter-bar-alignment">
                            <PressEnterBar
                              fontColor={this.props.surveyObj.colorSchema.title_font}
                              buttonColor={this.props.surveyObj?.colorSchema?.button}
                              buttonFontColor={this.props.surveyObj?.colorSchema?.button_font}
                              onPressEnter={this.continue}
                            />
                          </div>
                        )}{' '}
                      </>
                    ) : enumerations.questionTypes.RADIO_BUTTON ===
                      this.props.questionPropObj.type ? (
                      <ShadowScrollbar
                        style={{
                          height: '35vh',
                          marginTop: '-55px',
                        }}
                        shadowColor={this.props.surveyObj?.colorSchema?.subtitle_font}
                        scrollColor={this.props.surveyObj?.colorSchema?.subtitle_font}
                      >
                        <FormGroup row className="my-0 align-left-icon">
                          <RadioButtonScreen
                            questionPropObj={this.props.questionPropObj}
                            continue={this.continue}
                          />
                        </FormGroup>
                      </ShadowScrollbar>
                    ) : (
                      <>
                        {enumerations.questionTypes.RATING_BAR ===
                        this.props.questionPropObj.type ? (
                          <FormGroup row className="my-0 align-left-icon">
                            <div
                              className="row"
                              style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'baseline',
                                width: '100%',
                              }}
                            >
                              <h3 style={{ marginRight: '8px' }}>
                                {this.props.questionPropObj.metadata.min}
                              </h3>
                              <RatingBar
                                questionPropObj={this.props.questionPropObj}
                                continue={this.continue}
                              />
                              <h3 style={{ marginLeft: '8px' }}>
                                {this.props.questionPropObj.metadata.max}
                              </h3>
                            </div>
                          </FormGroup>
                        ) : (
                          <FormGroup row className="my-0 align-left-icon answe-box-size">
                            <Input
                              style={{
                                color: this.props.surveyObj.colorSchema.subtitle_font,
                                fontSize: 25,
                              }}
                              autoComplete="off"
                              autoFocus={true}
                              placeholder={'Enter your answer'}
                              id="questionLineText"
                              value={
                                this.state.textResponseMap[this.state.questionObj.questionId] ||
                                this.props.textResponseMap[this.props.questionPropObj.questionId] ||
                                ''
                              }
                              required={this.props.questionPropObj.required}
                              inputProps={{ 'aria-label': 'description' }}
                              onChange={(e) => {
                                this.handleOnChangeAnswer(e);
                              }}
                              onKeyPress={this.onPressEnter}
                            />
                            {this.state.textResponseMap?.[this.state.questionObj.questionId]
                              ?.length > 0 && (
                              <PressEnterBar
                                fontColor={this.props.surveyObj.colorSchema.title_font}
                                buttonColor={this.props.surveyObj?.colorSchema?.button}
                                buttonFontColor={this.props.surveyObj?.colorSchema?.button_font}
                                onPressEnter={this.continue}
                              />
                            )}
                          </FormGroup>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    step: state.previewSurvey.step,
    headers: state.userData.user.headers || '',
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
    handleOnChange: (questionId, answer, value, responseList_) =>
      dispatch(handleOnChange(questionId, answer, value, responseList_)),
    handleTextChange: (questionId, value, textResponseMap) =>
      dispatch(handleTextChange(questionId, value, textResponseMap)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionScreen);
