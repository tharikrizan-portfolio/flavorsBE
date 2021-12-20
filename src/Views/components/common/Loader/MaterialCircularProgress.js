import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const MaterialCircularProgress = ({size = 40}) => {
  return (
    <div>
      <CircularProgress size={size} />
    </div>
  );
};

export default MaterialCircularProgress;
