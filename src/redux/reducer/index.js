import { combineReducers } from "redux";

import loading from "./loading";
import token from "./login";
import language from "./lang";

import { user } from "@comps/Authorized/redux";
import { userList } from "@pages/Acl/User/redux";
import { roleList } from "@pages/Acl/Role/redux";
import { menuList } from "@pages/Acl/Permission/redux";
// @xiongjian Subject模块的状态数据
import { subjectList } from "@pages/Edu/Subject/redux";
import { chapter } from "@pages/Edu/Chapter/redux";
import { courseList } from "@pages/Edu/Course/redux";

export default combineReducers({
  loading,
  user,
  token,
  language,
  userList,
  roleList,
  menuList,
  subjectList,
  chapter,
  courseList,
});
