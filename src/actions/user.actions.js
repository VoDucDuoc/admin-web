import axios from "../helpers/axios";
import { userConstants } from "./constants";

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.REGISTER_REQUEST });
    try {
      if (user.role === "admin") {
        const res = await axios.post("/admin/signup", { ...user });
        dispatch({
          type: userConstants.REGISTER_SUCCESS,
          payload: { message: user.email + " is registered completely!" },
        });
      }
      if (user.role === "staff") {
        const res = await axios.post("/admin/staff-signup", { ...user });
        dispatch({
          type: userConstants.REGISTER_SUCCESS,
          payload: { message: user.email + " is registered completely!" },
        });
      }
    } catch (error) {
      dispatch({
        type: userConstants.REGISTER_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};
