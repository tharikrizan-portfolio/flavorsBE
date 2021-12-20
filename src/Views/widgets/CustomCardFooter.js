import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import React from "react";
import { CardFooter, Row } from "reactstrap";
import "../../assets/css/custom.css";
import ResponseNavigationButton from "../components/common/Buttons/navigation/ResponseNavigationButton";
function CustomCardFooter(props) {
  return (
    <div
      style={{
        marginLeft: "4%",
        marginBottom: "5%",
        position: "fixed",
        bottom: "5%",
      }}
    >
      <div
        style={{
          backgroundColor: "transparent",
          color: `${props.fColor}`,
        }}
      >
        {props.isConfirmScreen
          ? "Response Summary"
          : `Answering ${props.step} / ${props.stepCount}`}
        {!props.isMobileScreenDisplay && (
          <ResponseNavigationButton
            buttonLabel="Back"
            type="left"
            onClick={props.previous}
          />
        )}
        {!props.isConfirmScreen && !props.isMobileScreenDisplay && (
          <ResponseNavigationButton
            buttonLabel="Next"
            type="right"
            onClick={props.continue}
            iColor={props.fColor}
          />
        )}
      </div>
    </div>
  );
}

export default CustomCardFooter;
