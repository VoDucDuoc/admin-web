import { notifyConstants } from "../actions/constants";

const initState = {
  isGettingNotifies: false,
  notifies: null,
  total: 0,
};
const notifyReducer = (state = initState, action) => {
  switch (action.type) {
    case notifyConstants.GET_NOTIFY_REQUEST:
      state = {
        ...state,
        isGettingNotifies: true,
      };
      break;
    case notifyConstants.GET_NOTIFY_SUCCESS:
      state = {
        ...state,
        notifies: action.payload.notifies,
        isGettingNotifies: false,
      };
      break;
    case notifyConstants.GET_NOTIFY_FAILURE:
      state = {
        ...state,
        notifies: null,
        isGettingNotifies: false,
      };
      break;
    case notifyConstants.PUSH_NOTIFY:
      state = {
        ...state,
        notifies: [action.payload.notify, ...state.notifies],
      };
      break;
    case notifyConstants.READ_NOTIFY:
      state = {
        ...state,
        notifies: state.notifies.filter((n) => n._id !== action.payload.id),
      };
      break;
    default:
      state = { ...state };
  }
  return state;
};
export default notifyReducer;
