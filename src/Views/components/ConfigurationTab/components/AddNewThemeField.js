import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import MaterialButton from '../../common/Buttons/MaterialButton';

const AddNewThemeField = (props) => {
  const [themeTitle, setThemeTitle] = useState('');

  const hasRequestSent = useSelector((state) => state?.surveyData.themes?.fetching);
  const currentThemes = useSelector((state) =>
    state?.surveyData?.themes?.data?.map((theme) => theme?.themeData?.name),
  );

  const saveNewTheme = () => {
    if (!currentThemes.some((themeName) => themeName === themeTitle)) {
      props.createNewTheme(themeTitle);
      setThemeTitle('');
      props.setIsOpen(false);
    } else {
      toast.error('Cannot have duplicate theme names', {
        position: 'top-center',
      });
    }
  };
  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Theme Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={themeTitle}
            onChange={(e) => setThemeTitle(e.target.value)}
          />
        </Form.Group>
      </Form>
      <MaterialButton
        color="primary"
        className="global-class-name width-100"
        label="Save"
        disabled={!Boolean(themeTitle) || Boolean(hasRequestSent)}
        handleClick={saveNewTheme}
      />
    </>
  );
};

AddNewThemeField.propTypes = {
  onHide: PropTypes.any,
  createNewTheme: PropTypes.func,
};

export default AddNewThemeField;
