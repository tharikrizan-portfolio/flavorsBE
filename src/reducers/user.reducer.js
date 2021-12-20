import {
    LOGIN_ERROR,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    SIGNUP_ERROR,
    SIGNUP_FAILURE,
    SIGNUP_SUCCESS,
    USER_INFO_RECEIVED
  } from "../actions/types";
  
  const userInitialState = {
    user: [],
    profile: [],
    error: "",
  };
  
  const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
      case LOGOUT_SUCCESS:
        return { ...state, user: action.payload };
      case LOGIN_SUCCESS:
        return { ...state, user: action.payload };
      case LOGIN_FAILURE:
        return { ...state, error: action.payload };
      case LOGIN_ERROR:
        return { ...state, error: action.payload };
      case SIGNUP_SUCCESS:
        return { ...state, user: action.payload };
      case SIGNUP_FAILURE:
        return { ...state, error: action.payload };
      case SIGNUP_ERROR:
        return { ...state, error: action.payload };
      case LOGOUT_SUCCESS:
        return { ...state, user: [] };
      case USER_INFO_RECEIVED:
        return {
          ...state,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
       };
      default:
        return state;
    }
  };
  
  export default userReducer;