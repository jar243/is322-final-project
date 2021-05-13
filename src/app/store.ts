import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import userReducer from "../features/user/userSlice"
import inventoryReducer from "../features/inventory/inventorySlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    inventory: inventoryReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
