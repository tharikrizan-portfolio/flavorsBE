import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  },
});

export default function SimpleDialog({
  open,
  handleClose,
  cancelText = 'Close',
  title,
  description,
  children,
  isActionsButtonsVisible = true,
  isCenter = false,
}) {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      classes={{
        paper: isCenter ? { ...classes.dialog, top: '50%' } : classes.dialog,
      }}
      onClose={handleClose}
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

      {isActionsButtonsVisible && (
        <DialogActions>
          <Button variant="contained" size="medium" onClick={handleClose} color="secondary">
            {cancelText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  cancelText: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};
