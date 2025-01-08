import axios from "../helpers/axios";
import { orderConstants } from "./constants";
import { getInitialData } from ".";

export const updateOrder = (updatedProcess) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_ORDER_REQUEST });
    const res = await axios.put("order/update", updatedProcess);
    console.log(res);
    if (res.status === 201) {
      dispatch({
        type: orderConstants.UPDATE_ORDER_SUCCESS,
      });
      dispatch(getInitialData());
    } else {
      dispatch({
        type: orderConstants.UPDATE_ORDER_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
export const getOrderDetail = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.GET_ORDER_DETAIL_REQUEST });
      const res = await axios.get(`/order/${id}`);
      if (res.status === 200) {
        const order = res.data.data;
        dispatch({
          type: orderConstants.GET_ORDER_DETAIL_SUCCESS,
          payload: { order },
        });
      }
    } catch (error) {
      dispatch({
        type: orderConstants.GET_ORDER_DETAIL_FAILURE,
        payload: { error },
      });
    }
  };
};
