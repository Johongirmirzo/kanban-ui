import styled from "styled-components";

const RegisterBox = styled.div`
  background: #1c222f;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const RegisterFormBox = styled.section`
  min-width: 350px;
  max-width: 450px;
  background: #283144;
  border-radius: 5px;
  padding: 25px 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const RegisterTextBox = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;
const RegisterTitle = styled.h1`
  color: #fff;
  font-size: 1.9rem;
`;
const RegisterDescription = styled.p`
  color: #a1b0cb;
  padding-top: 5px;
  font-size: 1.1rem;
`;
const RegisterForm = styled.form``;
const RegisterFormControl = styled.div`
  margin-bottom: 15px;
`;
const RegisterLabel = styled.label`
  color: #a1b0cb;
  padding-bottom: 10px;
`;
const RegisterInput = styled.input`
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
const RegisterButton = styled.button`
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
const RegisterRoutetext = styled.div`
  color: #a1b0cb;
`;

export {
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
};
