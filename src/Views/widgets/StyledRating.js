import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  iconFilled: {
    color: (props) => props.color || theme.palette.primary.main,
  },
  iconHover: {
    color: (props) => props.titleColor,
  },
  iconEmpty: {
    color: (props) => props.color,
  },
}));

const StyledRating = (props) => {
  const classes = useStyles(props);
  return <Rating classes={classes} {...props} />;
};

StyledRating.propTypes = {};

export default StyledRating;
