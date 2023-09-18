import { gql } from "@/@types";

export const GET_USER = gql(`
  query getUser($username: String!) {
    user(username: $username) {
      username
      email
      avatar
      posts {
        mediaUrl
        totalLikes
        id
        user {
          username
          id
          avatar
        }
      }
    }
  }
`);