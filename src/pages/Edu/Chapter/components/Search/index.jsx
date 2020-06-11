import React from "react";

import { Form, Select, Button } from "antd";

import "./index.less";

const { Option } = Select;

export default function Search() {
  const finish = () => {};

  return (
    <Form onFinish={finish} layout="inline" className="chapter-search">
      <Form.Item
        label="选择课程"
        name="title"
        rules={[{ required: true, message: "请选择课程分类！" }]}
      >
        <Select placeholder="请选择课程分类" className="chapter-search-select">
          <Option key="1" value="1">
            1
          </Option>
          <Option key="2" value="2">
            2
          </Option>
          <Option key="3" value="3">
            3
          </Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询课程章节
        </Button>
        <Button className="subject-btn">重置</Button>
      </Form.Item>
    </Form>
  );
}
