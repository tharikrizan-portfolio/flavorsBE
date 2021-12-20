import React from "react";
import AddNewSurvey from "../Views/SurveyManagement/AddNewSurvey";

function UpdateQuizHoc(props) {
  const isComingFromDashboard = () => {
    const urlParams = window.location.href.split('?');
    if (urlParams.length < 2) {
      return false;
    }
    return Boolean(new URLSearchParams(urlParams[1]).has('fromDashBoard'));
  };
  return <AddNewSurvey {...props} isAddSurvey={false} isQuiz={true} defaultStep={isComingFromDashboard()?0:1} />;
}

export default UpdateQuizHoc;
