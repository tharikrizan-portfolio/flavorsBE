import React from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Tab, Nav } from 'react-bootstrap';
import TextPreviewComponent from '../common/TextDtPreviewConverter/TextPreviewComponent';
import '../../../assets/css/custom.css';
import CloseButton from '../common/Buttons/CloseButton';

const ConfigurationPreview = ({
  titleFontColor,
  questionScrBgColor,
  descriptionFontColor,
  buttonColor,
  buttonFontColor,
  resetColors,
  surveyBackgroundImageUrl,
  surveyBackgroundImageOpacity,
  setLocalImage,
}) => {
  return (
    <>
      <h5>Preview</h5>
      <hr />
      <Tab.Container defaultActiveKey="desktop">
        <Tab.Content
          style={{
            padding: '0px',
          }}
        >
          <Tab.Pane eventKey="desktop">
            <div
              className="configuration-tab-preview-desktop"
              style={{
                backgroundImage: `url(${surveyBackgroundImageUrl})`,
                backgroundSize: '100% 100%',
              }}
            >
              <div
                className="image-overlay"
                style={{
                  backgroundColor: questionScrBgColor,
                  opacity: surveyBackgroundImageOpacity || 0,
                }}
              />

              {surveyBackgroundImageUrl && (
                <CloseButton handleClick={() => setLocalImage(null, null, false)} />
              )}
              <br />
              <span
                className={'configuration-tab-preview-desktop-title'}
                style={{
                  color: titleFontColor,
                }}
              >
                <b>Title</b>
              </span>

              <span
                className={'configuration-tab-preview-desktop-description'}
                style={{
                  color: descriptionFontColor,
                }}
              >
                <b>Description</b>
              </span>

              <br />

              <div className="initial-screen-continue-button-div">
                <button
                  class="ui button next-previous-button"
                  style={{
                    color: buttonFontColor,
                    backgroundColor: buttonColor,
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="mobile">
            <div
              className="configuration-tab-preview-mobile"
              style={{
                backgroundImage: `url(${surveyBackgroundImageUrl})`,
                backgroundSize: '100% 100%',
              }}
            >
              <div
                className="image-overlay"
                style={{
                  backgroundColor: questionScrBgColor,
                  opacity: surveyBackgroundImageOpacity,
                  borderRadius: '1rem',
                }}
              />
              <span
                className={'configuration-tab-preview-mobile-title'}
                style={{
                  color: titleFontColor,
                }}
              >
                <b>Title</b>
              </span>
              <span
                className={'configuration-tab-preview-mobile-description'}
                style={{
                  color: descriptionFontColor,
                }}
              >
                <b>Description</b>
              </span>
              <br />
              <div className="initial-screen-continue-button-div">
                <button
                  class="ui button next-previous-button"
                  style={{
                    color: buttonFontColor,
                    backgroundColor: buttonColor,
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
          </Tab.Pane>
        </Tab.Content>
        <Col sm={12}>
          <Nav variant="pills" className="flex-space-even">
            <Nav.Item>
              <Nav.Link eventKey="desktop">Desktop</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="mobile">Mobile</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        <Button className="width-100" variant="light" onClick={resetColors}>
          Reset Colors
        </Button>
      </Tab.Container>
    </>
  );
};

ConfigurationPreview.propTypes = {
  titleFontColor: PropTypes.string,
  questionScrBgColor: PropTypes.string,
  titleFontColor: PropTypes.string,
  titleHtml: PropTypes.string,
  descriptionFontColor: PropTypes.string,
  descriptionHtml: PropTypes.string,
  buttonColor: PropTypes.string,
  buttonFontColor: PropTypes.string,
  resetColors: PropTypes.func,
};

export default ConfigurationPreview;
