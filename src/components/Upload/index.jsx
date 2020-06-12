import React, { Component } from "react";
import {
  Button,
  // as 重命名
  Upload as AntdUpload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const MAX_VIDEO_SIZE = 35 * 1024 * 1024; // 35mb

export default class Upload extends Component {
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
    return new Promise((resolve, reject) => {
      // console.log(file, fileList);
      if (file.size > MAX_VIDEO_SIZE) {
        message.warn("上传视频不能超过35mb");
        return reject(); // 终止上传
      }
      // 文件大小OK
      resolve(file); // file就会作为要上传的文件，进行上传~
    });
  };

  // 自定义上传视频方案
  customRequest = () => {
    
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
