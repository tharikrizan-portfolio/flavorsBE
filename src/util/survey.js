// import swal from "sweetalert";
import axios from "axios";
import commonConstants from './common.constants'

const updateSurvey = (newSurveyObj) => {
    axios.patch(`${commonConstants.BCONIC_SURVEY_URI}${commonConstants.ADMIN_API}${commonConstants.SURVEY_END_POINT}/${newSurveyObj.surveyId}`,
        newSurveyObj,
        {
            headers: commonConstants.HEADER_INFO
        }).then(res => {
            // swal({
            //     title: "Success!",
            //     text: "Survey Updated Added!",
            //     type: "success"
            // }).then(function () {
            //     window.location = "#/survey-management";
            // });
        }).catch(error => {
            // swal({
            //     title: "Error!",
            //     text: "Cannot create a new survey due to " + error.message,
            //     icon: "warning",
            //     buttons: true,
            //     dangerMode: true,
            // })
        });
}
const deleteSurvey = (id, isPublished, props) => {
    // if (isPublished) {
        // return swal({
        //     title: "Unsuccessful!!",
        //     text: "Change the publish status to delete the survey",
        //     icon: "warning",
        //     buttons: true,
        //     dangerMode: true,
        // })
    // }

    // swal({
    //     title: "Are you sure?",
    //     text: "Once deleted, you will not be able to recover the data!",
    //     icon: "warning",
    //     buttons: true,
    //     dangerMode: true,
    // })
    //     .then((willDelete) => {
    //         if (willDelete) {
    //             axios.delete(`${commonConstants.BCONIC_SURVEY_URI}${commonConstants.ADMIN_API}${commonConstants.SURVEY_END_POINT}/${id}`,
    //                 {
    //                     headers: commonConstants.HEADER_INFO
    //                 }).then(res => {
    //                     swal("Survey has been deleted!", {
    //                         icon: "success",
    //                     }).then((deletedSuccess) => {
    //                         props.history.push('/survey-management/')
    //                     });
    //                 }).catch(error => {
    //                     swal({
    //                         title: "Error!",
    //                         text: "Cannot delete the survey due to " + error.message,
    //                         icon: "warning",
    //                         buttons: true,
    //                         dangerMode: true,
    //                     })
    //                 });
    //         }
    //     });
}

export default {
    deleteSurvey,
    updateSurvey
}
