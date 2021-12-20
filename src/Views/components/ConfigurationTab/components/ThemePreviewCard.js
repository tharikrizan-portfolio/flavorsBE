import React from 'react';
import PropTypes from 'prop-types';
import { Card, Grid } from '@material-ui/core';
import { Row, Col, Button, Tab, Nav } from 'react-bootstrap';

const ThemePreviewCard = ({ theme, handleThemeSelection }) => {
  return (
    <>
      <div onClick={() => handleThemeSelection(theme.themeData.name)}>
        <Row className="row-margin-set">
          <Col className="configuration-tab-preview-desktop-sm" xs="5" md="5" lg="5">
            <div
              style={{
                backgroundColor: theme.themeData?.questionScrBgColor,
                backgroundImage: `url(${theme.themeData?.surveyBackgroundImageUrl})`,
                opacity: theme.themeData?.surveyBackgroundImageOpacity,
                height: '100%',
                borderRadius:'5px'

              }}
            >
              <span
                className={'configuration-tab-preview-desktop-text'}
                style={{
                  color: theme.themeData?.titleFontColor,
                }}
              >
                Title
              </span>
              <span
                className={'configuration-tab-preview-desktop-text'}
                style={{
                  color: theme.themeData?.descriptionFontColor,
                }}
              >
                Description
              </span>
              <div className="configuration-tab-preview-desktop-text">
                <button
                  class="next-previous-button"
                  style={{
                    color: theme.themeData?.buttonFontColor,
                    backgroundColor: theme.themeData?.buttonColor,
                    border: 'none'
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </Col>
          <Col xs="7" md="7" lg="7" style={{ margin: 'auto', width: '100px' }}>
            <span>{theme.themeData.name}</span>
          </Col>
        </Row>
      </div>
    </>
  );
};

ThemePreviewCard.propTypes = {
  theme: PropTypes.object,
  handleThemeSelection: PropTypes.func,
};

export default ThemePreviewCard;
