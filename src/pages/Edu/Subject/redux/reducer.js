/*
  根据之前状态和action来生成新状态
*/
import {
  GET_SUBJECT_LIST,
  GET_SUB_SUBJECT_LIST,
  UPDATE_SUBJECT,
} from "./constants";

// 初始化数据
const initSubjectList = {
  total: 0, // 总数
  items: [], // 课程分类列表数据
};

export default function subjectList(prevState = initSubjectList, action) {
  switch (action.type) {
    case GET_SUBJECT_LIST: // 获取一级课程分类数据
      return {
        total: action.data.total,
        items: action.data.items.map((subject) => {
          return {
            ...subject,
            children: [], // 添加children属性，当前项就是可展开项，才会显示展开图标
          };
        }),
      };
    case GET_SUB_SUBJECT_LIST: // 获取二级课程分类数据
      // 将二级分类数据添加到某个一级分类数据children上~
      const { parentId, subSubjectList } = action.data;
      return {
        total: prevState.total,
        items: prevState.items.map((subject) => {
          if (subject._id === parentId) {
            subject.children = subSubjectList;
          }
          return subject;
        }),
      };
    case UPDATE_SUBJECT:
      return {
        total: prevState.total,
        items: prevState.items.map((subject) => {
          // 一级分类
          if (subject._id === action.data._id) {
            return {
              ...subject, // 展开原数据
              ...action.data, // 展开新数据 --> 新数据会覆盖原数据
            };
          }
          
          // 二级分类
          subject.children = subject.children.map((item) => {
            if (item._id === action.data._id) {
              return {
                ...item, // 展开原数据
                ...action.data, // 展开新数据 --> 新数据会覆盖原数据
              };
            }
            return item;
          });

          return subject;
        }),
      };
    default:
      return prevState;
  }
}
