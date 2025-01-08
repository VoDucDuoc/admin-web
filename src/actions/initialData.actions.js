import {
  categoryConstants,
  initialDataConstants,
  labelConstants,
  notifyConstants,
  orderConstants,
  productConstants,
  statisticConstants,
} from "./constants";
import axios from "../helpers/axios";

export const getInitialData = (year = new Date().getFullYear()) => {
  return async (dispatch) => {
    dispatch({ type: initialDataConstants.GET_INITIALDATA_REQUEST });
    const [initRes, notifyRes, labelRes] = await Promise.all([
      axios.get(`admin/initialdata?year=${year}`),
      axios.get("product/notify"),
      axios.get(`/label`),
    ]);

    if (initRes.status === 200 && notifyRes.status === 200) {
      const { categories, products, orders, statistic } = initRes.data.data;
      const { notifies } = notifyRes.data.data;
      const labels = labelRes.data.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
        payload: { categories },
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCT_SUCCESS,
        payload: { products },
      });
      dispatch({
        type: orderConstants.GET_ORDER_SUCCESS,
        payload: { orders },
      });
      dispatch({
        type: statisticConstants.GET_STATISTIC_SUCCESS,
        payload: { statistic },
      });
      dispatch({
        type: notifyConstants.GET_NOTIFY_SUCCESS,
        payload: { notifies },
      });
      dispatch({ type: initialDataConstants.GET_INITIALDATA_SUCCESS });

      dispatch({
        type: labelConstants.GET_ALL_LABEL_SUCCESS,
        payload: { labels },
      });
    }
  };
};
export const getTotalOrderPricePerMonthByYear = (
  year = new Date().getFullYear()
) => {
  return async (dispatch) => {
    dispatch({ type: initialDataConstants.GET_INITIALDATA_REQUEST });
    const res = await axios.get(
      `/admin/totalOrderPricePerMonthByYear?year=${year}`
    );
    if (res.status === 200) {
      const { statistic } = res.data.data;
      dispatch({
        type: statisticConstants.GET_getTotalOrderPricePerMonthByYear_SUCCESS,
        payload: { statistic },
      });
      dispatch({ type: initialDataConstants.GET_INITIALDATA_SUCCESS });
    }
  };
};
