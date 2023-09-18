import { FieldValues, RegisterOptions } from "react-hook-form";

interface IRegister {
  [key: string]: RegisterOptions<FieldValues>
}

export const inputRegister: IRegister = {
  username: {
    minLength: {
      value: 2,
      message: "Минимально 2 знака",
    },
    maxLength: {
      value: 20,
      message: "Максимально 20 знаков",
    },
    required: {
      value: true, 
      message: "Поле обязательно к заполнению",
    },
  },
  email: {
    pattern:
      /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
    required: true,
  },
  password: {
    // pattern: /((?=.\d)|(?=.\W+))(?![.\n])(?=.[A-Z])(?=.[a-z]).*$/,
    minLength: 8,
    maxLength: 32,
  },
};