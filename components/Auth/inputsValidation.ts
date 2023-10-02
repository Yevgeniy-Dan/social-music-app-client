import { FieldValues, RegisterOptions } from 'react-hook-form'

interface IRegister {
  [key: string]: RegisterOptions<FieldValues> | undefined
}

export const inputsValidation: IRegister = {
  username: {
    minLength: {
      value: 2,
      message: 'Минимально 2 знака',
    },
    maxLength: {
      value: 20,
      message: 'Максимально 20 знаков',
    },
  },
  email: {
    pattern: {
      value:
        /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
      message: 'Не похоже на мейл .___.',
    },
  },
  password: {
    minLength: {
      value: 8,
      message: 'Минимально 8 знака',
    },
    maxLength: {
      value: 32,
      message: 'Максимально 32 знаков',
    },
  },
}
