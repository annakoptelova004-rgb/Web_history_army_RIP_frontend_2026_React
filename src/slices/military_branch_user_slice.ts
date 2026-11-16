
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface MilitaryBranchUserState {
  isAuthenticated: boolean
  username: string | null
  token: string | null
  loading: boolean
  error: string | null
}

const initialState: MilitaryBranchUserState = {
  isAuthenticated: false,
  username: null,
  token: null,
  loading: false,
  error: null,
}

const militaryBranchUserSlice = createSlice({
  name: 'militaryBranchUser',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true
      state.error = null
    },

    loginSuccess(
      state,
      action: PayloadAction<{ username: string; token: string }>
    ) {
      state.isAuthenticated = true
      state.username = action.payload.username
      state.token = action.payload.token
      state.loading = false
      state.error = null
    },

    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },

    logout(state) {
      state.isAuthenticated = false
      state.username = null
      state.token = null
      state.loading = false
      state.error = null
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} = militaryBranchUserSlice.actions

export default militaryBranchUserSlice.reducer
