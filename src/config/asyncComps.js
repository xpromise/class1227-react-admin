/*
  将所有组件引入模块
*/
import { lazy } from "react";

// 路由懒加载~
const Login = () =>
  lazy(() =>
    /* 
    默认打包的模块名称使用id命名，id从0开始递增 
    webpackChunkName: "login" 给打包的模块取个名字
  */
    import(/* webpackChunkName: "login" */ "@pages/Login")
  );
const Oauth = () =>
  lazy(() =>
    import(/* webpackChunkName: "oauth" */ "@pages/Login/components/Oauth")
  );
const NotFound = () =>
  lazy(() => import(/* webpackChunkName: "404" */ "@pages/404"));

const Admin = () => lazy(() => import("@pages/Admin"));
const User = () => lazy(() => import("@pages/Acl/User"));
const AddOrUpdateUser = () =>
  lazy(() => import("@pages/Acl/User/components/AddOrUpdateUser"));
const AssignUser = () =>
  lazy(() => import("@pages/Acl/User/components/AssignUser"));
const Role = () => lazy(() => import("@pages/Acl/Role"));
const Permission = () => lazy(() => import("@pages/Acl/Permission"));
const AssignRole = () =>
  lazy(() => import("@pages/Acl/Role/components/AssignRole"));
const AddOrUpdateRole = () =>
  lazy(() => import("@pages/Acl/Role/components/AddOrUpdateRole"));
const Chapter = () => lazy(() => import("@pages/Edu/Chapter"));
const Comment = () => lazy(() => import("@pages/Edu/Comment"));
const Course = () => lazy(() => import("@pages/Edu/Course"));
const Subject = () => lazy(() => import("@pages/Edu/Subject"));
const AddSubject = () =>
  lazy(() => import("@pages/Edu/Subject/components/AddSubject"));
const AddLesson = () =>
  lazy(() => import("@pages/Edu/Chapter/components/AddLesson"));
const Teacher = () => lazy(() => import("@pages/Edu/Teacher"));
const Settings = () => lazy(() => import("@pages/User/Settings"));
const Center = () => lazy(() => import("@pages/User/Center"));

export default {
  Login,
  Oauth,
  NotFound,
  Admin,
  User,
  AddOrUpdateUser,
  AssignUser,
  Role,
  Permission,
  AssignRole,
  AddOrUpdateRole,
  Chapter,
  Comment,
  Course,
  Subject,
  Teacher,
  Settings,
  Center,
  AddSubject,
  AddLesson,
};
