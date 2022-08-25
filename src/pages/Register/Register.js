import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import { REGISTER_USER } from "../../graphql/mutations/userMutations";
import { useMutation } from "@apollo/client";
import { Alert, Stack } from "@mui/material";
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
  RegisterHrBox,
  RegisterHrLine,
  RegisterIconsBox,
  RegisterIconStyle,
  RegisterFacebookIcon,
  RegisterTwitterIcon,
  RegisterGoogleIcon,
} from "./Register.styled";

const Register = ({ user }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const [registerUser] = useMutation(REGISTER_USER, {
    variables: {
      registerInput: { username, email, password, confirmPassword },
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    onCompleted() {
      navigate("/");
    },
  });

  const createUser = (e) => {
    e.preventDefault();
    registerUser();
  };

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
        <RegisterForm onSubmit={createUser}>
          <RegisterFormControl>
            <RegisterLabel htmlFor="username">Username</RegisterLabel>
            <RegisterInput
              type="text"
              id="username"
              name="username"
              placeholder="Please enter username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </RegisterFormControl>
          <RegisterFormControl>
            <RegisterLabel htmlFor="email">Email</RegisterLabel>
            <RegisterInput
              type="email"
              id="email"
              name="email"
              placeholder="Please enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </RegisterFormControl>
          <RegisterFormControl>
            <RegisterLabel htmlFor="password">Password</RegisterLabel>
            <RegisterInput
              type="password"
              id="password"
              name="password"
              placeholder="Please enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </RegisterFormControl>
          <RegisterFormControl>
            <RegisterLabel htmlFor="c-password">Confirm Password</RegisterLabel>
            <RegisterInput
              type="password"
              id="c-password"
              name="confirmPassword"
              placeholder="Please confirm password"
              onChange={(e) => setCPassword(e.target.value)}
              required
            />
          </RegisterFormControl>
          <RegisterButton>Submit</RegisterButton>
        </RegisterForm>
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
