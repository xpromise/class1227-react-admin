import request from "@utils/request";

// 获取七牛上传凭证
export function reqGetUploadToken() {
  return request({
    url: `/uploadtoken`,
    method: "GET",
  });
}
