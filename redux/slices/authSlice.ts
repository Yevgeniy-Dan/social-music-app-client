import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define a type for the slice state
interface AuthState {
  user: {
    username: string;
    avatar: string; 
    musicGenres: JSON;
    bio: string;
  } | null;
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
      state = action.payload
    },
    logout: (state) => {
      state = {
        user: null, 
        access_token: null
      }
    }
  }
})

export const { setCredentials, logout } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state

export default authSlice.reducer