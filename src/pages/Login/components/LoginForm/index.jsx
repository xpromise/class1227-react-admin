import React from "react";
import { Form, Tabs, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./index.less";

const { TabPane } = Tabs;

const reg = /^[a-zA-Z0-9_]+$/;

/*
  表单校验有三种写法：
    1. rules(如果多个表单校验规则一模一样)
      <Form.Item
        name="username"
        rules={[
          { required: true, message: "请输入用户名" },
          { max: 15, message: "输入的长度不能超过15位" },
          { min: 4, message: "输入的长度不能小于4位" },
          {
            pattern: /^[a-zA-Z0-9_]+$/,
            message: "输入内容只能包含数字、英文和下划线",
          },
        ]}
      >
   2. 自定义校验规则 validator(如果多个表单校验规则有差异)
      <Form.Item
        name="username"
        rules={[
          { validator: validator },
        ]}
      > 
      const validator = (rule, value) => {}
        
    3. rules + validateMessages（校验规则一样，但是message信息不一样）
      主要目的是为了复用 messages

*/

// 定义表单校验规则
const rules = [
  {
    required: true,
    // message: "请输入数据"
  },
  { max: 15, message: "输入的长度不能超过15位" },
  { min: 4, message: "输入的长度不能小于4位" },
  {
    pattern: /^[a-zA-Z0-9_]+$/,
    message: "输入内容只能包含数字、英文和下划线",
  },
];

export default function LoginForm() {
  const handleTabChange = (key) => {
    console.log(key);
  };

  // 一般不用第二种
  const validator = (rule, value) => {
    return new Promise((resolve, reject) => {
      // rule 里面有字段名
      // value 是输入的值
      if (!value) {
        return reject("请输入密码");
      }
      const len = value.length;

      if (len > 15) {
        return reject("输入的长度不能超过15位");
      }

      if (len < 4) {
        return reject("输入的长度不能小于4位");
      }

      if (!reg.test(value)) {
        return reject("输入内容只能包含数字、英文和下划线");
      }

      resolve();
    });
  };

  // 定义公共校验规则
  const validateMessages = {
    required: "请输入${name}!",
    // types: {
    //   username: "${name} is not validate email!",
    //   password: "${name} is not a validate number!",
    // },
    // number: {
    //   range: '${label} must be between ${min} and ${max}',
    // },
  };

  return (
    <Form validateMessages={validateMessages}>
      <div className="login-form-header">
        <Tabs onChange={handleTabChange}>
          <TabPane tab="账户密码登录" key="user">
            <Form.Item
              name="username"
              // 表单校验规则
              // rules={[
              //   { required: true, message: "请输入用户名" },
              //   { max: 15, message: "输入的长度不能超过15位" },
              //   { min: 4, message: "输入的长度不能小于4位" },
              //   {
              //     pattern: /^[a-zA-Z0-9_]+$/,
              //     message: "输入内容只能包含数字、英文和下划线",
              //   },
              // ]}
              // rules={[
              //   {
              //     required: true,
              //   },
              // ]}
              rules={rules}
            >
              <Input prefix={<UserOutlined />} placeholder="用户名: admin" />
            </Form.Item>

            <Form.Item
              name="password"
              // 表单校验规则
              // rules={[
              //   { validator: validator }, // 自定义规则
              // ]}
              // rules={[
              //   {
              //     required: true,
              //   },
              // ]}
              rules={rules}
            >
              <Input
                type="password"
                prefix={<UserOutlined />}
                placeholder="用户名: admin"
              />
            </Form.Item>
          </TabPane>
          <TabPane tab="手机号登录" key="phone">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
    </Form>
  );
}
