import React from "react";
import { Card, Typography } from "@material-ui/core";
import ResponseNavigationButton from "../../../components/common/Buttons/navigation/ResponseNavigationButton";
import { useSelector } from "react-redux";

//--- static styles
const resubmitLink = {
  fontSize: "large",
  textDecoration: "underline",
};

const innerCardStyle = {
  borderRadius: "1rem",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "90vh",
  width: "70%",
};

const outerCardStyles = {
  display: "flex",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#F0F1F2",
};

const PreviewFinalScreen = () => {
  const onPressCloseWindow = () => {
    window.close();
  };

  const step = useSelector((state) => state.previewSurvey?.step);
  const surveyObj = useSelector((state) => state.previewSurvey?.surveyObj);

  return (
    <Typography
      className={"MuiTypography--heading preview-survey-title"}
      variant={"h4"}
      gutterBottom
    >
      <strong
        style={{
          color: surveyObj?.colorSchema?.title_font,
        }}
        dangerouslySetInnerHTML={{
          __html: surveyObj?.title,
        }}
      />
      <br />

      <p
        style={{
          color: surveyObj?.colorSchema?.subtitle_font,
          marginTop: "5%",
        }}
        dangerouslySetInnerHTML={{
          __html: surveyObj?.postSubmissionData?.description,
        }}
      />

      <br />
      {surveyObj?.postSubmissionData?.isMultipleResponse && (
        <a
          style={{
            ...resubmitLink,
            color: surveyObj?.colorSchema?.subtitle_font,
          }}
          onClick={() => window.location.reload()}
        >
          Submit another response
        </a>
      )}
    </Typography>
  );
};

export default PreviewFinalScreen;
