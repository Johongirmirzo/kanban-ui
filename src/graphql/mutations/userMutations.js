import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput!) {
    register(registerInput: $registerInput) {
      id
      username
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      token
      email
      password
    }
  }
`;
