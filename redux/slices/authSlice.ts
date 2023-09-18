import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { User, UserResponse } from '@/@types/graphql';

// Define a type for the slice state
interface AuthState {
  user: Partial<UserResponse> | null;
  access_token: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  access_token: null
}

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload.user
      state.access_token = action.payload.access_token
    },
    logOut: (state) => {
      state.user = null; 
      state.access_token = null; 
    }, 
    updateProfile: (state, action: PayloadAction<Partial<UserResponse>>) => {
      state.user = {...state.user, ...action.payload }
    }
  }
})

export const { setCredentials, logOut, updateProfile } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
