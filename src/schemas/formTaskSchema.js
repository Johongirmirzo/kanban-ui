import { object, string, array, boolean } from "yup";

export const formTaskSchema = object({
  title: string("Please provide title")
    .min(5, "Minimum title characters must be 5")
    .max(50, "Maximum title characters must be 50")
    .required("Title can't be empty"),
  description: string("Please provide description")
    .min(5, "Minimum subtask characters must be 5")
    .max(250, "Maximum subtask characters must be 250")
    .required("Description can't be empty"),
  subtasks: array().of(
    object({
      id: string().required(),
      subtask: string("Please provide subtask")
        .min(5, "Minimum subtask characters must be 5")
        .max(25, "Maximum subtask characters must be 25")
        .required("Subtask can't be empty"),
      completed: boolean(),
    })
  ),
});
