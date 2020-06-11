import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Select, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getSubjectList } from "../../redux";
import { reqAddSubject } from "@api/edu/subject";
/*
  添加组件流程：
    1. 创建组件
    2. 在config/asyncComps暴露出去（未来才能加载使用~）
    3. 配置权限（在页面菜单管理 / 课程分类管理 添加相应的权限）
    4. 在角色管理 / admin 添加相应的权限 
    最终才可以访问~
*/
import "./index.less";

const { Option } = Select;
// 页数
let page = 1;

function AddSubject({ total, getSubjectList, history }) {
  // 使用state
  // [状态数据, 更新状态数据方法]
  const [subjects, setSubjects] = useState([]);

  // 表单校验成功：
  const onFinish = async (values) => {
    console.log(values); // 收集到的表单数据
    const { title, parentId } = values;
    await reqAddSubject(title, parentId);
    // 提示添加数据成功~
    message.success("添加课程分类数据成功~");
    // 跳回数据列表页面查看数据
    history.push("/edu/subject/list");
  };
  // 表单校验失败:
  // const onFinishFailed = () => {};

  // 工厂函数组件：发送请求请求数据
  useEffect(() => {
    page = 1; // 每次第一次进来访问当前组件，重置为1
    const fetchData = async () => {
      // 第二个参数传入空数组，代表当前函数只会执行一次
      // 相对一ComponentDidMount
      const items = await getSubjectList(page++, 10);
      // 更新状态
      setSubjects(items);
    };
    fetchData();
  }, [getSubjectList]);

  // 表单的布局属性
  const layout = {
    labelCol: { span: 2 }, // label文字所占宽度比例
    wrapperCol: { span: 5 }, // 右边Input所占宽度比例
  };

  // 点击加载更多数据
  const loadMore = async () => {
    const items = await getSubjectList(page++, 10);
    // 更新一份全新数据~
    setSubjects([...subjects, ...items]);
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
        // name="basic"
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="课程分类名称" // 左侧文字
          name="title" // 指定当前表单项将来收集数据的key属性
          rules={[{ required: true, message: "请输入课程分类名称~" }]} // 校验规则
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="父级分类"
          name="parentId"
          rules={[{ required: true, message: "请选择父级分类" }]}
        >
          <Select
            // 在列表的最后添加额外元素
            dropdownRender={(menu) => (
              <div>
                {menu}
                {/* 判断总长度是否小于等于最新数据的长度，如果满足条件，说明数据已经全部请求回来了~ */}
                {total <= subjects.length ? (
                  "没有更多数据了~"
                ) : (
                  <Button type="link" onClick={loadMore}>
                    加载更多数据~
                  </Button>
                )}
              </div>
            )}
          >
            <Option key={0} value="0">
              一级分类
            </Option>
            {subjects.map((subject, index) => {
              return (
                <Option key={index + 1} value={subject._id}>
                  {subject.title}
                </Option>
              );
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

export default connect((state) => ({ total: state.subjectList.total }), {
  getSubjectList,
})(AddSubject);
