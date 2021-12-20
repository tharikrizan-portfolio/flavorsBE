import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterQuestions, setQuestionAnswer } from '../actions/preview.actions';

const useQuestionPreviewLogic = () => {
  const dispatch = useDispatch();
  const questionAnswers = useSelector((state) => state?.previewSurvey?.questionAnswers || []);
  const allQuestions = useSelector((state) => state?.previewSurvey?.allQuestions || []);
  const conditionalQuestionList = useSelector(
    (state) => state?.previewSurvey?.surveyObj?.conditionalQuestionList || [],
  );

  useEffect(() => {
    filterChildQuestions();
  }, [questionAnswers]);

  const filterChildQuestions = () => {
    let tempQuestions = allQuestions
      .filter((question) => canShowQuestion(question.questionId))
      .map((x, i) => ({ ...x, step: i + 1 }));

    dispatch(filterQuestions(tempQuestions));
  };

  const addQuestionAnswers = (questionId, newValues) => {
    const updatedList = questionAnswers?.filter((item) => item.questionId != questionId) || [];
    dispatch(setQuestionAnswer([...updatedList, ...newValues]));
  };

  const isEqual = (item) => {
    const filteredAnswers = questionAnswers.filter((y) => y.questionId == item.parentQuestionId);
    return filteredAnswers.length > 0
      ? filteredAnswers.some((y) => y.questionAnswerId == item.questionAnswerId)
      : true;
  };

  const notEqual = (item) => {
    const filteredAnswers = questionAnswers.filter((x) => x.questionId == item.parentQuestionId);
    return filteredAnswers.length > 0
      ? filteredAnswers.every((y) => y.questionAnswerId != item.questionAnswerId)
      : true;
  };
  const lessThan = (item) => {
    const filteredAnswers = questionAnswers.filter(
      (x) => x.questionId == item.parentQuestionId && Number(x.value),
    );
    return filteredAnswers.length > 0
      ? !filteredAnswers.some((y) => parseFloat(y.value) >= parseFloat(item.answerValue))
      : true;
  };

  const greaterThan = (item) => {
    const filteredAnswers = questionAnswers.filter(
      (x) => x.questionId == item.parentQuestionId && Number(x.value),
    );
    return filteredAnswers.length > 0
      ? !filteredAnswers.some((y) => parseFloat(y.value) <= parseFloat(item.answerValue))
      : true;
  };

  const canShowQuestion = (questionId) => {
    const dependencies = conditionalQuestionList?.filter((x) => x.questionId == questionId);
    if (!dependencies || dependencies?.length == 0) {
      return true;
    } else {
      let canShow = false;
      let curCondition = null;
      dependencies.forEach((item) => {
        curCondition = item.condition;
        switch (item.operator) {
          case 'EQ':
            switch (curCondition) {
              case 'OR':
                canShow = !canShow ? isEqual(item) : canShow;
                break;
              case 'AND':
                canShow = canShow && isEqual(item);
                break;
              default:
                canShow = isEqual(item);
                break;
            }
            break;
          case 'NE':
            switch (curCondition) {
              case 'OR':
                canShow = canShow && notEqual(item);
                break;
              case 'AND':
                canShow = !canShow ? notEqual(item) : canShow;
                break;
              default:
                canShow = notEqual(item);
                break;
            }
            break;
          case 'LT':
            switch (curCondition) {
              case 'OR':
                canShow = !canShow ? lessThan(item) : canShow;
                break;
              case 'AND':
                canShow = canShow && lessThan(item);
                break;
              default:
                canShow = lessThan(item);
                break;
            }
            break;
          case 'GT':
            switch (curCondition) {
              case 'OR':
                canShow = !canShow ? greaterThan(item) : canShow;
                break;
              case 'AND':
                canShow = canShow && greaterThan(item);
                break;
              default:
                canShow = greaterThan(item);
                break;
            }
            break;
        }
      });
      return canShow;
    }
  };

  return {
    canShowQuestion,
    addQuestionAnswers,
  };
};

useQuestionPreviewLogic.propTypes = {};

export default useQuestionPreviewLogic;
