import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Row } from 'react-bootstrap';
import FormTextInput from '../common/Inputs/FormTextInput';
import commonConstants from '../../../util/common.constants';
import CustomSelect from '../common/DropDown/CustomSelect';
import { v4 as uuidv4 } from 'uuid';

const LineTextQuestion = ({ questionProp, updateRedux }) => {
  const onChangeTextOption = (e) => {
    let responseTextArr = [];
    responseTextArr.push({
      questionAnswerId: uuidv4(),
      name: e.target.value,
      value: e.target.value,
    });

    const updatedQuestionData = {
      ...questionProp,
      questionAnswers: responseTextArr,
    };

    updateRedux(updatedQuestionData);
  };

  const onSelectedValidationType = (option) => {
    const updatedQuestionData = {
      ...questionProp,
      metadata: {
        ...questionProp.metadata,
        validation: { type: option.value },
      },
    };

    updateRedux(updatedQuestionData);
  };

  return (
    <>
      <Row style={{ marginTop: '10px' }}>
        <Col lg="9" xs="12" style={{ paddingRight: '11px' }}>
          <FormTextInput
            classes="line-text-question-textbox"
            handleChange={onChangeTextOption}
            value={questionProp.questionAnswers?.[0]?.name || ''}
            placeholder="Enter suggestive text for response view"
          />
        </Col>
        <Col lg="3" xs="12" style={{ paddingLeft: '5px' }}>
          <CustomSelect
            options={commonConstants.VALIDATION_TYPES}
            value={questionProp.metadata?.validation?.type}
            onChange={onSelectedValidationType}
            placeholder="Select Validation..."
          />          
        </Col>
      </Row>
      <br/>
    </>
  );
};

LineTextQuestion.propTypes = {
  questionProp: PropTypes.object,
  updateRedux: PropTypes.func,
};

export default memo(LineTextQuestion);
