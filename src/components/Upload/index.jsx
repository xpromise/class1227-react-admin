import React, { Component } from "react";
import {
  Button,
  // as 重命名
  Upload as AntdUpload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as qiniu from "qiniu-js"; // 七牛上传SDK
import { nanoid } from "nanoid"; // 用来生成唯一id

import { reqGetUploadToken } from "@api/edu/upload";

const MAX_VIDEO_SIZE = 35 * 1024 * 1024; // 35mb

/*
  上传七牛云 SDK 文档: https://developer.qiniu.com/kodo/sdk/1283/javascript
  上传凭证：https://developer.qiniu.com/kodo/manual/1208/upload-token
*/

export default class Upload extends Component {
  constructor() {
    super();
    // 读取本地数据
    const data = localStorage.getItem("upload_token");
    // 初始化要更新状态
    const state = {
      uploadToken: "",
      expires: 0,
    };

    if (data) {
      const { uploadToken, expires } = JSON.parse(data);
      // 修改状态为本地的数据
      state.uploadToken = uploadToken;
      state.expires = expires;
    }
    // 状态的初始化
    this.state = state;
  }

  saveUploadToken = (uploadToken, expires) => {
    const data = {
      uploadToken,
      // 设置过期时间：当前时间 + 7200 * 1000 - 5 * 60 * 1000
      // 提前 5分钟 刷新
      expires: Date.now() + expires * 1000 - 5 * 60 * 1000,
    };

    this.setState(data);

    localStorage.setItem("upload_token", JSON.stringify(data));
  };

  /**
   * 上传之前触发的函数
   * @param {*} file 当前上传的文件
   * @param {*} fileList 上传的文件列表（包含之前上传和当前上传~）
   * @return {Boolean|Promise} 返回值false/reject就终止上传，其他情况就继续上传
   */
  beforeUpload = (file, fileList) => {
    /*
      在上传视频之前要做什么事？
        1. 限制上传视频文件大小~
    */
    return new Promise(async (resolve, reject) => {
      // console.log(file, fileList);
      if (file.size > MAX_VIDEO_SIZE) {
        message.warn("上传视频不能超过35mb");
        return reject(); // 终止上传
      }
      /*
        上传之前：
          检查凭证有无过期
          没有过期，就直接使用
          过期了，就重新发送请求读取使用，既要存在state，也要存在localStorage中
      */
      const { expires } = this.state;

      if (expires < Date.now()) {
        // 过期了，重新请求
        const { uploadToken, expires } = await reqGetUploadToken();
        this.saveUploadToken(uploadToken, expires);
      }

      // 文件大小OK
      resolve(file); // file就会作为要上传的文件，进行上传~
    });
  };

  // 自定义上传视频方案
  customRequest = ({ file }) => {
    /*
      yarn add qiniu-js

      上传凭据：
        特点：2小时有效 --> 缓存起来，2小时请求一次~
    */
    const key = nanoid(10); // 生成长度为10随机id，并且一定会保证id是唯一的
    const putExtra = {
      fname: "", // 文件原名称
      // params: {}, // 用来放置自定义变量
      mimeType: ["video/mp4"], // 用来限定上传文件类型
    };
    const config = {
      // 当前对象存储库位于区域（华东 华南 华北...）
      // qiniu.region.z0: 代表华东区域
      // qiniu.region.z1: 代表华北区域
      // qiniu.region.z2: 代表华南区域
      // qiniu.region.na0: 代表北美区域
      // qiniu.region.as0: 代表东南亚区域
      region: qiniu.region.z2,
    };
    // 1. 创建上传文件对象
    const observable = qiniu.upload(
      file, // 上传的文件
      key, // 上传的文件新命名（保证唯一性）
      this.state.uploadToken, // 上传凭证
      putExtra,
      config
    );
    // 2. 创建上传过程触发回调函数对象
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
    // 3. 开始上传
    const subscription = observable.subscribe(observer);

    // 上传取消
    // subscription.unsubscribe();
  };

  render() {
    return (
      <AntdUpload
        beforeUpload={this.beforeUpload}
        customRequest={this.customRequest}
      >
        <Button>
          <UploadOutlined /> 上传视频
        </Button>
      </AntdUpload>
    );
  }
}
