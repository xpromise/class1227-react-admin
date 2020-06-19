import React, { Component } from "react";
import { Menu } from "antd";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import icons from "@conf/icons";

import { defaultRoutes } from "@conf/routes";

const { SubMenu } = Menu;

/*
  [
    {
    "path": "/acl",       路径
    "component": "",      组件
    "name": "权限管理",    名称
    "icon": "lock",       图标
    "redirect": "/acl/user/list", 重定向地址
    "hidden": false,     侧边栏是否隐藏（不隐藏）
    "children": [  子菜单
        {
            "path": "/user/list", 子菜单访问路径 = 父级菜单.path + 子菜单.path
            "component": "User",
            "name": "用户管理",
            "icon": "",
            "redirect": "noredirect",
            "hidden": false   侧边栏是否隐藏（不隐藏）
        },
        {
            "path": "/user/add",
            "component": "AddOrUpdateUser",
            "name": "添加",
            "icon": "",
            "redirect": "noredirect",
            "hidden": true  侧边栏是否隐藏（隐藏）：侧边栏是不会显示按钮，所以按钮要隐藏
        },
        {
            "path": "/user/update/:id",
            "component": "AddOrUpdateUser",
            "name": "修改",
            "icon": "",
            "redirect": "noredirect",
            "hidden": true
        },
        {
            "path": "",    // 没有组件和路径的，需要过滤。不需要显示
            "component": "",
            "name": "删除",
            "icon": "",
            "redirect": "noredirect",
            "hidden": true
        },
      }
    }
  ]
*/

@connect((state) => ({
  permissionList: state.user.permissionList,
}))
class SideMenu extends Component {
  renderMenu = (menuList, parentPath = "") => {
    return menuList.map((menu) => {
      /*
        1. 一级菜单 还是 二级菜单
          一级菜单 <Menu.Item />
          二级菜单 <SubMenu />
          判断一级/二级菜单：children
        
        2. 菜单有可能要过滤  
          if (hidden) return null;
      
        3. 菜单：常量菜单 和 后台请求的异步菜单

        4. 子菜单路径：父级菜单路径 + 子菜单路径
      */
      const { children, icon, path, name, hidden } = menu;

      // 过滤不需要显示 子菜单（按钮）
      if (hidden) return null;

      // 获取图标组件
      const Icon = icons[icon];

      if (children && children.length) {
        // 说明是二级菜单
        return (
          <SubMenu key={path} icon={<Icon />} title={name}>
            {/* {children.map((cMenu) => {
              // 过滤不需要显示 子菜单（按钮）
              if (cMenu.hidden) return null;
              return <Menu.Item key={cMenu.path}>{cMenu.name}</Menu.Item>;
            })} */}
            {this.renderMenu(children, path)}
          </SubMenu>
        );
      } else {
        // 一级菜单
        const currentPath = parentPath + path; // 父级菜单路径 + 子菜单路径
        return (
          <Menu.Item key={currentPath} icon={Icon ? <Icon /> : null}>
            <Link to={currentPath}>{name}</Link>
          </Menu.Item>
        );
      }
    });
  };

  render() {
    const { permissionList } = this.props;

    return (
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        {/* 私有路由：默认可以访问的首页 */}
        {this.renderMenu(defaultRoutes)}
        {/* 私有路由：通过后台数据动态生成 */}
        {this.renderMenu(permissionList)}
      </Menu>
    );
  }
}

export default SideMenu;
