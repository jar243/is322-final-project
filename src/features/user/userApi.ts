const API_URL = "http://localhost:3030/users"

interface UserData {
  id: number
  username: string
  password: string
}

export async function attemptLogin(
  username: string,
  password: string
): Promise<boolean> {
  const url = [API_URL, "?username=", username, "&password=", password].join("")
  return fetch(url, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => res as Array<UserData>)
    .then((res) => res.length > 0)
}
