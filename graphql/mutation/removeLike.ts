import { gql } from "@/@types";

export const REMOVE_LIKE = gql(`
  mutation removeLike($postId: String!) {
    removeLike(postId: $postId) {
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