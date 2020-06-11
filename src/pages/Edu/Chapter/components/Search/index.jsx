import React, { useEffect } from "react";

import { Form, Select, Button } from "antd";
import { connect } from "react-redux";

import { getAllCourseList } from "../../redux";

import "./index.less";

const { Option } = Select;

function Search({ getAllCourseList, allCourseList }) {
  // Form组件提供hooks函数 useForm（只能在工厂函数组件使用，不能在ES6类组件使用）
  // 该函数作用就是提供一个form对象，让我们可以对表单进行各种操作
  const [form] = Form.useForm();

  const finish = () => {};

  const resetForm = () => {
    // form.resetFields(['title']) // 重置字段name的表单项
    form.resetFields(); // 重置所有表单项
  };

  useEffect(() => {
    getAllCourseList();
  }, [getAllCourseList]);

  return (
    <Form
      onFinish={finish}
      layout="inline"
      className="chapter-search"
      form={form}
    >
      <Form.Item
        label="选择课程"
        name="title"
        rules={[{ required: true, message: "请选择课程！" }]}
      >
        <Select placeholder="请选择课程" className="chapter-search-select">
          {allCourseList.map((course) => {
            return (
              <Option key={course._id} value={course._id}>
                {course.title}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询课程章节
        </Button>
        <Button className="subject-btn" onClick={resetForm}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

export default connect(
  (state) => ({ allCourseList: state.chapter.allCourseList }),
  {
    getAllCourseList,
  }
)(Search);
