import React, { useEffect } from "react";
import { Card, Form, Input, Button, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getSubjectList } from "../../redux";
/*
  添加组件流程：
    1. 创建组件
    2. 在config/aysncComps暴露出去（未来才能加载使用~）
    3. 配置权限（在页面菜单管理 / 课程分类管理 添加相应的权限）
    4. 在角色管理 / admin 添加相应的权限 
    最终才可以访问~
*/
import "./index.less";

const { Option } = Select;

function AddSubject({ subjectList, getSubjectList }) {
  // 表单校验成功：
  const onFinish = () => {};
  // 表单校验失败:
  const onFinishFailed = () => {};

  // 工厂函数组件：发送请求请求数据
  useEffect(() => {
    // 第二个参数传入空数组，代表当前函数只会执行一次
    // 相对一ComponentDidMount
    getSubjectList(1, 10);
  }, []);

  // 表单的布局属性
  const layout = {
    labelCol: { span: 2 }, // label文字所占宽度比例
    wrapperCol: { span: 5 }, // 右边Input所占宽度比例
  };

  return (
    <Card
      title={
        <>
          <Link to="/edu/subject/list">
            <ArrowLeftOutlined />
          </Link>
          <span className="title">添加课程分类</span>
        </>
      }
    >
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="课程分类名称"
          name="title"
          rules={[{ required: true, message: "请输入课程分类名称~" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="父级分类"
          name="parentId"
          rules={[{ required: true, message: "请选择父级分类" }]}
        >
          <Select>
            <Option value="0">一级分类</Option>
            {subjectList.items.map((subject) => {
              return <Option value={subject._id}>{subject.title}</Option>;
            })}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default connect((state) => ({ subjectList: state.subjectList }), {
  getSubjectList,
})(AddSubject);
