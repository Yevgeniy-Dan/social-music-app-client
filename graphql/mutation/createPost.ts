import { gql } from "@/@types";

export const CREATE_POST = gql(`
  mutation createMyPost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      mediaUrl
    }
  }
`)

