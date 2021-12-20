import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { useSelector, useDispatch } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import { getThemes } from '../../../actions/survey.configuration.actions';
import ThemeConfiguration from './ThemeConfiguration';
import ThemeSelection from './components/ThemeSelection';

const SurveyTheme = ({ setIsOpen, isAddSurvey }) => {
  const dispatch = useDispatch();

  //Redux objects
  const headers = useSelector((state) => state.userData.user.headers);
  const themes = useSelector((state) => state?.surveyData?.themes?.data || []);

  //component states
  const [view, setView] = useState(1);

  useEffect(() => {
    dispatch(getThemes(headers));
  }, []);

  const selectTheme = () => {
    return (
      <>
        <div className="drawer-header">
          <h5>Select Theme</h5>
          <Tooltip title="Add New Theme">
            <IconButton onClick={() => setView(2)}>
              <AddIcon fontSize="large" color="primary" />
            </IconButton>
          </Tooltip>
        </div>
        <ThemeSelection themes={themes} setIsOpen={setIsOpen} isAddSurvey={isAddSurvey} />
      </>
    );
  };
  const newTheme = () => (
    <>
      <div className="drawer-header">
        <h5>New Theme</h5>
        <IconButton onClick={() => setView(1)}>
          <NavigateBeforeIcon fontSize="large" color="primary" />
        </IconButton>
      </div>
      <ThemeConfiguration isAddSurvey={isAddSurvey} setIsOpen={setIsOpen}/>
    </>
  );

  const themeSelection = () => {
    switch (view) {
      case 1:
        return selectTheme();
      case 2:
        return newTheme();

      default:
        return selectTheme();
    }
  };

  return <>{themeSelection()}</>;
};

export default SurveyTheme;
