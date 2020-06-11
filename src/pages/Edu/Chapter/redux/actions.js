import { reqGetAllCourseList } from "@api/edu/course";
import { GET_ALL_COURSE_LIST } from "./constants";
/*
  请求所有课程数据
*/
const getAllCourseListSync = (courseList) => ({
  type: GET_ALL_COURSE_LIST,
  data: courseList,
});

export const getAllCourseList = () => {
  return (dispatch) => {
    return reqGetAllCourseList().then((response) => {
      dispatch(getAllCourseListSync(response));
      return response;
    });
  };
};
