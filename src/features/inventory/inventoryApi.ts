const API_URL = "http://localhost:3030/inventory"

export interface InventoryItem {
  id: number
  name: string
  description: string
  price: number
}

export async function getInventory(): Promise<Array<InventoryItem>> {
  return fetch(API_URL, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res as Array<InventoryItem>)
}
