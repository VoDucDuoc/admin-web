import { getInitialData } from ".";
import axios from "../helpers/axios";
import { categoryConstants } from "./constants";
export const getCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_CATEGORY_REQUEST });

    const res = await axios.get(`category/${id}`);
    if (res.status === 200) {
      const category = res.data.data;
      dispatch({
        type: categoryConstants.GET_CATEGORY_SUCCESS,
        payload: category,
      });
    } else {
      dispatch({
        type: categoryConstants.GET_CATEGORY_FAILURE,
        payload: res.data.error,
      });
    }
  };
};
export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });

    const res = await axios.get("category/");
    if (res.status === 200) {
      const categories = res.data.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
        payload: { categories },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
        payload: res.data.error,
      });
    }
  };
};
export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_CATEGORY_REQUEST });
    try {
      const res = await axios.post("category/create", form);
      const category = res.data.data;
      dispatch({
        type: categoryConstants.ADD_CATEGORY_SUCCESS,
        payload: { category },
      });
      dispatch(getInitialData());
    } catch (error) {
      dispatch({
        type: categoryConstants.ADD_CATEGORY_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};
export const editCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST });
    const res = await axios.put(`category/${form.id}`, form);
    if (res.status === 200) {
      dispatch({ type: categoryConstants.UPDATE_CATEGORY_SUCCESS });
      dispatch(getInitialData());
    } else {
      dispatch({
        type: categoryConstants.UPDATE_CATEGORY_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
export const deleteCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST });
    try {
      const res = await axios.delete(`category/${id}`);
      dispatch({ type: categoryConstants.DELETE_CATEGORY_SUCCESS });
      dispatch(getInitialData());
    } catch (error) {
      dispatch({
        type: categoryConstants.DELETE_CATEGORY_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};
export const enableCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ENABLE_CATEGORY_REQUEST });
    try {
      await axios.put(`category/enable/${id}`);
      dispatch({
        type: categoryConstants.ENABLE_CATEGORY_SUCCESS,
        payload: { id },
      });
      dispatch(getInitialData());
    } catch (error) {
      dispatch({
        type: categoryConstants.ENABLE_CATEGORY_FAILURE,
        payload: { error: error.response.data.error },
      });
    }
  };
};
