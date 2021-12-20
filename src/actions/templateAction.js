import axios from 'axios';
import { toast } from 'react-toastify';

import { ADMIN_ENDPOINT, BCONIC_SURVEY_URI, TEMPLATE_END_POINT } from '../store/constant';
import { FETCH_TEMPLATE_LIST } from './types';

export const getTemplates = () => {
  return {
    type: FETCH_TEMPLATE_LIST,
    payload: {
      fetching: true,
      error: '',
      data: [],
    },
  };
};
export const getTemplatesSuccess = (data) => {
  return {
    type: FETCH_TEMPLATE_LIST,
    payload: {
      fetching: true,
      error: '',
      data: data,
    },
  };
};
export const getTemplatesError = (error) => {
  return {
    type: FETCH_TEMPLATE_LIST,
    payload: {
      fetching: true,
      error: error,
      data: [],
    },
  };
};

export const fetchTemplates = (header) => {
  return (dispatch) => {
    dispatch(getTemplates());
    return axios
      .get(`${BCONIC_SURVEY_URI}${ADMIN_ENDPOINT}${TEMPLATE_END_POINT}/`, {
        headers: header,
      })
      .then((response) => {
        dispatch(getTemplatesSuccess(response.data.data || []));
      })
      .catch((error) => {
        const message = 'Error in fetching templates';
        dispatch(getTemplatesError(message));
        return toast.error(message, {
          position: 'top-right',
        });
      });
  };
};
