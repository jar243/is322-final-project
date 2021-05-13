import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { attemptLogin } from "./userApi"

export interface UserState {
  username: string
  password: string
  status: "idle" | "pending" | "failed"
  loggedIn: boolean
}

const initialState: UserState = {
  username: "",
  password: "",
  status: "idle",
  loggedIn: false,
}

export const login = createAsyncThunk(
  "user/login",
  async (data: { username: string; password: string }) => {
    return await attemptLogin(data.username, data.password)
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload
    },
    logout: (state) => {
      state.username = ""
      state.loggedIn = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "pending"
      })
      .addCase(login.fulfilled, (state, action) => {
        const isValidUser = action.payload
        state.password = ""
        state.loggedIn = isValidUser
        state.status = isValidUser ? "idle" : "failed"
      })
  },
})

export const selectStatus = (state: RootState) => state.user.status
export const selectLoggedIn = (state: RootState) => state.user.loggedIn
export const selectUsername = (state: RootState) => state.user.username
export const selectPassword = (state: RootState) => state.user.password

export const { setUsername, setPassword, logout } = userSlice.actions

export default userSlice.reducer
