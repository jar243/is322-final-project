import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { getInventory } from "./inventoryApi"
import type { InventoryItem } from "./inventoryApi"

export const ITEMS_PER_PAGE = 10

export interface InventoryState {
  status: "idle" | "pending"
  items: Array<InventoryItem>
  pageCount: number
  activePage: number
  selection: InventoryItem | null
}

const initialState: InventoryState = {
  status: "idle",
  items: [],
  pageCount: 1,
  activePage: 1,
  selection: null,
}

export const refreshInventory = createAsyncThunk(
  "inventory/refresh",
  async () => {
    return await getInventory()
  }
)

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setSelection: (state, action: PayloadAction<number>) => {
      const search = state.items.find((itm) => {
        return itm.id === action.payload
      })
      state.selection = typeof search !== "undefined" ? search : null
    },
    sortAlpha: (state) => {
      state.items.sort((a, b) => {
        const aName = a.name.toUpperCase()
        const bName = b.name.toUpperCase()
        return aName === bName ? 0 : aName > bName ? 1 : -1
      })
    },
    sortPrice: (state) => {
      state.items.sort((a, b) => {
        return a.price === b.price ? 0 : a.price > b.price ? 1 : -1
      })
    },
    nextPage: (state) => {
      if (state.activePage < state.pageCount) {
        state.activePage += 1
      }
    },
    prevPage: (state) => {
      if (state.activePage > 1) {
        state.activePage -= 1
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshInventory.pending, (state) => {
        state.status = "pending"
      })
      .addCase(refreshInventory.fulfilled, (state, action) => {
        state.selection = null
        state.status = "idle"
        state.items = action.payload
        state.pageCount = Math.ceil(state.items.length / ITEMS_PER_PAGE)
        if (state.activePage > state.pageCount) {
          state.activePage = state.pageCount
        }
      })
  },
})

export const selectActivePage = (state: RootState) => state.inventory.activePage
export const selectPageCount = (state: RootState) => state.inventory.pageCount
export const selectStatus = (state: RootState) => state.inventory.status
export const selectItems = (state: RootState) => state.inventory.items
export const selectItemSel = (state: RootState) => state.inventory.selection

export const { nextPage, prevPage, sortAlpha, sortPrice, setSelection } =
  inventorySlice.actions

export default inventorySlice.reducer
