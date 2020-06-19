import React, { Component } from "react";
import { Spin } from "antd";
import logo from "@assets/images/logo.png";

import "./index.less";

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="loading-header">
          <img src={logo} alt="logo" />
          <h3>硅谷教育管理系统</h3>
        </div>
        <div className="loading-text">百万谷粉全力推荐~</div>
        <Spin size="large" />
      </div>
    );
  }
}
