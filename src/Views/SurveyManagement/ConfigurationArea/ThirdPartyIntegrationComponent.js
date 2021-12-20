/* global gapi */
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  googleSheetIsIntegratedAction,
  revokeLoginCredentials,
  sendGoogleSheetIntegrationRequest,
  submitDetailsAction,
} from '../../../actions/survey.actions';
import ImgSheets from '../../components/ShareSurvey/ThirdPartyImages/google-sheets.png';
import { Button, DialogActions } from '@material-ui/core';
import './ConfigurationAreaDesign.css';
import SimpleDialog from '../../components/common/AlertDialog/SimpleDialog';

const ThirdPartyIntegrationComponents = ({ isAddSurvey }) => {
  const surveyId = useSelector((state) => state.updateSurveyObj.survey.surveyId);

  const headers = useSelector((state) => state.userData.user.headers);

  const [isOpen, setIsOpen] = useState(false);
  const [sheetTitle, setSheetTitle] = useState('');
  const [sheetIntegrated, setSheetIntegrated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isInvalid = () => {
    if (sheetTitle.length < 2) {
      setErrorMessage('Sheet Title should be greater than 2');
      return true;
    }
    setErrorMessage('');
    return false;
  };

  const isRedirected = () => {
    const urlParams = window.location.href.split('?');
    if (urlParams.length < 2) {
      return false;
    }
    return Boolean(new URLSearchParams(urlParams[1]).has('isRedirected'));
  };

  const openModal = () => {
    if (!isAddSurvey) {
      setIsOpen(true);
    }
  };

  const closeModalAccount = () => {
    setIsOpen(false);
  };

  const GoogleSheetIsIntegrated = () => {
    googleSheetIsIntegratedAction(surveyId)
      .then((response) => {
        setSheetIntegrated(response.data.data.is_integrated);
        if (response.data.data.sheet_title) {
          setSheetTitle(response.data.data.sheet_title);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message, {
          position: 'top-right',
        });
      });
  };

  const revokeCredentials = () => {
    revokeLoginCredentials(surveyId, headers)
      .then((response) => {
        setSheetIntegrated(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: 'top-right',
        });
      });
  };

  const handleAuthClick = (state) => {
    sendGoogleSheetIntegrationRequest(surveyId, headers);
    GoogleSheetIsIntegrated();
  };

  const handleSheetTitleChange = (e) => {
    setSheetTitle(e.target.value);
  };

  useEffect(() => {
    GoogleSheetIsIntegrated();
    setIsOpen(isRedirected());
  }, []);

  useEffect(() => {
    isInvalid();
  }, [sheetTitle]);

  const submitDetails = () => {
    submitDetailsAction(sheetTitle, surveyId, headers);
  };

  const getModel = () => {
    return (
      <SimpleDialog
        open={isOpen}
        handleClose={closeModalAccount}
        title="Enter Connection Settings"
        description=""
        isActionsButtonsVisible={false}
        isCenter={true}
      >
        <p>
          <b>Add New Google Account</b>
        </p>
        <Button
          onClick={sheetIntegrated ? revokeCredentials : handleAuthClick}
          variant="contained"
          color="secondary"
        >
          {sheetIntegrated ? 'Disconnect Account' : 'Add Account'}
        </Button>

        {sheetIntegrated && (
          <div className="thrid-party-model-btn-margin">
            <p>
              <b>File Name in Google Sheet</b>
            </p>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              value={sheetTitle}
              onChange={handleSheetTitleChange}
              disabled={!sheetIntegrated}
              isInvalid={sheetIntegrated && errorMessage.length}
            />
            <Form.Control.Feedback type="invalid">{errorMessage}.</Form.Control.Feedback>
          </div>
        )}
        <DialogActions className="thrid-party-action-w">
          <Button variant="outlined" color="primary" onClick={closeModalAccount}>
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={submitDetails}
            disabled={!sheetIntegrated && sheetTitle.trim().length > 1}
          >
            Synchronize
          </Button>
        </DialogActions>
      </SimpleDialog>
    );
  };

  return (
    <div className="rounded-card">
      {getModel()}
      <h4>Third Party Integration Tools</h4>
      <div className="third-party-google-img">
        <img src={ImgSheets} className="google-integration-img" />
        <div className="thrid-party-mrl-20">
          <p>Connect your response details to google sheet</p>
          <Tooltip title="Save responses to a Google spread sheet">
            <Button
              variant="contained"
              color="secondary"
              disabled={isAddSurvey}
              onClick={openModal}
            >
              SAVE TO SHEETS
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

ThirdPartyIntegrationComponents.propTypes = {
  cardColor: PropTypes.any,
};

export default ThirdPartyIntegrationComponents;
