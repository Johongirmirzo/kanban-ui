import styled from "styled-components";

const LoginBox = styled.div`
  background: #1c222f;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginFormBox = styled.section`
  min-width: 350px;
  max-width: 450px;
  background: #283144;
  border-radius: 5px;
  padding: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const LoginTextBox = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;
const LoginTitle = styled.h1`
  color: #fff;
  font-size: 1.9rem;
`;
const LoginDescription = styled.p`
  color: #a1b0cb;
  padding-top: 5px;
  font-size: 1.1rem;
`;
const LoginForm = styled.form``;
const LoginFormControl = styled.div`
  margin-bottom: 15px;
`;
const LoginLabel = styled.label`
  color: #a1b0cb;
  padding-bottom: 10px;
`;
const LoginInput = styled.input`
  display: block;
  width: 100%;
  padding: 10px 8px;
  border: 1px solid #546990;
  background: transparent;
  outline: 0;
  border-radius: 5px;
  font-size: 0.95rem;
  color: #a1b0cb;
  transition: padding 0.25s ease-out;
  &::placeholder {
    color: #a1b0cb;
  }
  &:focus {
    padding-left: 15px;
  }
`;
const LoginButton = styled.button`
  display: block;
  width: 100%;
  border: 0;
  border-radius: 5px;
  padding: 10px 0;
  color: #fff;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  background: #5a8dee;
  margin: 20px 0;
`;
const LoginRoutetext = styled.div`
  color: #a1b0cb;
`;

export {
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
};
