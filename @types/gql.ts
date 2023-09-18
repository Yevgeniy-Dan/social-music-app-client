/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n        mutation refresh {\n          refresh {\n            accessToken\n          }\n        }\n      ": types.RefreshDocument,
    "\n  mutation signUp($signupUserInput: SignUserInput!) {\n    signup(signupUserInput: $signupUserInput) {\n      accessToken\n      user {\n        username\n        id\n        email\n      }\n    }\n  }\n": types.SignUpDocument,
    "\n  mutation logIn($loginUserInput: LoginUserInput!) {\n    login(loginUserInput: $loginUserInput) {\n      accessToken\n      user {\n        avatar\n        id\n        username\n      }\n    }\n  }\n": types.LogInDocument,
    "\n  mutation signup {\n    logout {\n      token\n    }\n  }\n": types.SignupDocument,
    "\n  mutation createComment ($createCommentInput: CreateCommentInput!) {\n    createComment(createCommentInput: $createCommentInput) {\n      id\n      user {\n        avatar\n        id\n      }\n      content\n    }\n  }\n": types.CreateCommentDocument,
    "\n  mutation createLike($postId: String!) {\n    createLike(postId: $postId) {\n      id\n      user {\n        id\n        username\n        avatar\n      }\n      postId\n      userId\n    }\n  }\n": types.CreateLikeDocument,
    "\n  mutation createMyPost($createPostInput: CreatePostInput!) {\n    createPost(createPostInput: $createPostInput) {\n      mediaUrl\n    }\n  }\n": types.CreateMyPostDocument,
    "\n  mutation deleteMyPost($postId: String!) {\n    deletePost(postId: $postId) {\n      message\n    }\n  }\n": types.DeleteMyPostDocument,
    "\n  mutation removeLike($postId: String!) {\n    removeLike(postId: $postId) {\n      user {\n        id\n        username\n        avatar\n      }\n      postId\n      userId\n    }\n  }\n": types.RemoveLikeDocument,
    "\n  mutation updateProfile ($updateUserInput: UpdateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      id\n      avatar\n      username\n      email\n      bio\n    }\n  }\n": types.UpdateProfileDocument,
    "\n  query getPosts($page: Int!) {\n    posts(page: $page) {\n      mediaUrl\n      totalLikes\n      totalComments\n      isLiked\n      id\n      user {\n        username\n        avatar\n      }\n    }\n  }\n": types.GetPostsDocument,
    "\n  query getPost($id: String!) {\n    post(id: $id) {\n      id\n      mediaUrl\n      isLiked\n      user {\n        avatar\n        id\n        username\n      }\n      totalLikes\n      totalComments\n      comments {\n        parentId\n        id\n        user {\n          username\n          id\n          avatar\n        }\n        content\n      }\n    }\n  }\n": types.GetPostDocument,
    "\n  query getPostIsLike($id: String!) {\n    post(id: $id) {\n      id\n      isLiked\n      totalLikes\n    }\n  }\n": types.GetPostIsLikeDocument,
    "\n  query seachByHashTag ($hashtagId: String!) {\n    searchByHashtag(hashtagId: $hashtagId) {\n      user {\n        avatar\n        id\n        username\n      }\n    }\n  }\n": types.SeachByHashTagDocument,
    "\n  query searchName ($username: String!) {\n    searchByName (username: $username) {\n      user {\n        username\n        avatar\n        id\n      }\n    }\n  }\n": types.SearchNameDocument,
    "\n  query getUser($username: String!) {\n    user(username: $username) {\n      username\n      email\n      avatar\n      posts {\n        mediaUrl\n        totalLikes\n        id\n        user {\n          username\n          id\n          avatar\n        }\n      }\n    }\n  }\n": types.GetUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n        mutation refresh {\n          refresh {\n            accessToken\n          }\n        }\n      "): (typeof documents)["\n        mutation refresh {\n          refresh {\n            accessToken\n          }\n        }\n      "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation signUp($signupUserInput: SignUserInput!) {\n    signup(signupUserInput: $signupUserInput) {\n      accessToken\n      user {\n        username\n        id\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation signUp($signupUserInput: SignUserInput!) {\n    signup(signupUserInput: $signupUserInput) {\n      accessToken\n      user {\n        username\n        id\n        email\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation logIn($loginUserInput: LoginUserInput!) {\n    login(loginUserInput: $loginUserInput) {\n      accessToken\n      user {\n        avatar\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation logIn($loginUserInput: LoginUserInput!) {\n    login(loginUserInput: $loginUserInput) {\n      accessToken\n      user {\n        avatar\n        id\n        username\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation signup {\n    logout {\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation signup {\n    logout {\n      token\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createComment ($createCommentInput: CreateCommentInput!) {\n    createComment(createCommentInput: $createCommentInput) {\n      id\n      user {\n        avatar\n        id\n      }\n      content\n    }\n  }\n"): (typeof documents)["\n  mutation createComment ($createCommentInput: CreateCommentInput!) {\n    createComment(createCommentInput: $createCommentInput) {\n      id\n      user {\n        avatar\n        id\n      }\n      content\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createLike($postId: String!) {\n    createLike(postId: $postId) {\n      id\n      user {\n        id\n        username\n        avatar\n      }\n      postId\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation createLike($postId: String!) {\n    createLike(postId: $postId) {\n      id\n      user {\n        id\n        username\n        avatar\n      }\n      postId\n      userId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createMyPost($createPostInput: CreatePostInput!) {\n    createPost(createPostInput: $createPostInput) {\n      mediaUrl\n    }\n  }\n"): (typeof documents)["\n  mutation createMyPost($createPostInput: CreatePostInput!) {\n    createPost(createPostInput: $createPostInput) {\n      mediaUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteMyPost($postId: String!) {\n    deletePost(postId: $postId) {\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation deleteMyPost($postId: String!) {\n    deletePost(postId: $postId) {\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation removeLike($postId: String!) {\n    removeLike(postId: $postId) {\n      user {\n        id\n        username\n        avatar\n      }\n      postId\n      userId\n    }\n  }\n"): (typeof documents)["\n  mutation removeLike($postId: String!) {\n    removeLike(postId: $postId) {\n      user {\n        id\n        username\n        avatar\n      }\n      postId\n      userId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateProfile ($updateUserInput: UpdateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      id\n      avatar\n      username\n      email\n      bio\n    }\n  }\n"): (typeof documents)["\n  mutation updateProfile ($updateUserInput: UpdateUserInput!) {\n    updateUser(updateUserInput: $updateUserInput) {\n      id\n      avatar\n      username\n      email\n      bio\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getPosts($page: Int!) {\n    posts(page: $page) {\n      mediaUrl\n      totalLikes\n      totalComments\n      isLiked\n      id\n      user {\n        username\n        avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPosts($page: Int!) {\n    posts(page: $page) {\n      mediaUrl\n      totalLikes\n      totalComments\n      isLiked\n      id\n      user {\n        username\n        avatar\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getPost($id: String!) {\n    post(id: $id) {\n      id\n      mediaUrl\n      isLiked\n      user {\n        avatar\n        id\n        username\n      }\n      totalLikes\n      totalComments\n      comments {\n        parentId\n        id\n        user {\n          username\n          id\n          avatar\n        }\n        content\n      }\n    }\n  }\n"): (typeof documents)["\n  query getPost($id: String!) {\n    post(id: $id) {\n      id\n      mediaUrl\n      isLiked\n      user {\n        avatar\n        id\n        username\n      }\n      totalLikes\n      totalComments\n      comments {\n        parentId\n        id\n        user {\n          username\n          id\n          avatar\n        }\n        content\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getPostIsLike($id: String!) {\n    post(id: $id) {\n      id\n      isLiked\n      totalLikes\n    }\n  }\n"): (typeof documents)["\n  query getPostIsLike($id: String!) {\n    post(id: $id) {\n      id\n      isLiked\n      totalLikes\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query seachByHashTag ($hashtagId: String!) {\n    searchByHashtag(hashtagId: $hashtagId) {\n      user {\n        avatar\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  query seachByHashTag ($hashtagId: String!) {\n    searchByHashtag(hashtagId: $hashtagId) {\n      user {\n        avatar\n        id\n        username\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query searchName ($username: String!) {\n    searchByName (username: $username) {\n      user {\n        username\n        avatar\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query searchName ($username: String!) {\n    searchByName (username: $username) {\n      user {\n        username\n        avatar\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getUser($username: String!) {\n    user(username: $username) {\n      username\n      email\n      avatar\n      posts {\n        mediaUrl\n        totalLikes\n        id\n        user {\n          username\n          id\n          avatar\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUser($username: String!) {\n    user(username: $username) {\n      username\n      email\n      avatar\n      posts {\n        mediaUrl\n        totalLikes\n        id\n        user {\n          username\n          id\n          avatar\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;