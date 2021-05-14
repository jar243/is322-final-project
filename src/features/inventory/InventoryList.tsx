import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  HTMLTable,
  Button,
  ButtonGroup,
  Position,
  Menu,
  MenuItem,
  Colors,
} from "@blueprintjs/core"

import { Popover2 } from "@blueprintjs/popover2"

import {
  nextPage,
  prevPage,
  refreshInventory,
  sortAlpha,
  sortPrice,
  setSelection,
  selectItemSel,
  selectActivePage,
  selectPageCount,
  selectItems,
  ITEMS_PER_PAGE,
} from "./inventorySlice"

const tableStyle = {
  width: "100%",
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
        <Popover2
          content={
            <Menu>
              <MenuItem
                onClick={() => {
                  dispatch(sortAlpha())
                }}
                icon="sort-alphabetical"
                text="By Name"
              />
              <MenuItem
                onClick={() => {
                  dispatch(sortPrice())
                }}
                icon="sort-numerical"
                text="By Price"
              />
            </Menu>
          }
          position={Position.BOTTOM_LEFT}
        >
          <Button icon="sort" text="Sort" />
        </Popover2>

        <Button
          disabled={activePage < 2}
          icon="arrow-left"
          onClick={() => {
            dispatch(prevPage())
          }}
        />
        <Button
          disabled={activePage === pageCount}
          icon="arrow-right"
          onClick={() => {
            dispatch(nextPage())
          }}
        />
      </ButtonGroup>

      <HTMLTable striped={true} interactive={true} style={tableStyle}>
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
