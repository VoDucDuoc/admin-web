import { ErrorMessage } from "@hookform/error-message";
import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import {
  getLabelById,
  updateLabel,
  getLabels,
  deleteLabel,
} from "../../actions/label.actions";
import "./style.css";

function EditLabel() {
  const history = useHistory();
  const { id } = useParams();
  const { label, updating, loadingDetail, deleting } = useSelector(
    (state) => state.labels
  );

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getLabelById(id));
    }
  }, [id, dispatch]);
  useEffect(() => {
    if (label && Object.keys(label).length > 0) {
      reset(label);
    }
  }, [reset, label]);

  const onSubmit = (data) => {
    dispatch(updateLabel(data)).then(() => {
      dispatch(getLabels());
    });
  };

  const handleRemoveLabel = () => {
    dispatch(deleteLabel(id)).then(() => {
      dispatch(getLabels());
      setTimeout(() => {
        history.push("/labels");
      }, 0);
    });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="form__title d-block">Name:</p>
        <input
          className="form__input "
          {...register(`name`, { required: "This is required." })}
          placeholder="Label name"
        />
        <ErrorMessage
          errors={errors}
          name="name"
          render={({ message }) => (
            <div className="errorMessage">{message}</div>
          )}
        />

        <p className="form__title d-block">Color:</p>
        <Form.Control
          type="color"
          title="Choose your color"
          className="form__input "
          {...register(`color`, { required: "This is required." })}
        />
        <ErrorMessage
          errors={errors}
          name="color"
          render={({ message }) => (
            <div className="errorMessage">{message}</div>
          )}
        />
        <Button
          variant="success"
          className="mt-3 mr-2"
          type="submit"
          disabled={updating || deleting}
        >
          {updating && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          Submit
        </Button>
        <Button
          variant="danger"
          className="mt-3 mr-2"
          onClick={handleRemoveLabel}
          disabled={updating || deleting}
        >
          {deleting && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          Delete
        </Button>
      </form>
    </Box>
  );
}
export default EditLabel;
