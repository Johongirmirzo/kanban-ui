import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

const LoaderBox = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #283144;
`;

const Loader = () => {
  return (
    <LoaderBox>
      <CircularProgress />
    </LoaderBox>
  );
};

export default Loader;
