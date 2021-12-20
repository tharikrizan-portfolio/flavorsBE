import React, { useState, useEffect } from 'react';
import FormTextInput from '../../components/common/Inputs/FormTextInput';
import { useSave } from '../../../hooks/useSave';
import AlertDialog from '../../components/common/AlertDialog/AlertDialog';
import MaterialButton from '../../components/common/Buttons/MaterialButton';
import ValidationErrorMessage from '../../components/common/ErrorMessage/ValidationErrorMessage';
import { useSelector } from 'react-redux';

const AddTemplate = ({ isAddSurvey, isQuiz }) => {
  const { OnSaveTemplate } = useSave({
    isAddSurvey,
    isQuiz,
  });

  const errorState = useSelector((state) =>
    isAddSurvey ? state.addSurveyObj.errorState : state.updateSurveyObj.errorState,
  );

  const canSaveTemplate = useSelector(
    (state) => state.addSurveyObj?.survey?.canSaveTemplate || false,
  );

  const [templateName, setTemplateName] = useState('');
  const [showTemplateConfimDialog, setShowTemplateConfimDialog] = useState(false);
  const [error, setError] = useState({ isError: false, errorMsg: '' });
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);

  useEffect(() => {
    setIsNextButtonDisabled(
      errorState?.title?.isError ||
        errorState?.description?.isError ||
        errorState?.questionTitle?.isError ||
        errorState?.option?.isError ||
        errorState?.ratingValue?.isError,
    );
  }, [errorState]);

  const validate = ({ value }) => {
    value.length == 0
      ? setError({ isError: true, errorMsg: 'Template name is required' })
      : setError({ isError: false, errorMsg: '' });
  };

  const onChange = (e) => {
    setTemplateName(e.target.value);
    validate({ value: e.target.value });
  };

  return (
    <>
      <MaterialButton
        color="primary"
        className="global-class-name mr-2"
        label="Save as Template"
        variant="outlined"
        disabled={!canSaveTemplate || isNextButtonDisabled}
        handleClick={() => setShowTemplateConfimDialog(true)}
      />
      <AlertDialog
        open={showTemplateConfimDialog}
        handleClose={() => setShowTemplateConfimDialog(false)}
        handleOk={(e) => OnSaveTemplate({ e, templateName })}
        title="Save Template"
        okText="Save"
        cancelText="Cancel"
        disableSave={templateName.length == 0}
      >
        <FormTextInput
          label="Template Name"
          id="template-name"
          handleChange={(e) => onChange(e)}
          value={templateName || ''}
          placeholder="Enter Template Name..."
          classes="question-name-custom-text"
          disabled={false}
        />
        <ValidationErrorMessage error={error} />
      </AlertDialog>
    </>
  );
};

export default AddTemplate;
