/*
  同步action 返回值是action对象
  异步action 返回值是函数，函数接受dispatch作为参数，内部执行异步代码

  1. 当前redux管理什么状态数据？课程分类数据
  2. 对状态数据有哪些操作？
    读取（获取数据）
*/
// 引入请求api
import { reqGetSubjectList } from "@api/edu/subject";
// 引入常量
import { GET_SUBJECT_LIST } from "./constants";

/*
  获取课程分类数据
*/
const getSubjectListSync = (subjectList) => ({
  type: GET_SUBJECT_LIST,
  data: subjectList,
});

export const getSubjectList = (page, limit) => {
  return (dispatch) => {
    // 执行异步代码 --> 发送请求获取课程分类管理数据
    // return reqGetMenuList(page, limit) --> return有什么作用
    return reqGetSubjectList(page, limit).then((response) => {
      // 更新redux状态数据
      dispatch(getSubjectListSync(response));
      return response;
    });
  };
};
