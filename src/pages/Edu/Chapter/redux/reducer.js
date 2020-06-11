import { GET_ALL_COURSE_LIST } from "./constants";

const initChapter = {
  allCourseList: [],
};

export default function chapter(prevState = initChapter, action) {
  switch (action.type) {
    case GET_ALL_COURSE_LIST:
      return {
        ...initChapter,
        allCourseList: action.data,
      };
    default:
      return prevState;
  }
}
