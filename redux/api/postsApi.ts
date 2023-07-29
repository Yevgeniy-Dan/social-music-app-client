import { createApi } from "@reduxjs/toolkit/query/react";
import { gql } from "graphql-request";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { Post } from "@/@types/types";



export const postStatuses = ["draft", "published", "pending_review"] as const;

interface PostsResponse {
  posts: Post[];
}
interface PostResponse {
  post: Post;
}


export const postsApi = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: 'http://localhost:8080/graphql'
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<PostsResponse, number>({
      query: () => ({
        document: gql`
          query getPosts {
            posts {
              mediaUrl
              id
              totalLikes
              totalComments
              user {
                username
                musicGenres
                id
                avatar
              }
            }
          }
        `,
      }),
    }),
    getPost: builder.query<PostResponse, string>({
      query: (id) => ({
        document: gql`
          query {
            post(id: "${id}") {
              mediaUrl
              id
              totalLikes
              totalComments
              content
            }
          }
        `,
      }),
    }),
    regUser: builder.mutation<{login : {access_token: string}},
      { username: string; password: string }
    >({
      query: ({username, password}) => ({
        document: gql`
          mutation createPostLike($signupUserInput: SignUserInput!) {
            signup(signupUserInput: $signupUserInput) {
              accessToken
              user {
                username
              }
            }
          }
        `,
        variables: {
          signupUserInput: {
            "username": username,
            "password": password, 
            "email": "790n809@jjgmail.com"
          }
        },
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useRegUserMutation,
} = postsApi;
