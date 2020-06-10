/*
  根据之前状态和action来生成新状态
*/
import { GET_SUBJECT_LIST } from "./constants";

// 初始化数据
const initSubjectList = {
  total: 0, // 总数
  items: [] // 课程分类列表数据
};

export default function subjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST: // 获取课程分类数据
      return action.data;
    default:
      return prevState;
  }
}
