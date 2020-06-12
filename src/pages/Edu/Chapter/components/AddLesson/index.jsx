import React from "react";

import { Card, PageHeader, Form, Button, Input, Switch } from "antd";

import Upload from "@comps/Upload";

import "./index.less";

// 表单的布局属性
const layout = {
  labelCol: { span: 2 }, // label文字所占宽度比例
  wrapperCol: { span: 5 }, // 右边Input所占宽度比例
};

export default function AddLesson() {
  const onFinish = () => {};
  const onBack = () => {};

  return (
    <Card
      title={
        <PageHeader
          className="add-lesson-header"
          onBack={onBack}
          title="新增课时"
          // subTitle="This is a subtitle"
        />
      }
    >
      <Form {...layout} onFinish={onFinish}>
        <Form.Item
          label="课时名称"
          name="title"
          rules={[{ required: true, message: "请输入课时名称~" }]} // 校验规则
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="是否免费"
          name="free"
          // rules={[{ required: true, message: "请选择父级分类" }]}
          // Form表单默认会接管组件value属性
          // 但是Switch组件不要value，需要的是checked
          valuePropName="checked"
        >
          <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
        </Form.Item>

        <div className="upload">
          <Upload />
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="add-lesson-btn">
            添加
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
