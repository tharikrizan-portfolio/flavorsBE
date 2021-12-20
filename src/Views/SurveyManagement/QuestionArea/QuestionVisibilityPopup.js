import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AlertDialog from '../../components/common/AlertDialog/AlertDialog';
import { toast } from 'react-toastify';
import { questionTypes } from '../../../util/enumerations';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import QuestionVisibilitySection from './QuestionVisibilitySection';
import { addConditionalQuestion, updateConditionalQuestion } from '../../../actions/survey.actions';
import useQuestionLogic from '../../../hooks/useQuestionLogic';

const QuestionVisibilityPopup = ({
  showVisibility,
  setShowVisibility,
  question,
  updateQuestionRedux,
  isAddSurvey,
}) => {
  const dispatch = useDispatch();

  //#region  Global states from redux

  const questionList = useSelector((state) =>
    isAddSurvey
      ? state?.addSurveyObj?.questions?.questionList
      : state?.updateSurveyObj?.surveyQuestions?.data,
  );
  //#endregion

  //#region  local states
  const CONDITIONS_LIMIT = 5;
  const [isValid, setIsValid] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [questionLogicList, setQuestionLogicList] = useState([
    {
      questionId: question.questionId || '',
      parentQuestionId: '',
      questionAnswerId: '',
      condition: null,
      operator: 'EQ',
      sequence: 1,
    },
  ]);
  const { removeAllConditions, conditionalQuestionList, addConditionalQuestions } =
    useQuestionLogic({ isAddSurvey });
  //#endregion

  //#region  useEffects
  useEffect(() => {
    const temp = conditionalQuestionList?.filter((item) => item.questionId === question.questionId);

    setQuestionLogicList(
      temp?.length > 0
        ? [...temp]
        : [
            {
              questionId: question.questionId || '',
              parentQuestionId: '',
              questionAnswerId: '',
              condition: null,
              operator: 'EQ',
              sequence: 1,
              answerValue: '',
            },
          ],
    );
  }, [conditionalQuestionList]);

  useEffect(() => {
    checkValid();
  }, [...questionLogicList, questionLogicList]);

  useEffect(() => {
    const temp = questionList
      .filter(
        (item) =>
          parseInt(item.step) < parseInt(question.step) &&
          (item.type === questionTypes.CHECKBOX ||
            item.type === questionTypes.RADIO_BUTTON ||
            item.type === questionTypes.LONG_LIST),
      )
      .map((x, i) => {
        return {
          value: x.questionId,
          label: x.name,
          questionAnswers: x.questionAnswers,
        };
      });
    setFilteredQuestions([
      {
        value: '',
        label: 'Select a Question...',
      },
      ...temp,
    ]);
  }, [questionList]);

  //#endregion

  //#region functions
  const checkValid = () => {
    questionLogicList && setIsValid(
      questionLogicList.every(
        (x) =>
          x.questionId.length > 0 && x.parentQuestionId.length > 0 && x.questionAnswerId.length > 0,
      ),
    );
  };

  const onSave = () => {
    addConditionalQuestions(question.questionId, questionLogicList);
    setShowVisibility(false);
  };

  const onAddNewCondition = () => {
    questionLogicList.length >= CONDITIONS_LIMIT
      ? toast.warning('Only ' + CONDITIONS_LIMIT + ' conditions can be added!')
      : setQuestionLogicList([
          ...questionLogicList,
          {
            questionId: question.questionId,
            parentQuestionId: '',
            questionAnswerId: '',
            condition: 'OR',
            operator: 'EQ',
            sequence: questionLogicList[questionLogicList.length - 1].sequence + 1,
            answerValue: '',
          },
        ]);
  };

  //#endregion
  const removeAll = () => {
    removeAllConditions(question.questionId);
  };
  //#region main return
  return (
    <AlertDialog
      open={showVisibility}
      handleClose={() => setShowVisibility(false)}
      handleOk={(e) => onSave()}
      title="Question Visibility Logic"
      okText="Save"
      cancelText="Close"
      disableSave={!isValid}
    >
      <div style={{ width: '1100px' }}>
        {questionLogicList.map((question, index) => (
          <QuestionVisibilitySection
            {...{
              question,
              setQuestionLogicList,
              filteredQuestions,
              index,
              questionLogicList,
              removeAllConditions: removeAll,
            }}
          />
        ))}
        <div className="center">
          <Button
            variant="contained"
            size="medium"
            disabled={!isValid}
            onClick={() => onAddNewCondition()}
            color="secondary"
          >
            Add Another Condition
          </Button>
        </div>
      </div>
    </AlertDialog>
  );
  //#endregion
};

QuestionVisibilityPopup.propTypes = {
  showVisibility: PropTypes.bool,
  setShowVisibility: PropTypes.func,
  question: PropTypes.object,
  updateQuestionRedux: PropTypes.func,
  isAddSurvey: PropTypes.bool,
};

export default QuestionVisibilityPopup;
