import { reqGetAllCourseList } from "@api/edu/course";
import { reqGetChapterList } from "@api/edu/chapter";
import { reqGetLessonList } from "@api/edu/lesson";

import {
  GET_ALL_COURSE_LIST,
  GET_CHAPTER_LIST,
  GET_LESSON_LIST,
} from "./constants";
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

/*
  请求课程对应章节数据
*/
const getChapterListSync = (chapters) => ({
  type: GET_CHAPTER_LIST,
  data: chapters,
});

export const getChapterList = ({ page, limit, courseId }) => {
  return (dispatch) => {
    return reqGetChapterList({ page, limit, courseId }).then((response) => {
      dispatch(getChapterListSync(response));
      return response;
    });
  };
};

/*
  请求章节对应课时数据
*/
const getLessonListSync = (data) => ({
  type: GET_LESSON_LIST,
  data,
});

export const getLessonList = (chapterId) => {
  return (dispatch) => {
    return reqGetLessonList(chapterId).then((response) => {
      dispatch(getLessonListSync({ chapterId, lessons: response }));
      return response;
    });
  };
};
