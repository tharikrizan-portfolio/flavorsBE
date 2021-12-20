import React from "react";
import AddNewSurvey from "../Views/SurveyManagement/AddNewSurvey";


function AddQuizHoc(props) {
  return <AddNewSurvey {...props} isQuiz={true} />;
}

export default AddQuizHoc;
