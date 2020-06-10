/*
  汇总当前redux的所有内容~让外面使用更加简单
*/
import subjectList from "./reducer";

import { getSubjectList } from "./actions";

export { 
  subjectList, // 状态数据
  getSubjectList // 更新状态数据的方法 
}; 
