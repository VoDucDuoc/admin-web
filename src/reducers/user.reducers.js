import { userConstants } from "../actions/constants";

const initState = {
  error: null,
  message: "",
  isSignuping: false,
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      state = {
        ...state,
        isSignuping: true,
        error: null,
      };
      break;
    case userConstants.REGISTER_SUCCESS:
      state = {
        ...state,
        isSignuping: false,
        message: action.payload.message,
      };
      break;
    case userConstants.REGISTER_FAILURE:
      state = {
        ...state,
        isSignuping: false,
        error: action.payload.error,
      };
      break;
    default:
      break;
  }
  return state;
};
export default userReducer;
