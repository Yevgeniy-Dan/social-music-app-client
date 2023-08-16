import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define a type for the slice state
interface CommentState {
  replyId: string | null;
  replyUser: string | null; 
  showAllComments: boolean; 
}
// Define the initial state using that type
const initialState: CommentState = {
  replyId: null,
  replyUser: null,
  showAllComments: false
} 

export const commentSlice = createSlice({
  name: 'comment', 
  initialState,
  reducers: {
    toggleShowAllComments: (state) => { 
      state.showAllComments = !state.showAllComments
    },
    setReplyId: (state, action: PayloadAction<string | null>) => {
      state.replyId = action.payload
    },
    setReplyUser: (state, action: PayloadAction<string | null>) => {
      state.replyUser = action.payload
    },
    setNameForReply: (state, action: PayloadAction<{replyId: string | null, replyUser: string | null}>) => {
      if (action.payload.replyId === state.replyId) return;
      state.replyId = action.payload.replyId
      state.replyUser = action.payload.replyUser
    },
    clearReply: (state) => {
      state.replyId = null;
      state.replyUser = null;
    }
  }
})

export const { toggleShowAllComments, setReplyId, setReplyUser, setNameForReply, clearReply } = commentSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectComment = (state: RootState) => state.comment

export default commentSlice.reducer