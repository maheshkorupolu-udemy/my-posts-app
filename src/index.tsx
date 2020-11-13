import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import "react-toastify/dist/ReactToastify.min.css";
import "react-widgets/dist/css/react-widgets.css";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import * as serviceWorker from "./serviceWorker";
import ScrollToTop from "./app/layout/ScrollToTop";
import { StoreProvider } from "./app/stores/helpers/storeContext";
import { createStore } from "./app/stores/helpers/createStore";

export const history = createBrowserHistory();

const rootStore = createStore();

ReactDOM.render(
  <Router history={history}>
    <ScrollToTop>
      <StoreProvider value={rootStore}>
        <App></App>
      </StoreProvider>
    </ScrollToTop>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
