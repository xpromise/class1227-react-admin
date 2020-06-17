import React, { Component } from "react";
import { connect } from "react-redux";

import Loading from "../Loading";
import { getAccessRoutes, getUserInfo } from "./redux";
import { updateLoading } from "@redux/actions/loading";

@connect(
  (state) => ({
    user: state.user,
    loading: state.loading,
  }),
  { getAccessRoutes, getUserInfo, updateLoading }
)
class Authorized extends Component {
  componentDidMount() {
    // 发送请求，请求roles和permissionList
    const {
      user: { roles, permissionList },
      getUserInfo,
      getAccessRoutes,
      updateLoading,
    } = this.props;

    const promises = [];

    if (!roles.length) {
      // 请求用户数据
      promises.push(getUserInfo());
    }

    if (!permissionList.length) {
      // 请求权限数据
      promises.push(getAccessRoutes());
    }

    Promise.all(promises).finally(() => {
      // 更新 loading 为false
      // 一旦 loading 为fasle，就会加载 PrimaryLayout
      updateLoading(false);
    });
  }

  render() {
    const {
      user: { permissionList },
      render,
    } = this.props;

    return (
      <Loading>
        {
          // render方法调用的返回值就是 PrimaryLayout
          // 一上来loading是true，不会渲染~
          render(permissionList)
        }
      </Loading>
    );
  }
}

export default Authorized;
