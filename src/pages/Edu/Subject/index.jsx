import React, { Component } from "react";
// 引入antd组件
import { Button, Table } from "antd";
// 引入antd字体图标
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";

import "./index.less";

export default class Subject extends Component {
  render() {
    const columns = [
      {
        // 表头显示的内容
        title: "分类名称",
        // 当前列要显示data中哪个数据（显示数据的key属性）
        // data[dataIndex]
        dataIndex: "name",
        // 遍历元素需要唯一key属性
        key: "age",
      },
      {
        title: "操作",
        dataIndex: "",
        key: "action",
        // 列的宽度
        width: 200,
        // 默认情况下，渲染的内容是纯文本
        // 如果想渲染成其他方案（按钮）需要用render方法指定
        render: () => (
          <>
            <Button type="primary">
              <FormOutlined />
            </Button>
            <Button type="danger" className="subject-btn">
              <DeleteOutlined />
            </Button>
          </>
        ),
      },
    ];
    
    const data = [
      {
        key: 1,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        description:
          "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
      },
      {
        key: 2,
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        description:
          "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
      },
      {
        key: 3,
        name: "Not Expandable",
        age: 29,
        address: "Jiangsu No. 1 Lake Park",
        description: "This not expandable",
      },
      {
        key: 4,
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        description:
          "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
      },
    ];

    return (
      <div className="subject">
        <Button type="primary" className="subject-btn">
          <PlusOutlined />
          新建
        </Button>
        <Table
          columns={columns} // 决定列头
          expandable={{
            // 决定列是否可以展开
            // 决定行展开时显示什么内容
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            // 决定行是否可以展开
            // 返回值true 就是可以展开
            // 返回值false 就是不可以展开
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          dataSource={data} // 决定每一行显示的数据
        />
      </div>
    );
  }
}
