import axios from "../helpers/axios";
import { notifyConstants } from "./constants";

export const readNotify = (id) => {
  return async (dispatch) => {
    const res = await axios.patch(`/products/read-notify/${id}`);
    dispatch({
      type: notifyConstants.READ_NOTIFY,
      payload: { id },
    });
  };
};
