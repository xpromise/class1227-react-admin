const express = require("express");
const Mock = require("mockjs");
// 创建App应用对象：将来设置后台路由的方法都在上面
const app = express();

// 随机类
const Random = Mock.Random;
// 随机中文标题
Random.ctitle();

// app.use() 中间件，代表接受所有请求
// 使用cors 解决跨域
app.use((req, res, next) => {
  // 设置响应头: 将来作为响应数据返回给客户端的~
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "content-type, token");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next(); // 触发下一个中间件/路由
});

/*
  node xxx 通过node启动服务器
    问题：每次服务器代码修改了，需要重启服务器，太麻烦了~

  nodemon xxx 通过nodemon启动服务器
    nodemon会监视代表的变化，一旦发生变化，会自动重启服务器
    npm i nodemon -g   
*/
// 二级分类数据
/*
  问题：请求进不来
    请求地址：
      /admin/edu/subject/1/10 --> 请求一级分类数据
      /admin/edu/subject/get/1 --> 请求二级分类数据
      以上两个地址都会命中：/admin/edu/subject/:page/:limit 后面路由就不会执行
      所以请求进不来
  解决：必须放前面

*/
app.get("/admin/edu/subject/get/:parentId", (req, res, next) => {
  // 获取请求参数params
  const {
    parentId, // 父级分类id
  } = req.params;

  // 以某个的范围取一个随机整数
  const total = Random.integer(0, 5);
  // 定义模拟数据
  const data = Mock.mock({
    total,
    [`items|${total}`]: [
      {
        "_id|+1": 100,
        title: "@ctitle(2,5)",
        parentId,
      },
    ],
  });

  if (total === 1) {
    // 当长度为1时，返回值是对象不是数组
    // 此时需要修改成数组~
    data.items = [data.items];
  }

  /*
    二级分类
    {
      _id: 2, // 自己分类id
      title: 'HTML', // 课程分类名称
      parentId: 1 // 父级分类Id，如果是0就是1级分类, 不是就是二级分类
    }
  */

  // 返回响应
  res.json({
    code: 20000, // 成功状态码
    success: true, // 成功
    data, // 成功的具体数据
    message: "", // 失败原因
  }); // 将数据装换json字符串返回响应
});

// 模拟请求，并返回模拟数据
// http://47.103.203.152/admin/edu/subject/:page/:limit get
// 后台路由：只能接受特定请求方式和请求地址的请求
app.get("/admin/edu/subject/:page/:limit", (req, res, next) => {
  /*
    req -> request 请求对象 客户端发送给服务器的数据
    res -> response 响应对象 服务器要返回给客户端的数据
  */
  // 获取请求参数params
  const {
    page, // 当前页码
    limit, // 每页数量
  } = req.params;
  // 获取请求参数 query查询字符串
  // const {} = req.query;

  // 模拟数据 http://mockjs.com/examples.html
  const data = Mock.mock({
    total: Random.integer(+limit + 1, limit * 2), // 以某个的范围取一个随机整数
    // `items|${limit}` 生成数组，数组长度为limit
    [`items|${limit}`]: [
      {
        // 有个属性 _id 初始化值是 1
        // 遍历会递增 +1
        "_id|+1": 1,
        // @ctitle 会使用上面 Random.ctitle() 来生成随机标题
        // @ctitle(2,5) 控制长度为2-5
        title: "@ctitle(2,5)",
        parentId: 0,
      },
    ],
  });

  /*
    一级分类
    {
      _id: 1, // 自己分类id
      title: '前端', // 课程分类名称
      parentId: 0 // 父级分类Id，如果是0就是1级分类
    }
    二级分类
    {
      _id: 2, // 自己分类id
      title: 'HTML', // 课程分类名称
      parentId: 1 // 父级分类Id，如果是0就是1级分类, 不是就是二级分类
    }
  */

  // 返回响应
  res.json({
    code: 20000, // 成功状态码
    success: true, // 成功
    data, // 成功的具体数据
    message: "", // 失败原因
  }); // 将数据装换json字符串返回响应
});

/* app.post();

app.put();

app.delete(); */

// 监听端口号 启动服务
app.listen(9527, "localhost", (err) => {
  if (err) {
    console.log("服务器启动失败", err);
    return;
  }
  console.log("服务器启动成功~");
});
