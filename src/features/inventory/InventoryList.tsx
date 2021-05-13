import React from "react"
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  H2,
  HTMLTable,
  Button,
  ButtonGroup,
  Callout,
  Colors,
} from "@blueprintjs/core"

import {
  nextPage,
  prevPage,
  refreshInventory,
  setSelection,
  selectItemSel,
  selectActivePage,
  selectPageCount,
  selectItems,
  ITEMS_PER_PAGE,
} from "./inventorySlice"

const cardStyle = {
  maxWidth: "400px",
  margin: "30px auto",
}

function mb(pixels: number) {
  return { marginBottom: pixels + "px" }
}

let initialLoad = false

export function InventoryList() {
  const items = useAppSelector(selectItems)

  const pageCount = useAppSelector(selectPageCount)
  const activePage = useAppSelector(selectActivePage)
  const startIndex = ITEMS_PER_PAGE * (activePage - 1)
  const endIndex = startIndex + ITEMS_PER_PAGE

  const sel = useAppSelector(selectItemSel)
  const dispatch = useAppDispatch()

  if (!initialLoad) {
    dispatch(refreshInventory())
    initialLoad = true
  }

  return (
    <div>
      <ButtonGroup>
        <Button
          disabled={activePage < 2}
          onClick={() => {
            dispatch(prevPage())
          }}
        >
          Prev Page
        </Button>
        <Button
          disabled={activePage === pageCount}
          onClick={() => {
            dispatch(nextPage())
          }}
        >
          Next Page
        </Button>
      </ButtonGroup>

      <HTMLTable striped={true} interactive={true}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.slice(startIndex, endIndex).map((itm) => (
            <tr
              key={itm.id}
              id={"inv_" + itm.id}
              style={
                sel !== null && sel.id === itm.id
                  ? { background: Colors.LIME5 }
                  : {}
              }
              onClick={(e) => {
                const itmId = parseInt(e.currentTarget.id.split("_")[1])
                dispatch(setSelection(itmId))
              }}
            >
              <td>{itm.id}</td>
              <td>{itm.name}</td>
              <td>{itm.description}</td>
              <td>{itm.price}</td>
            </tr>
          ))}
        </tbody>
      </HTMLTable>
    </div>
  )
}
