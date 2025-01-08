import { ErrorMessage } from "@hookform/error-message";
import Box from "@mui/material/Box";
import React from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createLabel, getLabels } from "../../actions/label.actions";
import "./style.css";

function AddLabel() {
  const { submitting } = useSelector((state) => state.labels);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(createLabel(data))
      .then(() => {
        dispatch(getLabels());
      })
      .then(() => {
        history.push("/labels");
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
          disabled={submitting}
        >
          {submitting && (
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
      </form>
    </Box>
  );
}
export default AddLabel;
