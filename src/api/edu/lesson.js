import request from "@utils/request";

// 模块请求公共前缀
const BASE_URL = "/admin/edu/lesson";

// 获取所有课程数据
export function reqGetLessonList(chapterId) {
  return request({
    url: `${BASE_URL}/get/${chapterId}`,
    method: "GET",
  });
}

// 新增课时
export function reqAddLesson({ chapterId, title, free, video }) {
  return request({
    url: `${BASE_URL}/save`,
    method: "POST",
    data: {
      chapterId,
      title,
      free,
      video,
    },
  });
}
