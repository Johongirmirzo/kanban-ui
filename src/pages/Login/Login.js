import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { LOGIN_USER } from "../../graphql/mutations/userMutations";
import { useMutation } from "@apollo/client";
import { Alert, Stack } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { loginSchema } from "../../schemas/loginSchema";
import { Formik } from "formik";

import {
  LoginBox,
  LoginFormBox,
  LoginTextBox,
  LoginTitle,
  LoginDescription,
  LoginForm,
  LoginFormControl,
  LoginLabel,
  LoginInput,
  LoginButton,
  LoginRoutetext,
  LoginFieldError,
} from "./Login.styled";

const Login = () => {
  const user = JSON.parse(localStorage.getItem("user-info"));
  const { login } = useContext(AuthContext);
  const { toggleTheme } = useContext(ThemeContext);

  const [isRememberMe, setIsRememberMe] = useState(false);
  const [errors, setErrors] = useState([]);

  const [loginUser] = useMutation(LOGIN_USER, {
    onError(err) {
      console.dir(err);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    onCompleted(data) {
      if (isRememberMe) {
        localStorage.setItem(
          "user-info",
          JSON.stringify({
            email: data.login.email,
            password: data.login.password,
            remember: true,
          })
        );
        console.log(data);
        login({
          username: data.login.username,
          token: data.login.token,
          tokenExpirationTime: Date.now() + 1000 * 3600,
        });
        toggleTheme("lightMode");
      } else {
        login({
          username: data.login.username,
          token: data.login.token,
          tokenExpirationTime: Date.now() + 1000 * 3600,
        });
        toggleTheme("lightMode");
        localStorage.removeItem("user-info");
      }
    },
  });
  console.log(user);

  return (
    <LoginBox>
      <LoginFormBox>
        {Object.keys(errors).length > 0 && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            {Object.values(errors).map((err) => (
              <Alert severity="error" key={err}>
                {err}
              </Alert>
            ))}
          </Stack>
        )}
        <LoginTextBox>
          <LoginTitle>Kanban Task Management</LoginTitle>
          <LoginDescription>
            Please sign-in to your account and start the adventure
          </LoginDescription>
        </LoginTextBox>
        <Formik
          initialValues={{
            email: user?.email || "",
            password: user?.password || "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values) => {
            loginUser({
              variables: values,
            });
          }}
        >
          {(props) => (
            <LoginForm onSubmit={props.handleSubmit}>
              <LoginFormControl>
                <LoginLabel htmlFor="email">Email</LoginLabel>
                <LoginInput
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Please enter email"
                  value={props.values.email}
                  onChange={props.handleChange}
                />
                {props.errors.email && props.touched.email ? (
                  <LoginFieldError>{props.errors.email}</LoginFieldError>
                ) : null}
              </LoginFormControl>

              <LoginFormControl>
                <LoginLabel htmlFor="password">Password</LoginLabel>
                <LoginInput
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Please enter password"
                  value={props.values.password}
                  onChange={props.handleChange}
                />
                {props.errors.password && props.touched.password ? (
                  <LoginFieldError>{props.errors.password}</LoginFieldError>
                ) : null}
              </LoginFormControl>
              <LoginFormControl>
                <Checkbox
                  id="remember"
                  name="remember"
                  checked={isRememberMe ? true : false}
                  onChange={() => setIsRememberMe(!isRememberMe)}
                  sx={{
                    "&.MuiCheckbox-root": {
                      color: "#a1b0cb",
                      marginLeft: "-11px",
                    },
                  }}
                />
                <LoginLabel htmlFor="remember">Remember Me</LoginLabel>
              </LoginFormControl>
              <LoginButton>Submit</LoginButton>
            </LoginForm>
          )}
        </Formik>
        <LoginRoutetext>
          Don't have an acoount yet?
          <Link
            to="/register"
            style={{ color: "#5a8dee", textDecoration: "none" }}
          >
            {" "}
            Register
          </Link>
        </LoginRoutetext>
      </LoginFormBox>
    </LoginBox>
  );
};

export default Login;
