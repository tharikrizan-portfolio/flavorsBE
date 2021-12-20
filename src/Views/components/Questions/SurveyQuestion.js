import React, { useState } from "react";
import PropTypes from "prop-types";
import * as enumUtil from "../../../util/enumerations";
import "../../../App.css";
import "draft-js/dist/Draft.css";
import "draftail/dist/draftail.css";
import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import "draft-js-side-toolbar-plugin/lib/plugin.css";
import "../../../assets/css/custom.css";
import { useDispatch } from "react-redux";
import {
  Col,
  Dropdown,
  Form,
  FormGroup,
  Row,
  Tab,
  Tabs,
  Card,
  Nav,
} from "react-bootstrap";
import { Button, Tooltip } from "@material-ui/core";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

import { FormControlLabel, Switch } from "@material-ui/core";

import commonConstants from "../../../util/common.constants";
import FormTextInput from "../common/Inputs/FormTextInput";
import { mutateUpdateQuestion } from "../../../actions/updateQuestion.actions";
import { updateQuestion } from "./../../../actions/question.actions";
import RadioButtonQuestion from "./RadioButtonQuestion";
import LineTextQuestion from "./LineTextQuestion";
import CheckBoxQuestion from "./CheckBoxQuestion";
import RadioButtonQuestionQuiz from "./RadioButtonQuestionQuiz";
import LineTextQuestionQuiz from "./LineTextQuestionQuiz";
import CheckBoxQuestionQuiz from "./CheckboxQuestionQuiz";
import RatingBarQuestion from "./RatingBarQuestion";
import LongListQuestion from "./LongListQuestion";
import SettingsIcon from "@material-ui/icons/Settings";
import OptionsModal from "./OptionsModal";
import { toast } from "react-toastify";
import { SET_IS_UPDATE_SHEET } from "../../../actions/types";
import ImageUploader from "../common/FileUploader/ImageUploader";

const SurveyQuestion = ({
  questionProp,
  questionIndex,
  duplicateQuestion,
  questionList,
  isAddSurvey,
  isSurveyPublished,
  isQuiz,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const questionTypes = isQuiz
    ? commonConstants.QUIZ_QUESTION_TYPES
    : commonConstants.QUESTION_TYPES;

  const updateRedux = (updatedQuestionData) => {
    if (isAddSurvey)
      dispatch(
        updateQuestion(questionIndex, updatedQuestionData, questionList)
      );
    else {
      dispatch(
        mutateUpdateQuestion(questionIndex, updatedQuestionData, questionList)
      );
      dispatch({
        type: SET_IS_UPDATE_SHEET,
        payload: { questionTitleChanged: true, questionSequenceChanged: true },
      });
    }
  };

  const changeQuestionName = (e) => {
    if (e.target.value.length > 150) {
      toast.error("Maximum Question Length is 150", {
        position: "top-right",
      });

      return false;
    }
    const updatedQuestionData = {
      ...questionProp,
      questionName: e.target.value,
      questionNameValue: e.target.value,
      name: e.target.value,
    };

    updateRedux(updatedQuestionData);
  };

  const handleBackgroundImage = (url, fileName) => {
    const updatedQuestionData = {
      ...questionProp,
      metadata: {
        ...questionProp.metadata,
        questionBackgroundImageUrl: url,
        fileName: fileName,
      },
    };
    updateRedux(updatedQuestionData);
  };

  const handleBackgroundImageOpacity = (e) => {
    const opacityValue = e.target.value / 100;
    const updatedQuestionData = {
      ...questionProp,
      metadata: {
        ...questionProp.metadata,
        questionBackgroundImageOpacity: opacityValue,
      },
    };
    updateRedux(updatedQuestionData);
  };

  const onSelectedQuestionType = (e) => {
    const updatedQuestionData = {
      ...questionProp,
      type: e.target.value,
    };

    updateRedux(updatedQuestionData);
  };

  const onSelectedValidationType = (e) => {
    const updatedQuestionData = {
      ...questionProp,
      metadata: {
        ...questionProp.metadata,
        validation: { type: e.target.value },
      },
    };

    updateRedux(updatedQuestionData);
  };

  const onToggleRequired = (e) => {
    const updatedQuestionData = {
      ...questionProp,
      required: e.target.checked,
    };

    updateRedux(updatedQuestionData);
  };

  const onToggleIsShowResponse = (e) => {
    const updatedQuestionData = {
      ...questionProp,
      isShowResponse: e.target.checked,
    };

    updateRedux(updatedQuestionData);
  };

  const renderQuestionTypes = (questionType) => {
    switch (questionType) {
      case enumUtil.questionTypes.RADIO_BUTTON:
        if (isQuiz) {
          return (
            <RadioButtonQuestionQuiz
              questionProp={questionProp}
              updateRedux={updateRedux}
              isSurveyPublished={isSurveyPublished}
              isAddSurvey={isAddSurvey}
            />
          );
        } else {
          return (
            <RadioButtonQuestion
              questionProp={questionProp}
              updateRedux={updateRedux}
              isSurveyPublished={isSurveyPublished}
              isAddSurvey={isAddSurvey}
            />
          );
        }

      case enumUtil.questionTypes.LINE_TEXT:
        if (isQuiz) {
          return (
            <LineTextQuestionQuiz
              questionProp={questionProp}
              updateRedux={updateRedux}
              isSurveyPublished={isSurveyPublished}
              isAddSurvey={isAddSurvey}
            />
          );
        } else {
          return (
            <LineTextQuestion
              questionProp={questionProp}
              updateRedux={updateRedux}
              isSurveyPublished={isSurveyPublished}
              isAddSurvey={isAddSurvey}
            />
          );
        }

      case enumUtil.questionTypes.CHECKBOX:
        if (isQuiz) {
          return (
            <CheckBoxQuestionQuiz
              questionProp={questionProp}
              updateRedux={updateRedux}
              isSurveyPublished={isSurveyPublished}
              isAddSurvey={isAddSurvey}
            />
          );
        } else {
          return (
            <CheckBoxQuestion
              questionProp={questionProp}
              updateRedux={updateRedux}
              isSurveyPublished={isSurveyPublished}
              isAddSurvey={isAddSurvey}
            />
          );
        }
      case enumUtil.questionTypes.RATING_BAR:
        return (
          <RatingBarQuestion
            questionProp={questionProp}
            updateRedux={updateRedux}
            isSurveyPublished={isSurveyPublished}
            isAddSurvey={isAddSurvey}
          />
        );

      case enumUtil.questionTypes.LONG_LIST:
        return (
          <LongListQuestion
            questionProp={questionProp}
            updateRedux={updateRedux}
            isSurveyPublished={isSurveyPublished}
            isAddSurvey={isAddSurvey}
          />
        );
      case enumUtil.questionTypes.LOCATION:
        return <div>Not implemented</div>;
      default:
        return <div>Please select a question type.</div>;
    }
  };

  let canShow = true;
  const onClickQuestion = () => {
    if (isSurveyPublished && canShow) {
      canShow = false;
      toast.error("Cannot edit the survey while its being published", {
        position: "top-right",
        onClose: () => {
          canShow = true;
        },
      });
    }
  };

  return (
    <div onClick={onClickQuestion}>
      <OptionsModal
        show={isOpen}
        onHide={() => setIsOpen(false)}
        questionNameTitle={questionProp.name}
      >
        <Tabs variant="pills" defaultActiveKey="options" className="mb-3">
          <Tab eventKey="options" title="Options">
            <FormGroup className="block-input">
              <FormControlLabel
                control={
                  <Switch
                    disabled={isSurveyPublished}
                    onChange={onToggleRequired}
                    checked={questionProp.required}
                  />
                }
                label="Required"
              />
              <FormControlLabel
                control={
                  <Switch
                    disabled={isSurveyPublished}
                    onChange={onToggleIsShowResponse}
                    checked={questionProp.isShowResponse}
                  />
                }
                label="Show response to user"
              />
            </FormGroup>

            <br />

            {questionProp.type == "LINE TEXT" && (
              <div>
                <Col lg="6" xs="1">
                  <Form.Group
                    controlId="typeControlSelect"
                    className="drop-down-title-align-modal"
                  >
                    <Form.Label>Validations</Form.Label>
                    <br />
                    <br />
                    <Form.Control
                      as="select"
                      value={questionProp.metadata?.validation?.type}
                      onChange={onSelectedValidationType}
                      disabled={isSurveyPublished}
                    >
                      {commonConstants.VALIDATION_TYPES.map(
                        (validationType, index) => {
                          return (
                            <option value={validationType.value} key={index}>
                              {validationType.label}
                            </option>
                          );
                        }
                      )}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </div>
            )}
          </Tab>
          <Tab eventKey="BgImage" title="Background Image">
            <b>Background Image :</b>
            <ImageUploader onChange_={handleBackgroundImage} />
            <br />
            <b>Image Overlay Opacity :</b>
            <div className="row">
              <div className="col-6">
                <input
                  type="range"
                  className="custom-range"
                  min="0"
                  max="100"
                  defaultValue="1"
                  onChange={handleBackgroundImageOpacity}
                  value={
                    questionProp?.metadata?.questionBackgroundImageOpacity *
                      100 || ""
                  }
                  id="customRange1"
                />
              </div>
            </div>
            <Col sm={5} style={{ marginLeft: "400px", marginTop: "-150px" }}>
              <Tab.Container defaultActiveKey="desktop">
                <Card>
                  <Card.Header
                    style={{
                      padding: "0px",
                    }}
                  >
                    <Tab.Content
                      style={{
                        padding: "0px",
                      }}
                    >
                      <Tab.Pane eventKey="desktop">
                        <div
                          className="configuration-tab-preview-desktop"
                          style={{
                            backgroundImage: `url(${questionProp?.metadata?.questionBackgroundImageUrl})`,
                            opacity:
                              questionProp?.metadata
                                ?.questionBackgroundImageOpacity,

                            backgroundSize: "100% 100%",
                          }}
                        >
                          <br />
                        </div>
                      </Tab.Pane>

                      <Tab.Pane eventKey="mobile">
                        <div
                          className="configuration-tab-preview-mobile"
                          style={{
                            backgroundImage: `url(${questionProp?.metadata?.questionBackgroundImageUrl})`,
                            opacity:
                              questionProp?.metadata
                                ?.questionBackgroundImageOpacity,
                            backgroundSize: "100% 100%",
                          }}
                        >
                          <br />
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Card.Header>
                  <Card.Body>
                    <Col sm={12}>
                      <Nav variant="pills" className="flex-row">
                        <Nav.Item>
                          <Nav.Link eventKey="desktop">Desktop</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="mobile">Mobile</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                  </Card.Body>
                </Card>
              </Tab.Container>
            </Col>
          </Tab>
        </Tabs>
      </OptionsModal>

      <div>
        <Dropdown drop="bottom" className="drp-user">
          <Row>
            <Col lg="1" xs="1" className="dropdown.btn">
              <div className="duplicate-btn-container">
                <div className="duplicate-button">
                  <Tooltip title="Duplicate Question">
                    <Button
                      disabled={isSurveyPublished}
                      onClick={() => duplicateQuestion(questionIndex)}
                    >
                      <FileCopyOutlinedIcon
                        fontSize="small"
                        style={{
                          color: isSurveyPublished ? "grey" : "#2681f0",
                        }}
                      />
                    </Button>
                  </Tooltip>
                </div>
                <div className="drop-down-btn-align">
                  <Tooltip title="Question Settings">
                    <Dropdown.Toggle
                      variant={"link"}
                      id="dropdown-basic"
                      onClick={() => setIsOpen(true)}
                    >
                      <SettingsIcon />
                    </Dropdown.Toggle>
                  </Tooltip>
                </div>
              </div>
            </Col>
            <Col lg="7" xs="12">
              <label> </label>
              {questionProp.required && (
                <p className="survey-question-required">*Required</p>
              )}
              <FormTextInput
                label=""
                id="question-name"
                handleChange={changeQuestionName}
                value={questionProp.name}
                placeholder="Enter Question Name..."
                classes="question-name-custom-text"
                disabled={isSurveyPublished}
              />
            </Col>

            <Col lg="3" xs="12">
              <Form.Group
                controlId="typeControlSelect"
                className="drop-down-title-align"
              >
                <Form.Label>Select Type</Form.Label>
                <Form.Control
                  as="select"
                  value={questionProp.type}
                  onChange={onSelectedQuestionType}
                  disabled={isSurveyPublished}
                >
                  {questionTypes.map((questionType, index) => {
                    return (
                      <option value={questionType.value} key={index}>
                        {questionType.label}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Dropdown>
      </div>
      <Row className="question-name-custom-padding"></Row>
      <Row>{renderQuestionTypes(questionProp.type)}</Row>
    </div>
  );
};

SurveyQuestion.propTypes = {
  questionProp: PropTypes.object,
  questionIndex: PropTypes.number,
  duplicateQuestion: PropTypes.func,
  questionList: PropTypes.array,
};

export default SurveyQuestion;
