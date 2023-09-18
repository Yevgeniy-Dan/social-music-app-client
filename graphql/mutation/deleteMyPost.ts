import { gql } from "@/@types";

export const DELETE_POST = gql(`
  mutation deleteMyPost($postId: String!) {
    deletePost(postId: $postId) {
      message
    }
  }
`)
