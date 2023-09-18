import { gql } from "@/@types";

export const GET_USER_BY_NAME = gql(`
  query searchName ($username: String!) {
    searchByName (username: $username) {
      user {
        username
        avatar
        id
      }
    }
  }
`);