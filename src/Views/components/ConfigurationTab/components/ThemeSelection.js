import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import ThemePreviewCard from './ThemePreviewCard';
import { changeTheme, updateTheme } from '../../../../actions/survey.configuration.actions';
import ShadowScrollbar from '../../common/ShadowScrollBar/ShadowScrollBar';

const ThemeSelection = ({ themes, isAddSurvey, setIsOpen }) => {
  const dispatch = useDispatch();

  const handleThemeSelection = (themeName) => {
    let theme = themes?.filter((x) => x.themeData.name === themeName)?.[0];
    isAddSurvey ? dispatch(changeTheme(theme.themeData)) : dispatch(updateTheme(theme.themeData));
    setIsOpen(false);
  };

  return (
    <div
      style={{
        border: '1px solid',
        borderRadius: '10px',
        borderColor: 'rgb(196, 196, 196)',
        width: '330px',
        marginTop: '20px',
        overflow: 'auto',
      }}
    >
      <ShadowScrollbar
        style={{
          height: '89vh',
        }}
        shadowColor="#a1a1a1"
        scrollColor="#a1a1a1"
      >
        {themes?.map((opt) => (
          <ThemePreviewCard
            theme={opt}
            handleThemeSelection={handleThemeSelection}
            setIsOpen={setIsOpen}
          />
        ))}
      </ShadowScrollbar>
    </div>
  );
};

ThemeSelection.propTypes = {
  themes: PropTypes.array,
  isAddSurvey: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default ThemeSelection;
