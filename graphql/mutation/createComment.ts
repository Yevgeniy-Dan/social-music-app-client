import { gql } from "@/@types";

export const CREATE_COMMENT = gql(`
  mutation createComment ($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      id
      user {
        avatar
        id
        musicGenres
      }
      content
    }
  }
`)