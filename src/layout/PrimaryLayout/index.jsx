import React, { Component } from "react";
import { Layout, Breadcrumb } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

import SideMenu from "../SideMenu";
import logo from "@assets/images/logo.png";
import "./index.less";

const { Header, Content, Footer, Sider } = Layout;

class PrimaryLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
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
          <SideMenu />
        </Sider>
        {/* 右边布局 */}
        <Layout>
          {/* 右边头部 */}
          <Header className="layout-header">
            <img src={logo} alt="avatar" />
            <span>admin</span>
            <GlobalOutlined />
          </Header>
          {/* 右边内容区 */}
          <Content>
            <div className="layout-nav">
              <Breadcrumb>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <h3>User</h3>
            </div>

            <div className="layout-content">Bill is a cat.</div>
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
