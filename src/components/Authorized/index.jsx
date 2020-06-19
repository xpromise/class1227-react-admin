import React, { Component } from "react";
import { connect } from "react-redux";

import { getMenu, getUserinfo } from "./redux";

import PrimaryLayout from "../../layout/PrimaryLayout";
import Loading from "../Loading";

@connect(null, { getMenu, getUserinfo })
/*
  请求用户数据+权限数据
*/
class Authorized extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    // 请求用户数据+权限数据
    const { getMenu, getUserinfo } = this.props;

    // 数据请求中显示loading，数据全部请求回来，显示PrimaryLayout组件
    const promises = [getMenu(), getUserinfo()];

    Promise.all(promises).then(() => {
      // 数据全部请求回来了~
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    const { isLoading } = this.state;

    return isLoading ? <Loading /> : <PrimaryLayout />;
  }
}

export default Authorized;
