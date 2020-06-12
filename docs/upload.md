# 上传视频

1. antd Upload 组件

- beforeUpload
- customRequest

2. beforeUpload 在上传之前触发的函数

- 限制上传文件大小 file.size > MAX_VIDEO_SIZE
- 获取有效的上传凭证 uploadToken
  - 特点：有效期 2 小时
  - 总结
    - 第一次请求 uploadToken 并保存起来（state 和 localStorage）
    - 后面请求判断 uploadToken 是否过期，直接使用
      - 过期时间由于网络延迟，所以要提前 5 分钟刷新
    - 过期了就得重新请求并保存起来（state 和 localStorage）
  - 整理
    - getUploadToken 从本地读取 UploadToken
    - fetchUploadToken 从服务器请求 token
    - isValidUploadToken 判断 uploadToken 是否有效
    - saveUploadToken 保存 uploadToken

3. customRequest 自定义请求

- 创建上传文件对象
  - `const observable = qiniu.upload(file, key, token, putExtra, config)`
- 创建上传过程触发回调函数对象
  ```
   const observer = {
     next(res) {
       // 上传过程中触发的回调函数
     },
     error(err) {
       // 上传失败触发的回调函数
     },
     complete(res) {
       // 上传成功（全部数据上传完毕）触发的回调函数
     },
   };
  ```
- 开始上传

  - `this.subscription = observable.subscribe(observer);`

- 将来可能要取消上传
  - `this.subscription.unsubscribe();`

## 如何修改将上传视频切换到自己的七牛云呢？

- 客户端
  - 修改 config/qiniu.js
    - region
    - prefix_url
- 服务端
  - 修改 config/index.js
  - ACCESSKEY 七牛云/个人中心/密钥管理
  - SERECTKEY 七牛云/个人中心/密钥管理
  - BUCKET 对象存储空间的名称
