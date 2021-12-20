import { FETCH_TEMPLATE_LIST } from '../actions/types';

const initialState = {
  templateList: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEMPLATE_LIST:
      return {
        ...state,
        templateList: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
