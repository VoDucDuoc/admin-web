import { initialDataConstants } from "../actions/constants";

const initState = {
  isIniting: false,
};

const initReducer = (state = initState, action) => {
  switch (action.type) {
    case initialDataConstants.GET_INITIALDATA_REQUEST:
      state = {
        ...state,
        isIniting: true,
      };
      break;
    case initialDataConstants.GET_INITIALDATA_SUCCESS:
      state = {
        ...state,
        isIniting: false,
      };
      break;
    default:
      break;
  }
  return state;
};
export default initReducer;
