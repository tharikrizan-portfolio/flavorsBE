import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  makeStyles,
  Slide,
} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  dialog: {
    position: 'absolute',
    top: '10%',
    minWidth: 350,
    maxHeight: '70%',
  },
});

export default function AlertDialog({
  open,
  handleClose,
  handleOk,
  okText = 'Yes',
  cancelText = 'No',
  title,
  description,
  children,
  disableSave = false,
}) {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      classes={{
        paper: classes.dialog,
      }}
      maxWidth="lg"
      onClose={() => handleClose()}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        {description && (
          <DialogContentText id="alert-dialog-slide-description">{description}</DialogContentText>
        )}
        {children}
      </DialogContent>
      <Divider />
      <DialogActions className="mr-3 mb-2">
        <Button variant="contained" size="medium" onClick={() => handleClose()} color="secondary">
          {cancelText}
        </Button>
        <Button
          variant="contained"
          size="medium"
          onClick={(e) => handleOk(e) && handleClose()}
          disabled={disableSave}
          color="primary"
        >
          {okText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleOk: PropTypes.func,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};
