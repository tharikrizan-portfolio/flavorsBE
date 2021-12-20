import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { Col, Row, Collapse } from "react-bootstrap";
import { useSelector } from "react-redux";

import "../../../../assets/css/custom.css";
import QuizAnswersCard from "./components/QuizAnswersCard";
import MaterialCircularProgress from "../../../components/common/Loader/MaterialCircularProgress";

const PreviewFinalScreenQuiz = () => {
  const [showAnswers, setShowAnswers] = useState(false);

  const surveyObj = useSelector((state) => state.previewSurvey?.surveyObj);
  const score = useSelector((state) => state.previewSurvey?.score);

  return (
    <React.Fragment>
      <Row>
        <Col>
          <Typography
            className={"MuiTypography--heading preview-survey-title"}
            variant={"h4"}
            gutterBottom
          >
            <strong
              style={{
                color: surveyObj?.colorSchema?.title_font,
              }}
              dangerouslySetInnerHTML={{
                __html: surveyObj?.title,
              }}
            />
            <br />
            <p
              style={{
                color: surveyObj?.colorSchema?.subtitle_font,
              }}
              dangerouslySetInnerHTML={{
                __html: surveyObj?.postSubmissionData?.description,
              }}
            />
            <br />
            <p style={{ color: surveyObj?.colorSchema?.subtitle_font }}>
              Your Score :{" "}
              {score.totalPointsForQuiz ? (
                `${score.score}/${score.totalPointsForQuiz}`
              ) : (
                <MaterialCircularProgress />
              )}
            </p>
          </Typography>
        </Col>
      </Row>
      <Row>
        <Collapse in={showAnswers} style={{ width: "100%", margin: "1%" }}>
          <div>
            <QuizAnswersCard surveyObj={surveyObj} />
          </div>
        </Collapse>
      </Row>
      <Row>
        <Col
          className={"MuiTypography--heading preview-survey-title"}
          style={{ paddingTop: 0 }}
        >
          {surveyObj?.postSubmissionData?.isMultipleResponse && (
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className={`response-navigation-button center`}
              style={{
                color: surveyObj?.colorSchema?.button_font,
                backgroundColor: surveyObj?.colorSchema?.button,
              }}
            >
              {showAnswers ? "Close" : "View"}
            </button>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PreviewFinalScreenQuiz;
