import { GET_USER_INFO, GET_MENU, RESET_USER } from "./constants";

const initUser = {
  name: "", // 用户名
  avatar: "", // 头像
  permissionValueList: [], // 按钮权限列表

  permissionList: [], // 路由权限列表
};

export default function user(prevState = initUser, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...prevState, // 展开之前的数据
        // permissionList: prevState.permissionList,
        ...action.data,
      };
    case GET_MENU:
      return {
        ...prevState,
        permissionList: action.data,
      };
    case RESET_USER:
      return initUser;
    default:
      return prevState;
  }
}
