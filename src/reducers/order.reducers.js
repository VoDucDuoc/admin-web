import { orderConstants } from "../actions/constants";

const initState = {
  orders: [],
  updating: false,
  order: {},
  loadingDetail: false,
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case orderConstants.GET_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orders,
      };
      break;
    case orderConstants.UPDATE_ORDER_REQUEST:
      state = {
        ...state,
        updating: true,
      };
      break;
    case orderConstants.UPDATE_ORDER_SUCCESS:
      state = {
        ...state,
        updating: false,
      };
      break;
    case orderConstants.UPDATE_ORDER_FAILURE:
      state = {
        ...state,
        updating: false,
      };
      break;
    case orderConstants.GET_ORDER_DETAIL_REQUEST:
      state = {
        ...state,
        loadingDetail: true,
      };
      break;
    case orderConstants.GET_ORDER_DETAIL_SUCCESS:
      state = {
        ...state,
        loadingDetail: false,
        order: action.payload.order,
      };
      break;
    case orderConstants.GET_ORDER_DETAIL_FAILURE:
      state = {
        ...state,
        loadingDetail: false,
        order: {},
        error: action.payload.error,
      };
      break;
    default:
      break;
  }
  return state;
};
export default orderReducer;
