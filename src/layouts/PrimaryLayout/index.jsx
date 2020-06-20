import React, { Component } from "react";
import { Layout, Breadcrumb, Menu, Dropdown, Button } from "antd";
import {
  GlobalOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { matchPath } from "react-router";
import { withRouter, Link } from "react-router-dom";

import { changeLanguageSync } from "@redux/actions/lang";
import { logout } from "@redux/actions/login";
import { resetUser } from "@comps/Authorized/redux";
import { defaultRoutes } from "@conf/routes";
import SideMenu from "../SideMenu";
import { AuthorizedRouter } from "@comps/Authorized";
import logo from "@assets/images/logo.png";

import "./index.less";

const { Header, Content, Footer, Sider } = Layout;

@withRouter
@connect((state) => ({ user: state.user, language: state.language }), {
  logout,
  resetUser,
  changeLanguageSync,
})
class PrimaryLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  // 登出
  logout = ({ key }) => {
    if (key !== "2") return;
    this.props.logout().then(() => {
      localStorage.removeItem("user_token");
      this.props.resetUser();
      this.props.history.replace("/login");
    });
  };
  // 选择语言
  clickLang = (lang) => {
    return () => {
      this.props.changeLanguageSync(lang);
    };
  };
  // 个人菜单
  menu = (
    <Menu style={{ width: 150 }} onClick={this.logout}>
      <Menu.Item key="0">
        <Link to="/account/list">
          <UserOutlined />
          个人中心
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/account/settings">
          <SettingOutlined />
          个人设置
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

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

          // 删除按钮是没有路径，不需要处理~
          // 过滤删除按钮
          if (!item.path) continue;

          // 拼成二级菜单完整路径（父级菜单路径 + 子及菜单路径）
          const currentPath = route.path + item.path;

          const currentRoute = {
            ...item,
            path: currentPath,
          };
          /*
            currentPath acl/user/update/:id
            pathname /acl/user/update/5ee9af3b08cbda2ab083f906
          */
          // matchPath(当前路由路径, 路由配置对象) 返回值是布尔值
          // 代表当前路由路径有没有匹配上路由~
          const match = matchPath(pathname, currentRoute);

          if (match) {
            return {
              // 一级菜单
              ...route,
              // 二级菜单
              children: currentRoute,
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

    const langMenu = (
      <Menu
        // selectedKeys={[this.props.language]}
        selectable // Dropdown 下的 Menu 默认不可选中。如果需要菜单可选中，可以指定 <Menu selectable>
      >
        <Menu.Item key="zh">
          <Button
            style={this.props.language === "zh" ? { color: "red" } : {}}
            type="link"
            onClick={this.clickLang("zh")}
          >
            中文
          </Button>
        </Menu.Item>
        <Menu.Item key="en">
          <Button
            type="link"
            onClick={this.clickLang("en")}
            style={this.props.language === "en" ? { color: "red" } : {}}
          >
            English
          </Button>
        </Menu.Item>
      </Menu>
    );

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

            <Dropdown overlay={this.menu}>
              <span>{user.name}</span>
            </Dropdown>

            <span className="layout-header-lang">
              <Dropdown overlay={langMenu}>
                <GlobalOutlined />
              </Dropdown>
            </span>
          </Header>
          {/* 右边内容区 */}
          <Content>
            <div className="layout-nav">
              {/* 如果是二级菜单，不要面包屑导航 */}
              {currentRoute.children && (
                <Breadcrumb>
                  <Breadcrumb.Item>首页</Breadcrumb.Item>
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
