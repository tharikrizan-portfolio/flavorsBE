import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BrootStrapDropdown from '../../components/common/DropDown/BrootStrapDropdown';
import { conditionOperators } from '../../../util/enumerations';
import { Button, Grid, RadioGroup, Radio, FormControl, FormControlLabel } from '@material-ui/core';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const QuestionVisibilitySection = ({
  question,
  setQuestionLogicList,
  filteredQuestions,
  index,
  questionLogicList,
  removeAllConditions,
}) => {
  const [answerList, setAnswerList] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState(question.condition);

  useEffect(() => {
    const filteredAnswers = getFilteredAnswers();
    setAnswerList([
      {
        value: '',
        label: 'Select an Answer...',
      },
      ...filteredAnswers,
    ]);
  }, [question.parentQuestionId, filteredQuestions]);

  useEffect(() => {
    const filteredAnswers =
      question.operator == 'GT' || question.operator == 'LT'
        ? getFilteredAnswers()?.filter((x) => Number(x.label))
        : getFilteredAnswers();

    if (!filteredAnswers.find((x) => x.value === question.questionAnswerId))
      onChange({ ...question, questionAnswerId: '' }, index);

    setAnswerList([
      {
        value: '',
        label: 'Select an Answer...',
      },
      ...filteredAnswers,
    ]);
  }, [question.operator]);

  const getFilteredAnswers = () => {
    const filteredAnswers =
      filteredQuestions
        .find((x) => x.value === question.parentQuestionId)
        ?.questionAnswers?.filter((x) => x.name.length > 0)
        .map((x) => {
          return { value: x.questionAnswerId, label: x.name };
        }) || [];
    return filteredAnswers;
  };

  const removeOption = (index) => {
    if (questionLogicList.length == 1) {
      removeAllConditions();
    } else {
      questionLogicList.splice(index, 1);
      setQuestionLogicList([...questionLogicList]);
    }
  };

  const onChange = (question, i) => {
    questionLogicList[i] = { ...question };
    setQuestionLogicList([...questionLogicList]);
  };

  const handleChange = (e) => {
    setSelectedOperator(e.target.value);
    questionLogicList[index] = { ...question, condition: e.target.value };
    setQuestionLogicList([...questionLogicList]);
  };

  return (
    <>
      {index !== 0 && (
        <div className="mt-2 mb-2 center">
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="condition"
              name="condition"
              value={selectedOperator}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="OR" control={<Radio />} label="OR" color="#1976d2" />
              <FormControlLabel value="AND" control={<Radio />} label="AND" color="#1976d2" />
            </RadioGroup>
          </FormControl>
        </div>
      )}
      <Grid className="mb-2 mt-2" container spacing={2}>
        <Grid item xs={7}>
          <BrootStrapDropdown
            handleSelect={(e) =>
              onChange(
                { ...question, parentQuestionId: e.target.value, questionAnswerId: '' },
                index,
              )
            }
            options={filteredQuestions}
            value={question.parentQuestionId}
          />
        </Grid>
        <Grid item xs={2}>
          <BrootStrapDropdown
            handleSelect={(e) => onChange({ ...question, operator: e.target.value }, index)}
            options={conditionOperators}
            value={question.operator}
          />
        </Grid>
        <Grid item xs={3}>
          <div className="flex">
            <div style={{ width: '100%' }}>
              <BrootStrapDropdown
                handleSelect={(e) => {
                  onChange(
                    {
                      ...question,
                      questionAnswerId: e.target.value,
                      answerValue: answerList.find((x) => x.value == e.target.value)?.label || '',
                    },
                    index,
                  );
                }}
                options={answerList}
                value={question.questionAnswerId}
                disabled={!question.parentQuestionId}
              />
            </div>
            <Button style={{ minWidth: 0, display: 'block' }} onClick={() => removeOption(index)}>
              <RemoveCircleOutlineIcon fontSize="small" />
            </Button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

QuestionVisibilitySection.propTypes = {
  question: PropTypes.object,
  setQuestionLogicList: PropTypes.func,
  filteredQuestions: PropTypes.array,
  index: PropTypes.number,
  questionLogicList: PropTypes.array,
  removeAllConditions: PropTypes.func,
};

export default QuestionVisibilitySection;
