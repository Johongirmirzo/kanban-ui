import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import { GET_ALL_BOARDS } from "../../graphql/queries/boardQueries";
import { LOGIN_USER } from "../../graphql/mutations/userMutations";
import { useMutation } from "@apollo/client";
import { Alert, Stack } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
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
  LoginHrBox,
  LoginHrLine,
  LoginIconsBox,
  LoginIconStyle,
  LoginFacebookIcon,
  LoginTwitterIcon,
  LoginGoogleIcon,
} from "./Login.styled";

const Login = () => {
  const user = JSON.parse(localStorage.getItem("user-info"));
  const { login } = useContext(AuthContext);
  const { toggleTheme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
      setPassword(user.password);
    }
    console.log(user);
  }, []);
  const [loginUser] = useMutation(LOGIN_USER, {
    variables: {
      email,
      password,
    },
    onError(err) {
      console.dir(err);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    onCompleted(data) {
      if (isRememberMe) {
        localStorage.setItem(
          "user-info",
          JSON.stringify({ email, password, remember: true })
        );
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
  const createUser = (e) => {
    e.preventDefault();
    loginUser();
  };

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
        <LoginForm onSubmit={createUser}>
          <LoginFormControl>
            <LoginLabel htmlFor="email">Email</LoginLabel>
            <LoginInput
              type="email"
              id="email"
              name="email"
              placeholder="Please enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </LoginFormControl>
          <LoginFormControl>
            <LoginLabel htmlFor="password">Password</LoginLabel>
            <LoginInput
              type="password"
              id="password"
              name="password"
              placeholder="Please enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
