import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { REGISTER_USER } from "../../graphql/mutations/userMutations";
import { useMutation } from "@apollo/client";
import { Alert, Stack } from "@mui/material";
import { Formik } from "formik";
import { registerSchema } from "../../schemas/registerSchema";
import {
  RegisterBox,
  RegisterFormBox,
  RegisterTextBox,
  RegisterTitle,
  RegisterDescription,
  RegisterForm,
  RegisterFormControl,
  RegisterLabel,
  RegisterInput,
  RegisterButton,
  RegisterRoutetext,
  RegisterFieldError,
} from "./Register.styled";

const Register = ({ user }) => {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setCPassword] = useState("");

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const [registerUser] = useMutation(REGISTER_USER, {
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.extensions?.errors);
    },
    onCompleted(data) {
      localStorage.removeItem("user-info");
      navigate("/");
    },
  });

  console.log(errors);
  return (
    <RegisterBox>
      <RegisterFormBox>
        {Object.keys(errors).length > 0 && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            {Object.values(errors).map((err) => (
              <Alert severity="error" key={err}>
                {err}
              </Alert>
            ))}
          </Stack>
        )}
        <RegisterTextBox>
          <RegisterTitle>Kanban Task Management</RegisterTitle>
          <RegisterDescription>
            Please create an account and start the adventure
          </RegisterDescription>
        </RegisterTextBox>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={registerSchema}
          onSubmit={(values) => {
            registerUser({
              variables: {
                registerInput: values,
              },
            });
            console.log(values);
          }}
        >
          {(props) => (
            <RegisterForm onSubmit={props.handleSubmit}>
              <RegisterFormControl>
                <RegisterLabel htmlFor="username">Username</RegisterLabel>
                <RegisterInput
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Please enter username"
                  value={props.values.username}
                  onChange={props.handleChange}
                />
                {props.errors.username && props.touched.username ? (
                  <RegisterFieldError>
                    {props.errors.username}
                  </RegisterFieldError>
                ) : null}
              </RegisterFormControl>
              <RegisterFormControl>
                <RegisterLabel htmlFor="email">Email</RegisterLabel>
                <RegisterInput
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Please enter email"
                  value={props.values.email}
                  onChange={props.handleChange}
                />
                {props.errors.email && props.touched.email ? (
                  <RegisterFieldError>{props.errors.email}</RegisterFieldError>
                ) : null}
              </RegisterFormControl>
              <RegisterFormControl>
                <RegisterLabel htmlFor="password">Password</RegisterLabel>
                <RegisterInput
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Please enter password"
                  value={props.values.password}
                  onChange={props.handleChange}
                />
                {props.errors.password && props.touched.password ? (
                  <RegisterFieldError>
                    {props.errors.password}
                  </RegisterFieldError>
                ) : null}
              </RegisterFormControl>
              <RegisterFormControl>
                <RegisterLabel htmlFor="c-password">
                  Confirm Password
                </RegisterLabel>
                <RegisterInput
                  type="password"
                  id="c-password"
                  name="confirmPassword"
                  placeholder="Please confirm password"
                  value={props.values.confirmPassword}
                  onChange={props.handleChange}
                />
                {props.errors.confirmPassword &&
                props.touched.confirmPassword ? (
                  <RegisterFieldError>
                    {props.errors.confirmPassword}
                  </RegisterFieldError>
                ) : null}
              </RegisterFormControl>
              <RegisterButton type="submit">Submit</RegisterButton>
            </RegisterForm>
          )}
        </Formik>
        <RegisterRoutetext>
          Already Have an account?{" "}
          <Link to="/" style={{ color: "#5a8dee", textDecoration: "none" }}>
            Sign In
          </Link>
        </RegisterRoutetext>
      </RegisterFormBox>
    </RegisterBox>
  );
};

export default Register;
