import { reqGetCourseList } from "@api/edu/course";
import { GET_COURSE_LIST } from "./contants";

// 获取课程分页列表数据
const getCourseListSync = (courseList) => ({
  type: GET_COURSE_LIST,
  data: courseList,
});

export const getCourseList = ({
  page,
  limit,
  teacherId,
  subjectId,
  subjectParentId,
  title,
  sortBy,
  sort,
}) => {
  return (dispatch) => {
    return reqGetCourseList({
      page,
      limit,
      teacherId,
      subjectId,
      subjectParentId,
      title,
      sortBy,
      sort,
    }).then((response) => {
      dispatch(getCourseListSync(response));
      return response;
    });
  };
};
