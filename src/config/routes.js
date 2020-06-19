/*
  路由表配置文件
*/
// 公开路由表
const constantRoutes = [
  {
    name: "登录",
    path: "/login",
    component: "Login",
  },
  {
    name: "授权登录",
    path: "/oauth",
    component: "Oauth",
  },
  {
    name: "404",
    path: "*",
    component: "NotFound",
  },
];

// 私有路由表
const defaultRoutes = [
  {
    // 只要登录过就能访问首页
    name: "首页",
    path: "/",
    icon: "home",
    component: "Admin",
  },
];

export { constantRoutes, defaultRoutes };
