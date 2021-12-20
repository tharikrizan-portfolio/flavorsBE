import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import imgSheets from './formTypeImages/Survey1.svg';
import imgQuiz from './formTypeImages/Quiz1.svg';
import './DashboardDesign.css';
import CreateFormCard from './Subcomponents/CreateFormCard';
import { setCanSaveTemplate } from '../../actions/survey.actions';

const useStyles = makeStyles((theme) => ({
  survey: {
    background: theme.palette.success.main,
    borderRadius: 6,
    color: 'white',
    height: 40,
    padding: '0 30px',
    '&:hover': {
      color: 'white',
      background: theme.palette.success.main,
    },
    width: '200px',
    margin: 'auto',
  },
  quiz: {
    background: theme.palette.warning.main,
    borderRadius: 6,
    color: 'white',
    height: 40,
    padding: '0 30px',
    '&:hover': {
      color: 'white',
      background: theme.palette.warning.main,
    },
    width: '200px',
    margin: 'auto',
  },
}));
const FormModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div className="flex-space-even">
      <CreateFormCard
        imgSheets={imgSheets}
        label="Survey"
        buttonLabel="Create Survey"
        buttonUrl="/#/survey-management/add-new-survey"
        buttonStyle={classes.survey}
        enableSaveTemplate={() => dispatch(setCanSaveTemplate(true))}
      />
      <CreateFormCard
        imgSheets={imgQuiz}
        label="Quiz"
        buttonLabel="Create Quiz"
        buttonUrl="/#/survey-management/add-new-quiz"
        buttonStyle={classes.quiz}
        enableSaveTemplate={() => dispatch(setCanSaveTemplate(true))}
      />
    </div>
  );
};

FormModal.propTypes = {
  onHide: PropTypes.any,
  questionNameTitle: PropTypes.any,
};

export default FormModal;
