import React, { useEffect, useState } from "react";

import { Card, Typography } from "@material-ui/core";

import "../../../../assets/css/custom.css";

import { useSelector, useDispatch } from "react-redux";
import { setStep } from "../../../../actions/preview.actions";
import "../buttonStyles.css";
import MaterialCircularProgress from "../../../components/common/Loader/MaterialCircularProgress";
import { MOBILE_WIDTH } from "../previewConstants";

const InitialScreen = () => {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.previewSurvey?.step);
  const surveyObj = useSelector((state) => state.previewSurvey?.surveyObj);
  const [isMobile, setIsMobile] = useState(false);

  const nextScreen = (e) => {
    e.preventDefault();
    dispatch(setStep(step + 1));
  };

  const onWindowSizeChanged = () => {
    setIsMobile(window.innerWidth < MOBILE_WIDTH);
  };

  useEffect(() => {
    onWindowSizeChanged();
    window.addEventListener("resize", onWindowSizeChanged);
    return () => {
      window.removeEventListener("resize", onWindowSizeChanged);
    };
  }, []);

  return (
    <>
      <Typography
        className={"MuiTypography--heading preview-survey-title"}
        gutterBottom
      >
        <span
          style={{
            color: surveyObj?.colorSchema?.title_font,
            fontFamily: "sans-serif",
          }}
          dangerouslySetInnerHTML={{
            __html: surveyObj?.title,
          }}
        />
        <br />

        <span
          style={{
            color: surveyObj?.colorSchema?.subtitle_font,
            fontFamily: "sans-serif",
          }}
          dangerouslySetInnerHTML={{
            __html: surveyObj?.purpose,
          }}
        />

        <br />
      </Typography>
      <br />
      <br />
      <div className="initial-screen-continue-button-div">
        {surveyObj?.title ? (
          <button
            onClick={nextScreen}
            className={`response-navigation-button center`}
            style={{
              color: surveyObj?.colorSchema?.button_font,
              backgroundColor: surveyObj?.colorSchema?.button,
            }}
          >
            Continue
          </button>
        ) : (
          <MaterialCircularProgress size={100} />
        )}
      </div>
    </>
  );
};

export default InitialScreen;
