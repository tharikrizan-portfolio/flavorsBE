import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popup from '../../components/common/Modal/Popup';
import ImageUploader from '../../components/common/FileUploader/ImageUploader';
import ReactEasyCrop from '../../components/common/ReactEasyCrop/ReactEasyCrop';
import CloseButton from '../../components/common/Buttons/CloseButton';
import { Tab, Nav } from 'react-bootstrap';

const QuestionBackgroundPopup = ({
  isOpen,
  setIsOpen,
  question,
  updateQuestionRedux,
  questionScrBgColor,
  index,
}) => {
  const [isImageCropperVisible, setIsImageCropperVisible] = useState(false);

  const handleBackgroundImageOpacity = (e) => {
    const opacityValue = e.target.value / 100;
    const updatedQuestionData = {
      ...question,
      metadata: {
        ...question.metadata,
        questionBackgroundImageOpacity: opacityValue,
      },
    };
    updateQuestionRedux(updatedQuestionData);
  };
  const handleBackgroundImage = (url, fileName) => {
    const updatedQuestionData = {
      ...question,
      metadata: {
        ...question.metadata,
        questionBackgroundImageUrl: url,
        fileName: fileName,
      },
    };
    updateQuestionRedux(updatedQuestionData);
    setIsImageCropperVisible(true);
  };

  const removeQuestionImage = () => {
    const metadata = { ...question.metadata };
    delete metadata.questionBackgroundImageUrl;
    delete metadata.fileName;

    const updatedQuestionData = {
      ...question,
      metadata: metadata,
    };
    updateQuestionRedux(updatedQuestionData);
  };

  const handleCroppedImage = (url) => {
    const updatedQuestionData = {
      ...question,
      metadata: {
        ...question.metadata,
        questionBackgroundImageUrl: url,
      },
    };
    updateQuestionRedux(updatedQuestionData);
    setIsImageCropperVisible(false);
  };

  return (
    <Popup isOpen={isOpen} handleClose={() => setIsOpen(false)} title="Select Background Image">
      <div style={{ width: '400px' }}>
        <ImageUploader onChange_={handleBackgroundImage} />
        <br />
        <Tab.Container defaultActiveKey="desktop">
          <Tab.Content>
            <Tab.Pane eventKey="desktop">
              {isImageCropperVisible ? (
                <ReactEasyCrop
                  image={question?.metadata?.questionBackgroundImageUrl}
                  handleImageChange={handleCroppedImage}
                />
              ) : (
                <div
                  className="configuration-tab-preview-desktop"
                  style={{
                    backgroundImage: `url(${question?.metadata?.questionBackgroundImageUrl})`,
                    backgroundSize: '100% 100%',
                  }}
                >
                  <div
                    className="image-overlay"
                    style={{
                      backgroundColor: questionScrBgColor,
                      opacity: question?.metadata?.questionBackgroundImageOpacity || 0,
                    }}
                  />
                  {question?.metadata?.questionBackgroundImageUrl && (
                    <CloseButton handleClick={() => removeQuestionImage(index)} />
                  )}
                  <br />
                </div>
              )}
            </Tab.Pane>
            <Tab.Pane eventKey="mobile">
              <div
                className="configuration-tab-preview-mobile"
                style={{
                  backgroundImage: `url(${question?.metadata?.questionBackgroundImageUrl})`,
                  backgroundSize: '100% 100%',
                }}
              >
                <div
                  className="image-overlay"
                  style={{
                    backgroundColor: questionScrBgColor,
                    opacity: question?.metadata?.questionBackgroundImageOpacity || 0,
                    borderRadius: '1rem',
                  }}
                />
                <br />
              </div>
            </Tab.Pane>
          </Tab.Content>
          <div></div>
          <div style={{ textAlign: 'center' }}>
            <Nav variant="pills" className="flex-row">
              <Nav.Item>
                <Nav.Link eventKey="desktop">Desktop</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="mobile">Mobile</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Tab.Container>

        <br />
        <b>Image Overlay Opacity :</b>
        <input
          type="range"
          className="custom-range"
          min="0"
          max="100"
          defaultValue="1"
          onChange={handleBackgroundImageOpacity}
          value={question?.metadata?.questionBackgroundImageOpacity * 100 || '0'}
          id="customRange1"
        />
      </div>
    </Popup>
  );
};

QuestionBackgroundPopup.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  question: PropTypes.object,
  updateQuestionRedux: PropTypes.func,
  questionScrBgColor: PropTypes.string,
  index: PropTypes.number,
};

export default QuestionBackgroundPopup;
