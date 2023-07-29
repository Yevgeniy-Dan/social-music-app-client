import { postsApi } from './api/postsApi';
import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import authSlice  from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    // Add the generated reducer as a specific top-level slice
    [postsApi.reducerPath]: postsApi.reducer,

  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
