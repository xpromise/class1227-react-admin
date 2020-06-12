import {
  GET_ALL_COURSE_LIST,
  GET_CHAPTER_LIST,
  GET_LESSON_LIST,
} from "./constants";

const initChapter = {
  allCourseList: [],
  chapters: {
    total: 0,
    items: [],
  },
};

export default function chapter(prevState = initChapter, action) {
  switch (action.type) {
    case GET_ALL_COURSE_LIST:
      return {
        ...prevState,
        allCourseList: action.data,
      };
    case GET_CHAPTER_LIST:
      return {
        ...prevState,
        chapters: {
          total: action.data.total,
          items: action.data.items.map((chapter) => {
            return {
              ...chapter,
              children: [], // 才可以展开~
            };
          }),
        },
      };
    case GET_LESSON_LIST:
      return {
        ...prevState,
        chapters: {
          total: prevState.chapters.total,
          items: prevState.chapters.items.map((chapter) => {
            // 找到要更新章节数据并更新
            if (chapter._id === action.data.chapterId) {
              return {
                ...chapter,
                children: action.data.lessons,
              };
            }
            return chapter;
          }),
        },
      };
    default:
      return prevState;
  }
}
