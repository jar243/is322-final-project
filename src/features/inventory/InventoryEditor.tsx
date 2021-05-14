import { useAppSelector, useAppDispatch } from "../../app/hooks"
import {
  Button,
  ButtonGroup,
  FormGroup,
  InputGroup,
  Label,
} from "@blueprintjs/core"

import {
  selectItemSel,
  selectEditorMode,
  selectEditorData,
  setEditorName,
  setEditorDesc,
  setEditorPrice,
  startNewEditor,
  deleteItem,
  updateItem,
  addItem,
  selectStatus,
  refreshInventory,
} from "./inventorySlice"

const editorStyle = {
  width: "100%",
}

function mb(pixels: number) {
  return { marginBottom: pixels + "px" }
}

export function InventoryEditor() {
  const sel = useAppSelector(selectItemSel)
  const status = useAppSelector(selectStatus)
  const editorMode = useAppSelector(selectEditorMode)
  const editorData = useAppSelector(selectEditorData)

  const dispatch = useAppDispatch()

  return (
    <div style={editorStyle}>
      <ButtonGroup>
        <Button
          icon="add"
          disabled={editorMode === "new"}
          onClick={() => {
            dispatch(startNewEditor())
          }}
        >
          New
        </Button>
        <Button
          icon="floppy-disk"
          onClick={() => {
            if (editorMode === "update" && sel !== null) {
              dispatch(
                updateItem({
                  id: sel.id,
                  name: editorData.name,
                  description: editorData.description,
                  price: editorData.price,
                })
              )
            } else if (editorMode === "new") {
              dispatch(addItem(editorData))
            }
            dispatch(refreshInventory())
          }}
        >
          {editorMode === "new" ? "Save" : "Update"}
        </Button>
        <Button
          icon="trash"
          disabled={editorMode !== "update"}
          onClick={() => {
            if (sel !== null) {
              dispatch(deleteItem(sel.id))
            }
            dispatch(refreshInventory())
          }}
        >
          Delete Selection
        </Button>
      </ButtonGroup>

      <h3>Editor Mode: {editorMode.toUpperCase()}</h3>

      <FormGroup disabled={status === "pending"}>
        <Label style={mb(5)}>
          Item Name
          <InputGroup
            value={editorData.name}
            disabled={status === "pending"}
            onChange={(e) => {
              dispatch(setEditorName(e.target.value))
            }}
          />
        </Label>
        <Label style={mb(5)}>
          Item Description
          <InputGroup
            disabled={status === "pending"}
            value={editorData.description}
            onChange={(e) => {
              dispatch(setEditorDesc(e.target.value))
            }}
          />
        </Label>
        <Label style={mb(5)}>
          Price
          <InputGroup
            type="number"
            disabled={status === "pending"}
            value={editorData.price + ""}
            onChange={(e) => {
              const price = parseFloat(e.target.value)
              dispatch(setEditorPrice(price))
            }}
          />
        </Label>
      </FormGroup>
    </div>
  )
}
