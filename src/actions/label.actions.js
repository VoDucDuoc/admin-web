import axios from "../helpers/axios";
import { labelConstants } from "./constants";

export const createLabel = (label) => {
  return async (dispatch) => {
    dispatch({ type: labelConstants.CREATE_LABEL_REQUEST });
    const res = await axios.post("label/", label);
    if (res.status === 201) {
      dispatch({
        type: labelConstants.CREATE_LABEL_SUCCESS,
        payload: { order: res.data.label },
      });
    } else {
      dispatch({
        type: labelConstants.CREATE_LABEL_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const updateLabel = (data) => {
  const { _id, ...label } = data;
  return async (dispatch) => {
    dispatch({ type: labelConstants.UPDATE_LABEL_REQUEST });
    const res = await axios.put(`label/${_id}`, label);
    if (res.status === 200) {
      dispatch({
        type: labelConstants.UPDATE_LABEL_SUCCESS,
        payload: { order: res.data.label },
      });
    } else {
      dispatch({
        type: labelConstants.UPDATE_LABEL_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getLabelById = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: labelConstants.GET_LABEL_DETAIL_REQUEST });
      const res = await axios.get(`/label/${id}`);
      if (res.status === 200) {
        const label = res.data.data;
        dispatch({
          type: labelConstants.GET_LABEL_DETAIL_SUCCESS,
          payload: { label },
        });
      }
    } catch (error) {
      dispatch({
        type: labelConstants.GET_LABEL_DETAIL_FAILURE,
        payload: { error },
      });
    }
  };
};

export const getLabels = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: labelConstants.GET_ALL_LABEL_REQUEST });
      const res = await axios.get(`/label`);
      if (res.status === 200) {
        const labels = res.data.data;
        dispatch({
          type: labelConstants.GET_ALL_LABEL_SUCCESS,
          payload: { labels },
        });
      }
    } catch (error) {
      dispatch({
        type: labelConstants.GET_ALL_LABEL_FAILURE,
        payload: { error },
      });
    }
  };
};

export const deleteLabel = (id) => {
  return async (dispatch) => {
    dispatch({ type: labelConstants.DELETE_LABEL_REQUEST });
    const res = await axios.delete(`label/${id}`);
    if (res.status === 200) {
      dispatch({
        type: labelConstants.DELETE_LABEL_SUCCESS,
        payload: { order: res.data.label },
      });
    } else {
      dispatch({
        type: labelConstants.DELETE_LABEL_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
