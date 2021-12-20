import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_ERROR,
  LOGIN_FAILURE,
  SIGNUP_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  USER_INFO_RECEIVED
} from "./types";
import { toast } from "react-toastify";
import {
  USER_ENDPOINT,
  AUTH_ENDPOINT,
  BCONIC_HEADER_INFO,
  API_ENDPOINT,
  ROUTE_PROFILE_INFO,
  ADMIN_ENDPOINT,
  BCONIC_SURVEY_URI,
} from "../store/constant.js";
import axios from "axios";
import { history } from "../index";

export const userLoginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const userLoginFailed = (data) => {
  return {
    type: LOGIN_FAILURE,
    payload: data,
  };
};

export const userLoginError = (data) => {
  return {
    type: LOGIN_ERROR,
    payload: data,
  };
};

export const userLogin = (token, state) => {
  return (dispatch) => {
    if (
      token == null ||
      token == undefined ||
      state == null ||
      state == undefined
    ) {
      dispatch(userLoginFailed("Login failed"));
      toast.error("Login failed", {
        position: "top-center",
      });
      return;
    } else {
      const headers = {
        "x-bconic-account-token": `${token}`,
        "Content-Type": "application/json",
      };
      let data = {
        token: token,
        headers: headers,
      };
      dispatch(userLoginFailed(""));
      dispatch(userLoginSuccess(data));
      toast.success("Logged successfully");
      return;
    }
  };
};

//LOGOUT-------------------------------------
export const userLogoutSuccess = (data) => {
  return {
    type: LOGOUT_SUCCESS,
    payload: data,
  };
};

export const userLogout = () => {
  let data = {
    token: null,
    headers: null,
  };
  return (dispatch) => {
    dispatch(userLogoutSuccess(data));
    localStorage.removeItem("state");
    window.location = "/auth/signup/";
  };
};

//SIGN UP-----------------------------
export const userSignUpSuccess = (data) => {
  return {
    type: SIGNUP_SUCCESS,
    payload: data,
  };
};

export const userSignUpFailed = (data) => {
  return {
    type: SIGNUP_FAILURE,
    payload: data,
  };
};

export const userSignUpError = (data) => {
  return {
    type: SIGNUP_ERROR,
    payload: data,
  };
};

export const userSignUp = (user) => {
  const data = {
    firstName: user.firstName,
    lastName: user.lastName,
    // nickname: user.nickname,
    // phoneNumber: user.phoneNumber,
    email: user.email,
    password: user.password,
  };
  return (dispatch) => {
    return axios
      .post(`${BCONIC_SURVEY_URI}${AUTH_ENDPOINT}signup`, data, {
        headers: BCONIC_HEADER_INFO,
      })
      .then((response) => {
        const headers = {
          "x-bconic-account-token": `${response.data.token}`,
          "Content-Type": "application/json",
        };
        // data.headers = headers;
        // data.token = response.data.token;
        // dispatch(userSignUpError(""));
        // dispatch(userSignUpSuccess(data));
        toast.success("Account Created Successfully");
        history.push("/");
      })
      .catch((error) => {
        dispatch(userSignUpError(error.response.data.data));
        toast.error();
        toast.error(error.response.data.message, {
          position: "top-right",
        });
      });
  };
};


/**
 * Store the new data in the store
 * @param {{ firstName: String, lastName: String }} data data to be stored in the redux store
 * @returns {{ type: String, payload: Object }}
 */
export const newUserInfoReceived = (data) => {
  return {
    type: USER_INFO_RECEIVED,
    payload: data,
  };
};

/**
 * Get User Information
 * @param {Object} header header object with auth tokens
 */
export const getUserInformation = (header) => {
    return (dispatch) => {
        return axios
            .get(`${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${ROUTE_PROFILE_INFO}/`, {
                headers: header,
            })
            .then((response) => {
                dispatch(
                  newUserInfoReceived({
                    firstName: response.data.data.firstName,
                    lastName: response.data.data.lastName,
                  })
                );
            })
            .catch((error) => {
                return;
            });
    };
};