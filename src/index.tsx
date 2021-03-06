import React from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"
import "./index.css"
import App from "./App"
import { store } from "./app/store"
import { Provider } from "react-redux"
import * as serviceWorker from "./serviceWorker"

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
)

serviceWorker.unregister()
