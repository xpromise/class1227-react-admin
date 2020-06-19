import React, { Component } from "react";
import { Layout, Breadcrumb } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { defaultRoutes } from "@conf/routes";
import SideMenu from "../SideMenu";
import AuthorizedRouter from "@comps/Authorized/AuthorizedRouter";
import logo from "@assets/images/logo.png";
import "./index.less";

const { Header, Content, Footer, Sider } = Layout;

@withRouter
@connect((state) => ({ user: state.user }))
class PrimaryLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  // 获取当前路由配置
  getCurrentRoute = (permissionList, pathname) => {
    for (let i = 0; i < permissionList.length; i++) {
      // 一级菜单
      const route = permissionList[i];
      // 找一级菜单
      if (route.path === pathname) {
        return {
          ...route,
          children: undefined, // 目的：为了通过children来区分是一级菜单还是二级菜单
        };
      }

      const { children } = route;
      // 找二级菜单
      if (children && children.length) {
        for (let j = 0; j < children.length; j++) {
          // 二级菜单
          const item = children[j];
          // 拼成二级菜单完整路径（父级菜单路径 + 子及菜单路径）
          const currentPath = route.path + item.path;

          if (currentPath === pathname) {
            return {
              // 一级菜单
              ...route,
              // 二级菜单
              children: item,
            };
          }
        }
      }
    }
  };

  render() {
    const { collapsed } = this.state;
    const {
      user,
      location: { pathname },
    } = this.props;

    // 先找私有静态路由（前端）
    let currentRoute = this.getCurrentRoute(defaultRoutes, pathname);
    if (!currentRoute) {
      // 再去找动态请求私有路由
      currentRoute = this.getCurrentRoute(user.permissionList, pathname);
    }

    return (
      <Layout className="layout">
        {/* 左侧导航 */}
        <Sider
          collapsible
          collapsed={collapsed}
          // 收缩/展开侧边栏的方法
          onCollapse={this.onCollapse}
        >
          <div className="layout-logo">
            <img src={logo} alt="logo" />
            {!collapsed && <h1>硅谷教育管理系统</h1>}
          </div>
          <SideMenu currentRoute={currentRoute} />
        </Sider>
        {/* 右边布局 */}
        <Layout>
          {/* 右边头部 */}
          <Header className="layout-header">
            <img src={user.avatar} alt="avatar" />
            <span>{user.name}</span>
            <GlobalOutlined />
          </Header>
          {/* 右边内容区 */}
          <Content>
            <div className="layout-nav">
              {/* 如果是二级菜单，不要面包屑导航 */}
              {currentRoute.children && (
                <Breadcrumb>
                  <Breadcrumb.Item>所有数据</Breadcrumb.Item>
                  {/* 一级菜单名称 */}
                  <Breadcrumb.Item>{currentRoute.name}</Breadcrumb.Item>
                  {/* 二级菜单名称 */}
                  <Breadcrumb.Item>
                    {currentRoute.children.name}
                  </Breadcrumb.Item>
                </Breadcrumb>
              )}
              {/* 下面内容都需要 */}
              <h3>
                {currentRoute.children
                  ? currentRoute.children.name
                  : currentRoute.name}
              </h3>
            </div>

            <div className="layout-content">
              <AuthorizedRouter permissionList={user.permissionList} />
            </div>
          </Content>
          {/* 右边底部 */}
          <Footer className="layout-footer">
            ©2020课程版权均归硅谷教育管理系统所有
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default PrimaryLayout;
