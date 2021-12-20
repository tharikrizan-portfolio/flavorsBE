import { CardContent, Typography } from "@material-ui/core";
import React from "react";
import "../../assets/css/custom.css";
function CustomCard(props) {
  const { length, responseVal, colorFont } = props;
  return (
    <CardContent className="custom-card">
      <Typography
        style={{ color: colorFont }}
        className={"MuiTypography--subheading"}
        variant={"h6"}
      >
        {length > 0 ? responseVal : " "}
      </Typography>
    </CardContent>
  );
}

export default CustomCard;
