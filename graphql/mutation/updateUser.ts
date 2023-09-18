import { gql } from "@/@types";

export const UPDATE_PROFILE = gql(`
  mutation updateProfile ($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      avatar
      username
      email
      bio
    }
  }
`)