import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define a type for the slice state
interface PostsState {
  posts: any[]
}
// Define the initial state using that type
const initialState: PostsState = {
  posts: []
}

export const postsSlice = createSlice({
  name: 'posts', 
  initialState,
  reducers: {
    addPosts: (state, action) => {
      state.posts = state.posts.concat(action.payload) 
    },
    clearPosts: (state) => {
      state.posts = []
    }
  }
})

export const { addPosts, clearPosts } = postsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const postsComment = (state: RootState) => state.posts

export default postsSlice.reducer