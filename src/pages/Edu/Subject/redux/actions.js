/*
  同步action 返回值是action对象
  异步action 返回值是函数，函数接受dispatch作为参数，内部执行异步代码

  1. 当前redux管理什么状态数据？课程分类数据
  2. 对状态数据有哪些操作？
    读取（获取数据）
*/
// 引入请求api
import {
  reqGetSubjectList,
  reqGetSubSubjectList,
  reqUpdateSubject,
} from "@api/edu/subject";
// 引入常量
import {
  GET_SUBJECT_LIST,
  GET_SUB_SUBJECT_LIST,
  UPDATE_SUBJECT,
} from "./constants";

/*
  获取一级课程分类数据
*/
const getSubjectListSync = (subjectList) => ({
  type: GET_SUBJECT_LIST,
  data: subjectList,
});

export const getSubjectList = (page, limit) => {
  // 外面使用异步action时，异步action返回值是最里面函数的返回值
  return (dispatch) => {
    // 执行异步代码 --> 发送请求获取课程分类管理数据
    // return reqGetMenuList(page, limit) --> return有什么作用
    // return为了让外面能有返回值，从而根据返回值判断请求成功/失败
    return reqGetSubjectList(page, limit).then((response) => {
      // 更新redux状态数据
      dispatch(getSubjectListSync(response));
      // 让请求成功时，返回一个请求成功的数据
      return response.items;
    });

    // 以下写法外面使用时，没有返回值
    // reqGetSubjectList(page, limit).then((response) => {
    //   // 更新redux状态数据
    //   dispatch(getSubjectListSync(response));
    // });
  };
};

/*
  获取二级课程分类数据
*/
const getSubSubjectListSync = (data) => ({
  type: GET_SUB_SUBJECT_LIST,
  data,
});

export const getSubSubjectList = (parentId) => {
  return (dispatch) => {
    return reqGetSubSubjectList(parentId).then((response) => {
      dispatch(
        getSubSubjectListSync({ parentId, subSubjectList: response.items })
      );
      return response;
    });
  };
};

/*
  更新课程分类数据
*/
const updateSubjectSync = (subject) => ({
  type: UPDATE_SUBJECT,
  data: subject,
});

export const updateSubject = (title, id) => {
  return (dispatch) => {
    return reqUpdateSubject(title, id).then((response) => {
      const subject = { title, _id: id };
      dispatch(updateSubjectSync(subject));
      return subject;
    });
  };
};
