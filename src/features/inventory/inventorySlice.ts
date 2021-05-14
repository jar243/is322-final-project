import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import {
  getInventory,
  addInventory,
  updateInventory,
  deleteInventory,
} from "./inventoryApi"
import type { InventoryItem, NewInventoryItem } from "./inventoryApi"

export const ITEMS_PER_PAGE = 10

export interface InventoryState {
  status: "idle" | "pending"
  editorMode: "new" | "update"
  items: Array<InventoryItem>
  pageCount: number
  activePage: number
  selection: InventoryItem | null
  editorData: NewInventoryItem
}

const initialState: InventoryState = {
  status: "idle",
  editorMode: "new",
  items: [],
  pageCount: 1,
  activePage: 1,
  selection: null,
  editorData: { name: "", price: 19.99, description: "" },
}

export const refreshInventory = createAsyncThunk(
  "inventory/refresh",
  async () => {
    return await getInventory()
  }
)

export const addItem = createAsyncThunk(
  "inventory/add",
  async (data: NewInventoryItem) => {
    return await addInventory(data)
  }
)

export const updateItem = createAsyncThunk(
  "inventory/update",
  async (data: InventoryItem) => {
    return await updateInventory(data)
  }
)

export const deleteItem = createAsyncThunk(
  "inventory/delete",
  async (data: number) => {
    return await deleteInventory(data)
  }
)

function pendingFunc(state: InventoryState) {
  state.status = "pending"
}

function fulfilledFunc(state: InventoryState) {
  state.status = "idle"
  state.editorMode = "new"
  state.editorData = { name: "", price: 19.99, description: "" }
}

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setSelection: (state, action: PayloadAction<number>) => {
      const search = state.items.find((itm) => {
        return itm.id === action.payload
      })
      state.selection = typeof search !== "undefined" ? search : null
      if (state.selection !== null) {
        state.editorMode = "update"
        state.editorData = {
          name: state.selection.name,
          description: state.selection.description,
          price: state.selection.price,
        }
      }
    },
    startNewEditor: (state) => {
      state.editorMode = "new"
      state.selection = null
      state.editorData = { name: "", price: 19.99, description: "" }
    },
    setEditorName: (state, action: PayloadAction<string>) => {
      state.editorData.name = action.payload
    },
    setEditorDesc: (state, action: PayloadAction<string>) => {
      state.editorData.description = action.payload
    },
    setEditorPrice: (state, action: PayloadAction<number>) => {
      state.editorData.price = action.payload
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
    builder
      .addCase(addItem.pending, pendingFunc)
      .addCase(addItem.fulfilled, fulfilledFunc)
    builder
      .addCase(updateItem.pending, pendingFunc)
      .addCase(updateItem.fulfilled, fulfilledFunc)
    builder
      .addCase(deleteItem.pending, pendingFunc)
      .addCase(deleteItem.fulfilled, fulfilledFunc)
  },
})

export const selectActivePage = (state: RootState) => state.inventory.activePage
export const selectPageCount = (state: RootState) => state.inventory.pageCount
export const selectStatus = (state: RootState) => state.inventory.status
export const selectItems = (state: RootState) => state.inventory.items

export const selectItemSel = (state: RootState) => state.inventory.selection
export const selectEditorMode = (state: RootState) => state.inventory.editorMode
export const selectEditorData = (state: RootState) => state.inventory.editorData

export const {
  nextPage,
  prevPage,
  sortAlpha,
  sortPrice,
  setSelection,
  setEditorName,
  setEditorDesc,
  setEditorPrice,
  startNewEditor,
} = inventorySlice.actions

export default inventorySlice.reducer
