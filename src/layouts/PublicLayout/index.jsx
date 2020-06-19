import React, { Component, Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import { constantRoutes } from "@conf/routes";
import asyncComps from "@conf/asyncComps";

// loading组件
const Loading = <div>loading...</div>;

/*
  开发中：所有路由组件都要使用懒加载~
    1. 懒加载？
      不是一上来就加在，而是需要时加载（当访问指定路由路径时，才会加载指定路由组件）
      
      内部做了：
        代码分割：
          正常情况下，所有代码会打包到一个JS文件中，这个文件很大~
          将一个大JS文件，拆分成多个小的JS文件，这样就可以并行（同时）加载JS文件
          如果某个JS文件还用不上，可以先不加载

        webpack功能，当你对路由进行懒加载，webpack会把这个路由组件单独打包成一个JS文件
        并且只有你需要使用时，页面才会加载，一上来页面不会加载~  

    2. 如何做？
      import React, {Suspense,lazy} from 'react'
      
      import Login from './Login'
      const Oauth = lazy(() => import('./Oauth'));

      // 加载组件需要时间，所以加载时会显示 fallback 的loading，加载完成就自动显示组件内容
      <Suspense fallback={loading...}>
        <Login /> // 没有懒加载
        <Oauth /> // 就有懒加载~ 内部会代码分割，并且需要时才加载
      </Suspense>
  
*/
export default class PublicLayout extends Component {
  renderRoutes = (routes) => {
    return routes.map((route) => {
      // Route组件：根据path的变化，自动加载相应的组件
      return (
        <Route
          key={route.path}
          path={route.path} // 路由路径
          component={asyncComps[route.component]()} // 路由加载的组件
          exact // 严格匹配（路径必须一模一样）
        />
      );
    });
  };

  render() {
    // 渲染路由表
    // Switch作用：确保其中的路由组件只有一个能够加载~ 不要同时加载多个
    return (
      <Suspense fallback={Loading}>
        <Switch>{this.renderRoutes(constantRoutes)}</Switch>
      </Suspense>
    );
  }
}
