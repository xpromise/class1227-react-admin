import React, { useState, useEffect } from "react";
import { Form, Input, Select, Cascader, Button, message } from "antd";
import { connect } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";

import { reqGetAllTeacherList } from "@api/edu/teacher";
import { reqGetAllSubjectList, reqGetSubSubjectList } from "@api/edu/subject";
import { getCourseList } from "../../redux";

import "./index.less";

const { Option } = Select;

function SearchForm({ getCourseList, getSearchFormData }) {
  const intl = useIntl();
  const [form] = Form.useForm();
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [teachers, subjects] = await Promise.all([
        // 请求所有讲师数据
        reqGetAllTeacherList(),
        // 请求所有一级分类数据
        reqGetAllSubjectList(),
      ]);
      setTeachers(teachers);
      // subjects数据展示需要处理
      const data = subjects.map((subject) => {
        return {
          value: subject._id, // 选中的值
          label: subject.title, // 显示名称
          isLeaf: false,
        };
      });
      setSubjects(data);
    };
    fetchData();
  }, []);

  // 点击一级菜单调用函数
  // 加载二级菜单数据
  const loadData = async (selectedOptions) => {
    /*
      selectedOptions 代表当前选中的菜单
      当前是二级菜单：[{}] --> 里面的对象代表点击的一级菜单

      如果将来有三级菜单：[{一级菜单}, {二级菜单}, ....]
      结论：当前点击的菜单就是数组的最后一项值
    */
    // console.log(selectedOptions);

    // targetOption 获取当前点击的菜单对象
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // 添加loading属性，页面就会出现加载图标
    targetOption.loading = true;

    // 加载二级菜单数据
    const { items } = await reqGetSubSubjectList(targetOption.value);

    // 关闭加载
    targetOption.loading = false;

    if (items.length) {
      // targetOption是一级菜单，children属性显示的是二级菜单数据
      targetOption.children = items.map((item) => {
        return {
          value: item._id,
          label: item.title,
          // isLeaf: false, // 如果加上这个属性，还能请求三级菜单~
        };
      });
    } else {
      // 没有二级菜单~
      targetOption.isLeaf = true;
    }

    /*
      注意：只更新数据，页面是没有变化的~
            需要更新页面：
              ES6类组件 this.setState    
              工厂函数组件 const [value, setValue] = useState() --> setValue()
    */
    // setSubjects() 为了更新页面
    // 方法接受的值不允许和之前一样，要更新的全新的数据
    setSubjects([...subjects]);
  };

  // 重置按钮
  const resetForm = () => {
    form.resetFields();
  };

  const onFinish = async (values) => {
    const {
      title,
      teacherId,
      subject = [], // 默认值
    } = values;
    let subjectId, subjectParentId;

    if (subject.length === 1) {
      // 值只有一个，代表是一级分类
      subjectParentId = "0";
      subjectId = subject[0];
    } else if (subject.length === 2) {
      // 值有两个，代表是二级分类
      subjectParentId = subject[0];
      subjectId = subject[1];
    }
    // 发送请求查询数据
    await getCourseList({
      title,
      teacherId,
      page: 1,
      limit: 10,
      subjectId,
      subjectParentId,
    });

    // 调用父组件方法 给父组件传递数据
    getSearchFormData({ title, teacherId, subjectId, subjectParentId });

    message.success("查询课程分类数据成功~");
  };

  return (
    <Form layout="inline" form={form} onFinish={onFinish}>
      <Form.Item
        name="title"
        label={intl.formatMessage({
          id: "title",
        })}
      >
        <Input
          placeholder={intl.formatMessage({
            id: "title",
          })}
          style={{ width: 250, marginRight: 20 }}
        />
      </Form.Item>
      <Form.Item name="teacherId" label={<FormattedMessage id="teacher" />}>
        <Select
          allowClear
          placeholder={<FormattedMessage id="teacher" />}
          style={{ width: 250, marginRight: 20 }}
        >
          {teachers.map((teacher) => {
            return (
              <Option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item name="subject" label={<FormattedMessage id="subject" />}>
        <Cascader
          style={{ width: 250, marginRight: 20 }}
          options={subjects}
          loadData={loadData}
          // onChange={onChange}
          changeOnSelect
          placeholder={intl.formatMessage({
            id: "subject",
          })}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: "0 10px 0 30px" }}
        >
          <FormattedMessage id="searchBtn" />
        </Button>
        <Button onClick={resetForm}>
          <FormattedMessage id="resetBtn" />
        </Button>
      </Form.Item>
    </Form>
  );
}

export default connect(null, { getCourseList })(SearchForm);
