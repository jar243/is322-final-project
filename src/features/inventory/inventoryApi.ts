const API_URL = "http://localhost:3030/inventory"

export interface InventoryItem {
  id: number
  name: string
  description: string
  price: number
}

export interface NewInventoryItem {
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

export async function addInventory(item: NewInventoryItem) {
  fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(item),
  })
}

export async function updateInventory(item: InventoryItem) {
  const url = [API_URL, item.id].join("/")
  fetch(url, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((res) => res.json())
    .then((res) => res as InventoryItem)
}

export async function deleteInventory(id: number) {
  const url = [API_URL, id].join("/")
  fetch(url, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  })
}
