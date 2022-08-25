import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const NotFoundBox = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #283144;
`;
const NotFoundTitle = styled.h1`
  color: #fff;
  font-size: 3rem;
`;
const NotFoundBackLink = styled(Link)`
  color: hsl(216, 80%, 49%);
  font-size: 1.8rem;
  margin-top: 20px;
`;
const NotFoundImg = styled.img`
  width: 100px;
`;

export { NotFoundBox, NotFoundTitle, NotFoundBackLink, NotFoundImg };
