import { gql } from "@/@types";

export const GET_USER_BY_HASHTAG = gql(`
  query seachByHashTag ($hashtagId: String!) {
    searchByHashtag(hashtagId: $hashtagId) {
      user {
        avatar
        id
        username
      }
    }
  }
`);