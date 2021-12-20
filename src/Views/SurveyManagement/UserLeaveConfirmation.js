import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import Aux from '../../hoc/_Aux';
import AlertDialog from '../components/common/AlertDialog/AlertDialog';
import theme from '../../util/theme';

const UserLeaveConfirmation = (message, callback, open, setOpen) => {
  const container = document.createElement('div');
  container.setAttribute('custom-confirm-view', '');

  const handleConfirm = (callbackState) => {
    ReactDOM.unmountComponentAtNode(container);
    callback(callbackState);
    setOpen(false);
  };

  const handleCancel = (callbackState) => {
    ReactDOM.unmountComponentAtNode(container);
    callback();
    setOpen(false);
  };

  document.body.appendChild(container);
  const { content } = JSON.parse(message);
  ReactDOM.render(
    <Aux>
      <ThemeProvider theme={theme}>
        <AlertDialog
          open={open}
          handleClose={handleCancel}
          handleOk={handleConfirm}
          title="Confirm Navigation"
          description={content}
        />
      </ThemeProvider>
    </Aux>,
    container,
  );
};

export default UserLeaveConfirmation;
