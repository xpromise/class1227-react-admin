# 登录功能

## 账户密码登录

1. 表单校验并收集表单数据

```jsx
1. 方案一：使用Form表单的功能
  校验并收集全部表单数据
  <Button htmlType="submit">xxx</Button>
  <Form onFinish={finish}></Form>
  // finish方法内部就会自动校验所有表单并收集数据
  // 成功才会返回数据
  // 失败就会报错~

2. 方案二：使用form实例对象功能
  校验并收集部分表单数据
  const [form] = useForm() 创建
  <Form form={form}></Form> 设置
  form.validateFields(['xxx']) 使用
```

2. 发送请求

- 先看接口文档 http://localhost:5000/docs
- 定义 API
- 看数据到底要不要走 redux（请求回来的数据是否有多个组件使用）
  - 如果没有多个组件使用
    - 直接在组件中，调用 API 接口发送请求
  - 如果有多个组件使用（redux 开发流程）
    - actions：异步（一定定义）和同步（看能不能复用之前的）
    - constants
    - reducers
      - 如果 reducers 是第一次定义，还需要再 redux/reducer/index.js 中汇总
    - 组件使用 引入 action / connect ，以 props 方式传入给组件使用

3. 记住密码功能

- 要不要将数据保存在本地

4. 提示登录成功并跳转到首页

- 当前组件是不是路由组件（是否通过 Route 加载 --> 看是否在 config/asyncComps 中配置）
- 不是路由组件就要通过 withRouter 高阶组件传递路由组件三大属性

## 手机号登录

1. 发送验证码

- 校验手机号是否符合规范（校验方案二）
- 正确的话才开始发送请求
- 同时，要切换按钮的状态（1. 不能选 2. 倒计时功能）
  - 不能选: 通过控制按钮的 disabled 属性（true 不可选，false 可选） --> useState
  - 倒计时功能：
    - 坑：定时器没办法一直更新状态，值只能更新一次，页面一直在更新（直没有变化）
      - Hooks 函数不能在定时器和循环中使用（使用只生效一次~）
    - 值不用状态管理，定义局部变量，但是需要 setState 方法来重新渲染组件，此时才能看到页面的变化

2. 输入验证码，点击登录，收集并校验所有数据

- 问题：验证码暂时不能发送到手机上。
  - 解决：打开服务器，看打印结果，打印结果中就有验证码~
  ```js
    // 验证码发送成功
    {
      result: 0,
      result_msg: '提交成功',
      msgid: '9229856',
      ts: '20200616171127'
    }
    // 验证码
    523791
  ```
- 坑：Form 管理了两个表单（账户密码登录/手机号登录）
- 所以不能使用方案一校验收集所有数据。必须使用方案二才能
  - 如何判断当前是账户密码登录/手机号登录？
  - 将 Tabs 组件受控起来，通过 state 和 onChange 来操作其值
  - state 会实时变化，通过获取 state 就能区分当前是什么登录方式了

3. 发送请求，手机号登录

- 后面流程就基本一致了~

## oauth2.0 授权登录（第三方应用授权登录）

1. 点击 github 图标跳转网址

- 地址 https://github.com/login/oauth/authorize
- 参数 client_id

2. 授权流程

- 填写用户名和密码（如果之前登录过 github，这步就会跳过）
- 确认授权（将 github 权限授权给当前硅谷系统）

3. 接受授权成功/登录成功返回的 token

- 自动跳转到 http://localhost:3000/oauth 地址，并携带参数 token
- 定义 Oauth 组件来接受处理 token
  - 定义 Oauth 组件
  - config/routes 在常量路由配置中加入 Oauth 组件配置
  - Oauth 组件内定义componentDidMount --> 通过 location.search 获取token
  - 将其存储到 redux 和 localStorage 中
  - 跳转到首页