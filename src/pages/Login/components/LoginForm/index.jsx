import React from "react";
import { Form, Tabs, Input, Button, Checkbox, Row, Col } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { login } from "@redux/actions/login";

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

function LoginForm({ login, history }) {
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

  // 点击表单提交按钮触发的方法
  const finish = async (values) => {
    // 收集数据并进行表单校验
    const { username, password, rem } = values;
    // 发送请求，请求登录~
    const token = await login(username, password);
    // 请求失败 拦截器会自动报错
    // 请求成功~
    // rem 代表要不要记住密码
    if (rem) {
      // 持久化存储
      localStorage.setItem("user_token", token);
    }
    // 跳转到主页
    history.replace("/");
  };

  return (
    <Form
      validateMessages={validateMessages}
      initialValues={{ rem: "checked" }}
      // 注意button按钮的类型必须submit
      onFinish={finish}
    >
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
              prefix={<LockOutlined />}
              placeholder="密码: 111111"
            />
          </Form.Item>
        </TabPane>
        <TabPane tab="手机号登录" key="phone">
          <Form.Item
            name="phone"
            // 表单校验规则
            rules={[
              { required: true, message: "请输入手机号" },
              {
                pattern: /^(((13[0-9])|(14[579])|(15([0-3]|[5-9]))|(16[6])|(17[0135678])|(18[0-9])|(19[89]))\d{8})$/,
                message: "请输入正确的手机号",
              },
            ]}
          >
            <Input prefix={<MobileOutlined />} placeholder="手机号" />
          </Form.Item>

          <Form.Item
            name="password"
            // 表单校验规则
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <div className="login-form-phone">
              <Input placeholder="验证码" />
              <Button>点击发送验证码</Button>
            </div>
          </Form.Item>
        </TabPane>
      </Tabs>
      {/* 默认接管组件value属性，但是现在需要修改的checked  */}
      <Row justify="space-between">
        <Col>
          <Form.Item name="rem" valuePropName="checked">
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button type="link">忘记密码</Button>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-btn">
          登录
        </Button>
      </Form.Item>
      <Row justify="space-between">
        <Col>
          <Form.Item>
            <div className="login-form-icons">
              <span>其他登录方式</span>
              <GithubOutlined className="icons" />
              <WechatOutlined className="icons" />
              <QqOutlined className="icons" />
            </div>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button type="link">注册</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default withRouter(connect(null, { login })(LoginForm));
