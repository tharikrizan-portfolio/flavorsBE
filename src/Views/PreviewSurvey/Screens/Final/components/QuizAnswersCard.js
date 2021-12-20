import React from "react";
import PropTypes from "prop-types";
import { Col, Card, Table } from "react-bootstrap";
import Divider from "@material-ui/core/Divider";
import ShadowScrollbar from "../../../../components/common/ShadowScrollBar/ShadowScrollBar";

const QuizAnswersCard = ({ surveyObj }) => {
  return (
    <Col
      md={8}
      xl={8}
      className={"MuiTypography--heading preview-survey-title"}
      style={{ paddingTop: 0, margin: "0 auto" }}
    >
      <Card
        className="Recent-Users"
        style={{
          backgroundColor: "transparent",
          border: `2px solid ${surveyObj?.colorSchema?.subtitle_font}`,
          borderRadius: "5px",
        }}
      >
        <Card.Body className="px-0 py-2">
          <ShadowScrollbar
            style={{
              height: "30vh",
            }}
            shadowColor={surveyObj?.colorSchema?.subtitle_font}
            scrollColor={surveyObj?.colorSchema?.subtitle_font}
          >
            <Table responsive style={{ border: "none" }}>
              <tbody
                style={{
                  color: surveyObj?.colorSchema?.subtitle_font,
                }}
              >
                {surveyObj.questions.map((question, index) => {
                  return (
                    <tr index={index}>
                      <td style={{ border: "none" }}>
                        <h6 className="mb-1">
                          {index + 1}) {question.name}
                        </h6>
                        {question.questionAnswers.map((answer) => {
                          if (answer.metadata.isCorrect) {
                            return <p className="m-0">{answer.name}</p>;
                          }
                        })}

                        <h6 className="mb-1">
                          {question.metadata?.feedbackText}
                        </h6>
                        <hr
                          style={{
                            borderTop: `3px solid ${surveyObj?.colorSchema?.subtitle_font}`,
                            borderRadius: "5px",
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </ShadowScrollbar>
        </Card.Body>
      </Card>
    </Col>
  );
};

QuizAnswersCard.propTypes = {};

export default QuizAnswersCard;
