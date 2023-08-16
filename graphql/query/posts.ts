import { gql } from "@/@types";

export const GET_POSTS = gql(`
  query getPosts($page: Int!) {
    posts(page: $page) {
      mediaUrl
      totalLikes
      totalComments
      isLiked
      id
      user {
        username
        avatar
        musicGenres
      }
    }
  }
`);

export const GET_POST = gql(`
  query getPost($id: String!) {
    post(id: $id) {
      id
      mediaUrl
      isLiked
      user {
        avatar
        id
        username
        musicGenres
      }
      totalLikes
      totalComments
      comments {
        parentId
        id
        user {
          username
          id
          avatar
        }
        content
      }
    }
  }
`)

export const GET_POST_ISLIKE = gql(`
  query getPostIsLike($id: String!) {
    post(id: $id) {
      id
      isLiked
      totalLikes
    }
  }
`)