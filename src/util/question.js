import swal from "sweetalert";
import axios from "axios";
import commonConstants from './common.constants'
import notificationAlertUtil from './notificationManager'

const deleteQuestion = async (surveyId, id) => {
    return await swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover the data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then(async (willDelete) => {
          if (willDelete) {
            return await axios.delete(`${commonConstants.BCONIC_SURVEY_URI}${commonConstants.ADMIN_API}${commonConstants.SURVEY_END_POINT}/${surveyId}/${commonConstants.QUESTION_END_POINT}/${id}`,
              {
                headers: commonConstants.HEADER_INFO
              }).then(res => {
                return notificationAlertUtil.successAlert("Question has been deleted!")
              }).catch(error => {
                return notificationAlertUtil.errorAlert(error)
              });
          }
        });
}

export default {
    deleteQuestion
}