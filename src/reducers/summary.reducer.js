import {
  SUMMARY_SUCCESS,
  SUMMARY_FAILURE
} from "../actions/types";

const userInitialState = {
  summaryObj: {}
};

const summaryReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case SUMMARY_SUCCESS:
      return { ...state, summaryObj: action.payload };
    case SUMMARY_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default summaryReducer;