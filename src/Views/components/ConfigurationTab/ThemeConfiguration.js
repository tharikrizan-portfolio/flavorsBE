import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import reactCSS from 'reactcss';
import {
  changeSplashScrDescriptionFontColor,
  changeSplashScrBgColor,
  updateSplashScrBgColor,
  updateSplashScrButtonText,
} from '../../../actions/shareSurveyConfiguration.actions';
import {
  changeSurveyDescriptionFontColor,
  changeSurveyTitleFontColor,
  changeSurveyQuestionScrBgColor,
  resetSurveyConfigurationColors,
  updateSurveyDescriptionFontColor,
  updateSurveyTitleFontColor,
  updateSurveyQuestionScrBgColor,
  UpdateResetSurveyConfigurationColors,
  changeSurveyButtonFontColor,
  updateSurveyButtonFontColor,
  changeSurveyButtonColor,
  updateSurveyButtonColor,
  saveNewTheme,
  changeSurveyBackgroundImageOpacity,
  changeSurveyBackgroundImageUrl,
  updateSurveyBackgroundImageOpacity,
  updateSurveyBackgroundImageUrl,
} from '../../../actions/survey.configuration.actions';
import ColorPicker from '../common/ColorPicker/ColorPicker';
import '../../../assets/css/custom.css';
import ConfigurationPreview from './ConfigurationPreview';
import AddNewThemeField from './components/AddNewThemeField';
import ShadowScrollbar from '../common/ShadowScrollBar/ShadowScrollBar';
import ImageUploaderIcon from '../common/FileUploader/ImageUploaderIcon';
import ReactEasyCrop from '../common/ReactEasyCrop/ReactEasyCrop';
import { Tooltip, IconButton } from '@material-ui/core';

const ThemeConfiguration = ({ isAddSurvey, setIsOpen }) => {
  const dispatch = useDispatch();

  const headers = useSelector((state) => state.userData.user.headers);
  const titleHtml = useSelector((state) =>
    isAddSurvey ? state.addSurveyObj.survey.title : state.updateSurveyObj.survey.title,
  );
  const descriptionHtml = useSelector((state) =>
    isAddSurvey ? state.addSurveyObj.survey.purpose : state.updateSurveyObj.survey.purpose,
  );

  const questionScrBgColor = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.survey.colorSchema.question_scr
      : state.updateSurveyObj.survey.colorSchema.question_scr,
  );
  const titleFontColor = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.survey.colorSchema.title_font
      : state.updateSurveyObj.survey.colorSchema.title_font,
  );
  const descriptionFontColor = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.survey.colorSchema.subtitle_font
      : state.updateSurveyObj.survey.colorSchema.subtitle_font,
  );
  const buttonFontColor = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.survey.colorSchema.button_font
      : state.updateSurveyObj.survey.colorSchema.button_font,
  );
  const buttonColor = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.survey.colorSchema.button
      : state.updateSurveyObj.survey.colorSchema.button,
  );
  const surveyBackgroundImageUrl = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.survey?.configurationData?.surveyBackgroundImageUrl
      : state.updateSurveyObj.survey?.configurationData?.surveyBackgroundImageUrl,
  );
  const surveyBackgroundImageFileName = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.survey?.configurationData?.fileName
      : state.updateSurveyObj.survey?.configurationData?.fileName,
  );
  const surveyBackgroundImageOpacity = useSelector((state) =>
    isAddSurvey
      ? state.addSurveyObj.survey?.configurationData?.surveyBackgroundImageOpacity
      : state.updateSurveyObj.survey?.configurationData?.surveyBackgroundImageOpacity,
  );

  const handleQuestionScrBgColorChange = (color) => {
    isAddSurvey
      ? dispatch(changeSurveyQuestionScrBgColor(color))
      : dispatch(updateSurveyQuestionScrBgColor(color));
  };
  const handleSurveyTitleFontColorChange = (color) => {
    isAddSurvey
      ? dispatch(changeSurveyTitleFontColor(color))
      : dispatch(updateSurveyTitleFontColor(color));
  };
  const handleDescriptionFontColorChange = (color) => {
    isAddSurvey
      ? dispatch(changeSurveyDescriptionFontColor(color))
      : dispatch(updateSurveyDescriptionFontColor(color));
  };
  const handleButtonFontColorChange = (color) => {
    isAddSurvey
      ? dispatch(changeSurveyButtonFontColor(color))
      : dispatch(updateSurveyButtonFontColor(color));
  };
  const handleButtonColorChange = (color) => {
    isAddSurvey
      ? dispatch(changeSurveyButtonColor(color))
      : dispatch(updateSurveyButtonColor(color));
  };
  const resetColors = () => {
    isAddSurvey
      ? dispatch(resetSurveyConfigurationColors())
      : dispatch(UpdateResetSurveyConfigurationColors());
  };
  const setSplashScreenBGColor = (color) => {
    isAddSurvey ? dispatch(changeSplashScrBgColor(color)) : dispatch(updateSplashScrBgColor(color));
  };
  const setSplashScreenDescriptionColor = (color) => {
    isAddSurvey
      ? dispatch(changeSplashScrDescriptionFontColor(color))
      : dispatch(updateSplashScrButtonText(color));
  };
  const setLocalImage = (url, fileName, crppingToolVisiblity = true) => {
    if (isAddSurvey) {
      dispatch(changeSurveyBackgroundImageUrl({ url, fileName }));
    } else {
      dispatch(updateSurveyBackgroundImageUrl({ url, fileName }));
    }
    setIsImageCropperVisible(crppingToolVisiblity);
  };

  const handleCroppedImage = (url) => {
    if (isAddSurvey) {
      dispatch(changeSurveyBackgroundImageUrl({ url, fileName: surveyBackgroundImageFileName }));
    } else {
      dispatch(updateSurveyBackgroundImageUrl({ url, fileName: surveyBackgroundImageFileName }));
    }

    setIsImageCropperVisible(false);
  };

  const setLocalImageOpacity = (e) => {
    const value = e.target.value / 100;

    isAddSurvey
      ? dispatch(changeSurveyBackgroundImageOpacity(value))
      : dispatch(updateSurveyBackgroundImageOpacity(value));
  };
  const [displayColorPickerBackground, handleClickBackGroundColorPicker] = useState(false);
  const [displayColorPickerTitleFont, handleClickTitleFontColorPicker] = useState(false);
  const [displayColorPickerDescriptionFont, handleClickDescriptionFontColorPicker] = useState(
    false,
  );
  const [displayColorPickerButtonFont, handleClickButtonFontColorPicker] = useState(false);
  const [displayColorPickerButton, handleClickButtonColorPicker] = useState(false);
  const [isImageCropperVisible, setIsImageCropperVisible] = useState(false);

  const styles = reactCSS({
    default: {
      colorBackGround: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: questionScrBgColor,
      },
      colorTitleFont: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: titleFontColor,
      },
      colorDescriptionFont: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: descriptionFontColor,
      },
      colorButtonFont: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: buttonFontColor,
      },
      colorButton: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: buttonColor,
      },

      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
        left: '110px',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  //--- send the create theme request to the server
  const createNewTheme = (themeTitle) => {
    const newThemeObject = {
      name: themeTitle,
      buttonFontColor,
      buttonColor,
      descriptionFontColor,
      titleFontColor,
      questionScrBgColor,
    };
    //--- send the data to the server
    dispatch(saveNewTheme(headers, newThemeObject));
  };

  return (
    <>
      <hr />
      <ShadowScrollbar
        style={{
          height: '88vh',
        }}
        shadowColor="#a1a1a1"
        scrollColor="#a1a1a1"
      >
        <div style={{ width: '305px', marginTop: '5px', marginLeft: '5px' }}>
          <div className="flex-space-between">
            <span>
              <strong>Background color</strong>
            </span>
            <div>
              <div
                style={styles.swatch}
                onClick={() => {
                  handleClickBackGroundColorPicker(!displayColorPickerBackground);
                }}
              >
                <div style={styles.colorBackGround} />
              </div>
              {displayColorPickerBackground && (
                <div style={styles.popover}>
                  <div
                    style={styles.cover}
                    onClick={() => {
                      handleClickBackGroundColorPicker(false);
                    }}
                  />
                  <ColorPicker
                    color={questionScrBgColor}
                    onChangeComplete={(e) => {
                      setSplashScreenBGColor(e);
                      handleQuestionScrBgColorChange(e);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <br />
          <div className="flex-space-between">
            <span>
              <strong>Title Font Color</strong>
            </span>
            <div>
              <div
                style={styles.swatch}
                onClick={() => {
                  handleClickTitleFontColorPicker(!displayColorPickerTitleFont);
                }}
              >
                <div style={styles.colorTitleFont} />
              </div>
              {displayColorPickerTitleFont && (
                <div style={styles.popover}>
                  <div
                    style={styles.cover}
                    onClick={() => {
                      handleClickTitleFontColorPicker(false);
                    }}
                  />
                  <ColorPicker
                    color={titleFontColor}
                    onChangeComplete={(e) => handleSurveyTitleFontColorChange(e)}
                  />
                </div>
              )}
            </div>
          </div>
          <br />
          <div className="flex-space-between">
            <span>
              <strong>Description and question font Color</strong>
            </span>
            <div>
              <div
                style={styles.swatch}
                onClick={() => {
                  handleClickDescriptionFontColorPicker(!displayColorPickerDescriptionFont);
                }}
              >
                <div style={styles.colorDescriptionFont} />
              </div>
              {displayColorPickerDescriptionFont && (
                <div style={styles.popover}>
                  <div
                    style={styles.cover}
                    onClick={() => {
                      handleClickDescriptionFontColorPicker(false);
                    }}
                  />
                  <ColorPicker
                    color={descriptionFontColor}
                    onChangeComplete={(e) => {
                      setSplashScreenDescriptionColor(e);
                      handleDescriptionFontColorChange(e);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <br />
          {/* button color */}
          <div className="flex-space-between">
            <span>
              <strong>Button color</strong>
            </span>
            <div>
              <div
                style={styles.swatch}
                onClick={() => {
                  handleClickButtonColorPicker(!displayColorPickerButton);
                }}
              >
                <div style={styles.colorButton} />
              </div>
              {displayColorPickerButton && (
                <div style={styles.popover}>
                  <div
                    style={styles.cover}
                    onClick={() => {
                      handleClickButtonColorPicker(false);
                    }}
                  />
                  <ColorPicker
                    color={buttonColor}
                    onChangeComplete={(e) => {
                      handleButtonColorChange(e);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <br />
          <div className="flex-space-between">
            <span>
              <strong>Button Font color</strong>
            </span>
            <div>
              <div
                style={styles.swatch}
                onClick={() => {
                  handleClickButtonFontColorPicker(!displayColorPickerButtonFont);
                }}
              >
                <div style={styles.colorButtonFont} />
              </div>
              {displayColorPickerButtonFont && (
                <div style={styles.popover}>
                  <div
                    style={styles.cover}
                    onClick={() => {
                      handleClickButtonFontColorPicker(false);
                    }}
                  />
                  <ColorPicker
                    color={buttonFontColor}
                    onChangeComplete={(e) => {
                      handleButtonFontColorChange(e);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <hr />
          <br />
          <div style={{ display: 'flex' }}>
            <b className="top-bottom-margin-auto">Background Image Configuration</b>
            <Tooltip title="Add Background Image">
              <IconButton>
                <ImageUploaderIcon setLocalImage={setLocalImage} />
              </IconButton>
            </Tooltip>
          </div>
          <br />

          {isImageCropperVisible ? (
            <ReactEasyCrop
              image={surveyBackgroundImageUrl}
              handleImageChange={handleCroppedImage}
            />
          ) : (
            <ConfigurationPreview
              titleFontColor={titleFontColor}
              questionScrBgColor={questionScrBgColor}
              titleHtml={titleHtml}
              descriptionFontColor={descriptionFontColor}
              descriptionHtml={descriptionHtml}
              buttonColor={buttonColor}
              buttonFontColor={buttonFontColor}
              surveyBackgroundImageUrl={surveyBackgroundImageUrl}
              surveyBackgroundImageOpacity={surveyBackgroundImageOpacity}
              resetColors={resetColors}
              setLocalImage={setLocalImage}
            />
          )}
          <br />
          <br />
          <span>
            <strong>Image Overlay Opacity</strong>
          </span>
          <div>
            <input
              type="range"
              className="custom-range"
              defaultValue="0"
              onChange={setLocalImageOpacity}
              id="customRange1"
            />
          </div>
          <br />

          <br />
          <AddNewThemeField createNewTheme={createNewTheme} setIsOpen={setIsOpen}/>
        </div>
      </ShadowScrollbar>
    </>
  );
};

ThemeConfiguration.propTypes = {
  isAddSurvey: PropTypes.bool,
  setIsOpen: PropTypes.func
};

export default ThemeConfiguration;
