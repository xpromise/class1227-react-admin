import request from "@utils/request";

// 模块请求公共前缀
const BASE_URL = "/admin/edu/course";

// 获取所有课程数据
export function reqGetAllCourseList() {
  return request({
    url: `${BASE_URL}`,
    method: "GET",
  });
}
