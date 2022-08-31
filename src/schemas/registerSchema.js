import { object, string, ref } from "yup";

export const registerSchema = object({
  username: string("Enter an username")
    .min(2, "Minimum character length is 2")
    .max(25, "Maximum character length is 25")
    .required(),
  email: string("Enter an email")
    .min(2, "Minimum character length is 2")
    .max(25, "Maximum character length is 25")
    .email("Email must include @")
    .required(),
  password: string("Please  provide password")
    .min(6, "Minimum password length is 6")
    .max(25, "Maximum password length is 25")
    .required(),
  confirmPassword: string("Please provide confirmation password")
    .oneOf([ref("password"), null], "Passwords must match")
    .min(6, "Minimum password length is 6")
    .max(25, "Maximum password length is 25")
    .required(),
});
