import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { Row, Col, FormGroup, Label } from 'reactstrap';
import * as enumUtil from '../../../util/enumerations';
import RadioButtonQuestionResponseView from '../../components/QuestionResponseView/RadioButtonQuestionResponseView';
import LineTextQuestionResponseView from '../../components/QuestionResponseView/LineTextQuestionResponseView';
import CheckBoxQuestionResponseView from '../../components/QuestionResponseView/CheckBoxQuestionResponseView';
import RatingBarQuestionResponseView from '../../components/QuestionResponseView/RatingBarQuestionResponseView';
import LongListQuestionResponseView from '../../components/QuestionResponseView/LongListQuestionResponseView';

const QuestionReadView = ({ onSelect, question, isQuiz, isAddSurvey }) => {
  const colorSchema = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj?.survey?.colorSchema
      : state.updateSurveyObj?.survey?.colorSchema,
  );

  const surveyBackgroundImageUrl = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.survey?.configurationData?.surveyBackgroundImageUrl
      : state.updateSurveyObj.survey?.configurationData?.surveyBackgroundImageUrl,
  );
  const surveyBackgroundImageOpacity = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.survey?.configurationData?.surveyBackgroundImageOpacity
      : state.updateSurveyObj.survey?.configurationData?.surveyBackgroundImageOpacity,
  );

  const renderQuestionTypes = (questionType) => {
    if (isQuiz) {
      switch (questionType) {
        case enumUtil.questionTypes.RADIO_BUTTON:
          return <RadioButtonQuestionResponseView question={question} colorSchema={colorSchema} />;

        case enumUtil.questionTypes.LINE_TEXT:
          return (
            <LineTextQuestionResponseView question={question} colorSchema={colorSchema} isQuiz />
          );

        case enumUtil.questionTypes.CHECKBOX:
          return <CheckBoxQuestionResponseView question={question} colorSchema={colorSchema} />;

        default:
          return <div>Please select a question type.</div>;
      }
    }

    switch (questionType) {
      case enumUtil.questionTypes.RADIO_BUTTON:
        return <RadioButtonQuestionResponseView question={question} colorSchema={colorSchema} />;

      case enumUtil.questionTypes.LINE_TEXT:
        return (
          <LineTextQuestionResponseView question={question} colorSchema={colorSchema} isQuiz />
        );

      case enumUtil.questionTypes.CHECKBOX:
        return <CheckBoxQuestionResponseView question={question} colorSchema={colorSchema} />;

      case enumUtil.questionTypes.RATING_BAR:
        return <RatingBarQuestionResponseView question={question} colorSchema={colorSchema} />;

      case enumUtil.questionTypes.LONG_LIST:
        return <LongListQuestionResponseView question={question} colorSchema={colorSchema} />;

      case enumUtil.questionTypes.LOCATION:
        return <div>Not implemented</div>;

      default:
        return <div>Please select a question type.</div>;
    }
  };

  const questionName = () => {
    return (
      <div className="question-name-padding-response-view">
        <FormGroup row className="my-0">
          <Col xs="12">
            <FormGroup style={{ marginLeft: '2%' }}>
              <Label
                htmlFor="name"
                style={{
                  fontSize: '30px',
                  fontWeight: 'bold',
                  fontFamily: 'sans-serif',
                  color: colorSchema?.subtitle_font,
                }}
              >
                {question.name}
                {question.required ? <span style={{ marginLeft: '3px' }}>*</span> : ''}
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      <div
        className="rounded-card "
        style={{
          position: 'relative',
          backgroundImage: `url(${
            question?.metadata?.questionBackgroundImageUrl || surveyBackgroundImageUrl
          }`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        onClick={() => onSelect(question.step)}
      >
        <div
          className="bg"
          style={{
            backgroundColor: colorSchema?.question_scr,
            opacity:
              surveyBackgroundImageUrl || question?.metadata?.questionBackgroundImageUrl
                ? question?.metadata?.questionBackgroundImageOpacity ||
                  surveyBackgroundImageOpacity ||
                  0
                : 1,
          }}
        />
        <Grid container spacing={1}>
          <Grid item xs={12} style={{ padding: '1rem' }}>
            {question.name && (
              <>
                {questionName()}
                <div>{renderQuestionTypes(question.type)}</div>
              </>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default QuestionReadView;
