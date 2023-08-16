import { gql } from "@/@types";

export const CREATE_LIKE = gql(`
  mutation createLike($postId: String!) {
    createLike(postId: $postId) {
      id
      user {
        id
        username
        avatar
      }
      postId
      userId
    }
  }
`)