import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./redux/store";

ReactDOM.render(
  // 负责给子组件传递store对象
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
