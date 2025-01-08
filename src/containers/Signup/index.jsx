import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../../actions";
import Input from "../../components/UI/Input";
function Signup(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "staff",
    },
  });

  const handleSignup = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Password not match");
      return;
    } else {
      setError("");
    }
    dispatch(signup(data)).then(() => {
      reset();
    });
  };
  // if (auth.authenticate) {
  //   return <Redirect to="/" />;
  // }
  // if (user.loading) {
  //   return <h1>LOADING ...</h1>;
  // }
  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Form onSubmit={handleSubmit(handleSignup)} className="w-50">
        {user.message && <span style={{ color: "green" }}>{user.message}</span>}
        {user.error && !user.message && (
          <span className="errorMessage">{user.error}</span>
        )}
        <Row>
          <Col md={6}>
            <Form.Label className="form__title d-block">First Name:</Form.Label>
            <Form.Control
              className="form__input w-100"
              {...register(`firstName`, { required: true })}
              placeholder="First name"
            />
            {errors.firstName && (
              <span className="errorMessage">This field is required</span>
            )}
          </Col>
          <Col md={6}>
            <Form.Label className="form__title d-block">Last Name:</Form.Label>
            <Form.Control
              className="form__input w-100"
              {...register(`lastName`, { required: true })}
              placeholder="Last name"
            />
            {errors.lastName && (
              <span className="errorMessage">This field is required</span>
            )}
          </Col>
        </Row>
        <Form.Label className="form__title d-block">Email:</Form.Label>
        <Form.Control
          className="form__input w-100"
          {...register(`email`, { required: true })}
          placeholder="Email"
          type="email"
        />
        {errors.email && (
          <span className="errorMessage">This field is required</span>
        )}
        <Form.Label className="form__title d-block">Password:</Form.Label>
        <Form.Control
          className="form__input w-100"
          {...register(`password`, { required: true })}
          placeholder="Password"
          type="password"
        />
        {errors.password && (
          <span className="errorMessage">This field is required</span>
        )}
        <Form.Label className="form__title d-block">
          Confirm password:
        </Form.Label>
        <Form.Control
          className="form__input w-100"
          {...register(`confirmPassword`, { required: true })}
          placeholder="Confirm password"
          type="password"
        />
        {errors.confirmPassword && (
          <span className="errorMessage">This field is required</span>
        )}
        {error !== "" && !errors.confirmPassword && (
          <span className="errorMessage">{error}</span>
        )}
        <Form.Check
          type="radio"
          name="role"
          {...register("role")}
          value="admin"
          label="Admin"
        />
        <Form.Check
          type="radio"
          name="role"
          {...register("role")}
          value="staff"
          label="Staff"
        />
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

Signup.propTypes = {};

export default Signup;
