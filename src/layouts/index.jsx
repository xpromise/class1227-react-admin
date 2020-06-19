import React, { Component } from "react";
import { connect } from "react-redux";

import PrimaryLayout from "./PrimaryLayout";
import { Authorized } from "@comps/Authorized";
import PublicLayout from "./PublicLayout";

@connect((state) => ({ token: state.token }))
class Layout extends Component {
  render() {
    // 看是否登录 --> 看是否有token --> redux中看看
    const { token } = this.props;

    return token ? (
      // 即要渲染子组件，也要传递属性数据
      // 内部使用 this.props.render(routes)  render props
      // <Authorized render={(routes) => <PrimaryLayout routes={routes}/>} />
      // 只需要渲染子组件
      <Authorized>
        <PrimaryLayout />
      </Authorized>
    ) : (
      <PublicLayout />
    );
  }
}

export default Layout;
