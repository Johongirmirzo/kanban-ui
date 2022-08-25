import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import {
  NotFoundBox,
  NotFoundTitle,
  NotFoundBackLink,
} from "./NotFound.styled";

const NotFound = () => {
  return (
    <NotFoundBox>
      <ErrorIcon sx={{ fontSize: "100px", color: "red" }} />
      <NotFoundTitle>404 Not Found</NotFoundTitle>
      <NotFoundBackLink to="/">Go Back to Home</NotFoundBackLink>
    </NotFoundBox>
  );
};

export default NotFound;
