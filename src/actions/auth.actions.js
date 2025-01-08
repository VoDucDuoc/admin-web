import axios from "../helpers/axios";
import { authConstants } from "./constants";
import jwt_decode from "jwt-decode";

export const login = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    try {
      const res = await axios.post("/admin/signin", { ...data });
      const { token } = res.data;
      const user = jwt_decode(token);
      console.log({ user1: user });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { token, user },
      });
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: error.response.data.error || error.response.data.message,
        },
      });
    }
  };
};
export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    // const user = JSON.parse(localStorage.getItem("user"));
    if (token) {
      const user = jwt_decode(token);
      console.log({ user2: user });
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: { token, user },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_SUCCESS });
    axios.defaults.headers.common["Authorization"] = "";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
};
