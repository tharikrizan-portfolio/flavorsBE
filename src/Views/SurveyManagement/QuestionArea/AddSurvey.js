import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  saveDescription,
  saveTitle,
  updateDescription,
  updateTitle,
  changeValidations,
  updateValidations,
} from '../../../actions/survey.actions';
import Drawer from './../../components/common/Drawer/Drawer';
import MaterialButton from '../../components/common/Buttons/MaterialButton';
import CustomEditor from '../../components/common/Inputs/CustomEditor';
import SurveyQuestionList from '../../components/SurveyQuestionList';
import SurveyTheme from '../../components/ConfigurationTab/SurveyTheme';
import PropTypes from 'prop-types';
import { validateDescription, validateTitle } from '../../../util/validations';
import ValidationErrorMessage from '../../components/common/ErrorMessage/ValidationErrorMessage';
import { Typography } from '@material-ui/core';
import AddTemplate from './AddTemplate';

const AddSurvey = ({ isQuiz, isAddSurvey = true, canSaveAsTemplate }) => {
  const dispatch = useDispatch();
  const colorSchema = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj?.survey?.colorSchema
      : state.updateSurveyObj?.survey?.colorSchema,
  );
  const { title, purpose } = useSelector((state) =>
    isAddSurvey ? state.addSurveyObj.survey : state.updateSurveyObj.survey,
  );

  const titleError = useSelector((state) =>
    isAddSurvey ? state.addSurveyObj?.errorState?.title : state.updateSurveyObj.errorState?.title,
  );

  const descriptionError = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj?.errorState?.description
      : state.updateSurveyObj.errorState?.description,
  );
  const surveyBackgroundImageOpacity = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.survey?.configurationData?.surveyBackgroundImageOpacity
      : state.updateSurveyObj.survey?.configurationData?.surveyBackgroundImageOpacity,
  );

  const surveyBackgroundImageUrl = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.survey?.configurationData?.surveyBackgroundImageUrl
      : state.updateSurveyObj.survey?.configurationData?.surveyBackgroundImageUrl,
  );

  const [isOpen, setIsOpen] = useState(false);

  const changeTitleState = (state) => {
    // TODO: Update this with dispatch call and useSelector validateTitle(state)

    isAddSurvey
      ? dispatch(changeValidations({ type: 'title', data: validateTitle(state) }))
      : dispatch(updateValidations({ type: 'title', data: validateTitle(state) }));
    dispatch(isAddSurvey ? saveTitle({ title: state }) : updateTitle({ title: state }));
  };
  const changePurpose = (state) => {
    isAddSurvey
      ? dispatch(changeValidations({ type: 'description', data: validateDescription(state) }))
      : dispatch(updateValidations({ type: 'description', data: validateDescription(state) }));

    dispatch(
      isAddSurvey ? saveDescription({ purpose: state }) : updateDescription({ purpose: state }),
    );
  };

  const [titleFirstRun, setTitleFirstRun] = useState();
  const [descriptionFirstRun, setDescriptionFirstRun] = useState();

  useEffect(() => {
    if (isAddSurvey) {
      setTitleFirstRun(true);
      setDescriptionFirstRun(true);
      dispatch(changeValidations({ type: 'title', data: validateTitle(title || '') }));

      dispatch(
        changeValidations({ type: 'description', data: validateDescription(purpose || '') }),
      );
    } else {
      dispatch(updateValidations({ type: 'title', data: validateTitle(title) }));
      dispatch(updateValidations({ type: 'description', data: validateDescription(purpose) }));
    }
  }, []);

  useEffect(() => {
    if (title) {
      setTitleFirstRun(false);
    }
    if (purpose) {
      setDescriptionFirstRun(false);
    }
  }, [title, purpose]);

  return (
    <>
      <div>
        <div className="title-with-button">
          <Typography variant={'h6'} gutterBottom>
            {`${isAddSurvey ? 'Creating' : 'Editing'} ${isQuiz ? 'Quiz' : 'Survey'}`}
          </Typography>
          <div>
            <AddTemplate {...{ isAddSurvey, isQuiz }} />
            <MaterialButton
              color="primary"
              className="global-class-name"
              label="Select Theme"
              type="submit"
              handleClick={() => setIsOpen(true)}
            />
          </div>
        </div>

        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
          <SurveyTheme isAddSurvey={isAddSurvey} setIsOpen={setIsOpen} />
        </Drawer>

        <div
          className="rounded-card mt-15"
          style={{
            position: 'relative',
            backgroundImage: `url(${surveyBackgroundImageUrl}`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div
            className="bg"
            style={{
              backgroundColor: colorSchema?.question_scr,
              opacity: surveyBackgroundImageUrl ? surveyBackgroundImageOpacity || 0 : 1,
            }}
          />
          <CustomEditor
            textAlign="center"
            content={title}
            onChange={changeTitleState}
            placeholder={`Add Your ${isQuiz ? 'Quiz' : 'Survey'} Title...`}
            fontColor={colorSchema.title_font}
            preTag="h2"
          />
          <div style={{ textAlign: 'center' }}>
            {!titleFirstRun && <ValidationErrorMessage error={titleError} />}
          </div>

          <CustomEditor
            textAlign="center"
            content={purpose}
            onChange={changePurpose}
            placeholder={`Add Your ${isQuiz ? 'Quiz' : 'Survey'} Description...`}
            fontColor={colorSchema.subtitle_font}
            preTag="h3"
          />
          <div style={{ textAlign: 'center' }}>
            {!descriptionFirstRun && <ValidationErrorMessage error={descriptionError} />}
          </div>
        </div>
        <SurveyQuestionList isAddSurvey={isAddSurvey} isQuiz={isQuiz} />
      </div>
    </>
  );
};

AddSurvey.propTypes = {
  isQuiz: PropTypes.bool,
};

export default AddSurvey;
