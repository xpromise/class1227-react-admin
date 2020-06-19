import React, { Component, Suspense } from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { Spin } from "antd";

import { defaultRoutes } from "@conf/routes";
import asyncComps from "@conf/asyncComps";
/*
  需求：根据 defaultRoutes && permissionList 来渲染动态路由
  注意：
    permissionList有哪些需要渲染成路由
      1. 有component属性需要渲染 Route
      2. 有redirect属性，值不是noredirect，需要渲染 Redirect
      3. 有children属性，子菜单也需要渲染
      4. 如果都没有就不要渲染~
    坑：如果redirect在上，那么就会一直命中redirect  
*/
class AuthorizedRouter extends Component {
  static propTypes = {
    permissionList: PropTypes.array.isRequired,
  };

  renderRoute = (menuList, parentPath = "") => {
    /*
      1. 有component属性需要渲染 Route
      2. 有redirect属性，值不是noredirect，需要渲染 Redirect
      3. 有children属性，子菜单也需要渲染
        子菜单的path！！！
      4. 如果都没有就不要渲染~
    */
    // menus是最终要返回的总routes
    // menu是当前遍历菜单
    return menuList.reduce((routes, menu) => {
      const { component, redirect, children, path } = menu;

      // 判断要不要渲染组件
      if (component) {
        const Component = asyncComps[component](); // 注意得调用，调用返回值才是懒加载组件
        routes.push(
          <Route
            key={path}
            path={parentPath + path}
            component={Component}
            exact
          />
        );
      }

      // 坑：如果redirect在上，那么就会一直命中redirect
      if (children && children.length) {
        routes = routes.concat(this.renderRoute(children, path));
      }

      // 判断是否有redirect
      if (redirect && redirect !== "noredirect") {
        routes.push(
          // 只写to，代表匹配任意路径，任意路径都会跳转
          // 问题：所有路径都会跳转
          // <Redirect key={path} to={} />
          // from to
          // 只有路径 是以from开头 情况下，才会自动跳转
          <Redirect key={path} from={path} to={redirect} />
        );
      }

      // 一定要return，下次遍历时就会拿到上一次得返回值接着去做~
      return routes;
    }, []);
  };

  render() {
    const { permissionList } = this.props;

    return (
      <Suspense fallback={<Spin size="large" />}>
        <Switch>
          {this.renderRoute(defaultRoutes)}
          {this.renderRoute(permissionList)}
        </Switch>
      </Suspense>
    );
  }
}

export default AuthorizedRouter;
