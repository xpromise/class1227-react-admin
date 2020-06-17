import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import Layout from "./layout";

// 引入公共样式
import "./assets/css/reset.css";
import "./assets/css/common.less";

export default class App extends Component {
  render() {
    return (
      // 负责给子组件传递路由组件三大属性
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
  }
}
