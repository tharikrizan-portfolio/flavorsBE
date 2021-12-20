import swal from "sweetalert";
import { Redirect } from "react-router-dom";
import React from 'react';
import Swal from "sweetalert2";

const publishStatusAlert = (textMsg) => {
    swal({
        title: "Unsuccessful!!",
        text: textMsg,
        icon: "info",
        dangerMode: true,
    })
}

const successAlert = (textMsg) => {
   return swal({
        title: "Successful!!",
        text: textMsg,
        icon: "success",
        dangerMode: true,
    })
}

const customErrorAlert = (txtMsg) => {
   return swal({
        title: "Error!",
        text: txtMsg,
        icon: "error",
        buttons: true,
        dangerMode: true,
    })
}

const locationSuccessAlertMsg = (locationName, msg) => {
    return (Swal.fire({
        title: `<b> ${locationName}</b>`,
        icon: 'success',
        html:msg,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Great!',
        confirmButtonAriaLabel: 'Thumbs up, great!',
      }));
}
const errorAlert = (error) => {
    try {
        let errorObj = error.response.data;
    if (errorObj.code == "ERR_AUTH") {
        Swal.fire({
            title: "Session Expired!",
            text: "Session Expired, Please login again",
            icon: "error",
            buttons: true,
            dangerMode: true,
            confirmButtonColor:"white",
            confirmButtonText: `<a href="/#register">Login again</a>`
        })
    }
    else {
      return  swal({
            title: "Error!",
            text: errorObj.data,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    }

    } catch (error_) {
        return  swal({
            title: "Error!",
            text: error.message,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
    }
    
}
export default {
    publishStatusAlert,
    successAlert,
    errorAlert,
    customErrorAlert,
    locationSuccessAlertMsg
}