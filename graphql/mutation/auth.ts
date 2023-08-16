import { gql } from "@/@types";


export const SET_SIGN_UP = gql(`
  mutation signUp($signupUserInput: SignUserInput!) {
    signup(signupUserInput: $signupUserInput) {
      accessToken
      user {
        username
        id
        email
      }
    }
  }
`)

export const SET_LOG_IN = gql(`
  mutation logIn($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
      accessToken
      user {
        avatar
        id
        username
      }
    }
  }
`)

export const LOG_OUT = gql(`
  mutation signup {
    logout {
      token
    }
  }
`)