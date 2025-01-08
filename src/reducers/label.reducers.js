import { labelConstants } from "../actions/constants";

const initState = {
  labels: [],
  updating: false,
  label: null,
  loadingDetail: false,
  submitting: false,
  deleting: false,
};

const labelReducer = (state = initState, action) => {
  switch (action.type) {
    case labelConstants.GET_ALL_LABEL_SUCCESS:
      state = {
        ...state,
        labels: action.payload.labels,
      };
      break;
    case labelConstants.UPDATE_LABEL_REQUEST:
      state = {
        ...state,
        updating: true,
      };
      break;
    case labelConstants.UPDATE_LABEL_SUCCESS:
      state = {
        ...state,
        label: action.payload.label,
        updating: false,
      };
      break;
    case labelConstants.UPDATE_LABEL_FAILURE:
      state = {
        ...state,
        labels: [],
        updating: false,
      };
      break;
    case labelConstants.GET_LABEL_DETAIL_REQUEST:
      state = {
        ...state,
        loadingDetail: true,
      };
      break;
    case labelConstants.GET_LABEL_DETAIL_SUCCESS:
      state = {
        ...state,
        loadingDetail: false,
        label: action.payload.label,
      };
      break;
    case labelConstants.GET_LABEL_DETAIL_FAILURE:
      state = {
        ...state,
        loadingDetail: false,
        label: null,
        error: action.payload.error,
      };
      break;
    case labelConstants.CREATE_LABEL_REQUEST:
      state = {
        ...state,
        submitting: true,
      };
      break;
    case labelConstants.CREATE_LABEL_SUCCESS:
      state = {
        ...state,
        submitting: false,
      };
      break;
    case labelConstants.CREATE_LABEL_FAILURE:
      state = {
        ...state,
        submitting: false,
      };
      break;
    case labelConstants.DELETE_LABEL_REQUEST:
      state = {
        ...state,
        deleting: true,
      };
      break;
    case labelConstants.DELETE_LABEL_SUCCESS:
      state = {
        ...state,
        deleting: false,
      };
      break;
    case labelConstants.DELETE_LABEL_FAILURE:
      state = {
        ...state,
        deleting: false,
      };
      break;
    default:
      break;
  }
  return state;
};
export default labelReducer;
