import moment from "moment";
import enumUtil from "../util/enumerations";

export const filterSurveyResponse = (surveys, filterOptions) => {
  return surveys
    .filter((survey) =>
      filterOptions.surveyTitle
        ? survey.title
            .toLowerCase()
            .includes(filterOptions.surveyTitle.toLowerCase())
        : true
    )
    .filter((survey) =>
      filterOptions.filterDate !== "none"
        ? moment(survey[filterOptions.filterDate]).isSameOrAfter(
            moment(filterOptions.startDate)
          )
        : true
    )
    .filter((survey) =>
      filterOptions.filterDate !== "none"
        ? moment(survey[filterOptions.filterDate]).isSameOrBefore(
            moment(filterOptions.endDate)
          )
        : true
    )
    .filter((survey) =>
      filterOptions.published === enumUtil.surveyPublishStatus.ALL
        ? true
        : filterOptions.published === enumUtil.surveyPublishStatus.PUBLISHED
        ? survey.isPublished
        : !survey.isPublished
    );
};

export const filterSurveyResponseUsingTitle = (surveys, title) => {
  return surveys.filter((survey) =>
    title ? survey.title.toLowerCase().includes(title.toLowerCase()) : true
  );
};
