import React, { useEffect } from 'react';
import Editor from 'react-medium-editor';
import PropTypes from 'prop-types';

const CUSTOM_P_TAG = {
  name: 'quote',
  action: 'append-p',
  aria: 'header type 1',
  tagNames: ['quote'],
  contentDefault: '<p>p</p>',
  classList: ['custom-class-h1'],
};

const EDITOR_BUTTON_LIST = ['bold', 'italic', 'underline', 'h1', 'h2', 'h3', CUSTOM_P_TAG];

const CustomEditor = ({
  content,
  onChange,
  textAlign = 'left',
  placeholder,
  fontColor,
  preTag,
}) => {
  const handleOnChange = (text) => {
    if (text.length === 1 && preTag) onChange(`<${preTag}>${text}</${preTag}>`);
    else onChange(text);
  };

  return (
    <div style={{ textAlign: textAlign }}>
      <Editor
        tag={'p'}
        default={`<${preTag}>`}
        text={content}
        style={{ color: fontColor || 'black' }}
        onChange={handleOnChange}
        options={{
          toolbar: {
            buttons: EDITOR_BUTTON_LIST,
          },
          placeholder: { text: placeholder || 'Your Text Here...' },
        }}
      />
    </div>
  );
};

CustomEditor.propTypes = {
  // Main text. This string sould be a htlm element. EG: <h1>some text<h1>
  content: PropTypes.string,
  // Handle change function. Retruns text with html tags EG: <h1>some text<h1>
  onChange: PropTypes.func,
  // CSS property
  textAlign: PropTypes.string,
  // Place holder to show when there is not content
  placeholder: PropTypes.string,
  // CSS property to change the font color
  fontColor: PropTypes.string,
  // Default html tag. EG: 'h1'
  preTag: PropTypes.string,
};

export default CustomEditor;
