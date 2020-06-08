import React, { Component } from "react";
import { Table, Button, Tooltip } from "antd";
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";

import "./index.less";

const subjects = [
  {
    id: "1178214681118568449",
    title: "后端开发",
    children: [
      {
        id: "1178214681139539969",
        title: "Java",
        children: [],
      },
      {
        id: "1178585108407984130",
        title: "Python",
        children: [],
      },
    ],
  },
  {
    id: "1178214681181483010",
    title: "前端开发",
    children: [
      {
        id: "1178214681210843137",
        title: "JavaScript",
        children: [],
      },
      {
        id: "1178585108454121473",
        title: "HTML/CSS",
        children: [],
      },
    ],
  },
  {
    id: "1178214681231814658",
    title: "云计算",
    children: [
      {
        id: "1178214681252786178",
        title: "Docker",
        children: [],
      },
      {
        id: "1178214681294729217",
        title: "Linux",
        children: [],
      },
    ],
  },
  {
    id: "1178214681324089345",
    title: "系统/运维",
    children: [
      {
        id: "1178214681353449473",
        title: "Linux",
        children: [],
      },
      {
        id: "1178214681382809602",
        title: "Windows",
        children: [],
      },
    ],
  },
  {
    id: "1178214681399586817",
    title: "数据库",
    children: [
      {
        id: "1178214681428946945",
        title: "MySQL",
        children: [],
      },
      {
        id: "1178214681454112770",
        title: "MongoDB",
        children: [],
      },
    ],
  },
  {
    id: "1178214681483472898",
    title: "大数据",
    children: [
      {
        id: "1178214681504444418",
        title: "Hadoop",
        children: [],
      },
      {
        id: "1178214681529610242",
        title: "Spark",
        children: [],
      },
    ],
  },
  {
    id: "1178214681554776066",
    title: "人工智能",
    children: [
      {
        id: "1178214681584136193",
        title: "Python",
        children: [],
      },
    ],
  },
  {
    id: "1178214681613496321",
    title: "编程语言",
    children: [
      {
        id: "1178214681626079234",
        title: "Java",
        children: [],
      },
    ],
  },
].map((item) => {
  if (!item.children || !item.children.length) {
    return {
      ...item,
      children: null,
    };
  }
  return {
    ...item,
    children: item.children.map((item) => {
      if (!item.children || !item.children.length) {
        return {
          ...item,
          children: null,
        };
      }
      return item;
    }),
  };
});

export default class Subject extends Component {
  columns = [
    {
      title: "分类名称",
      dataIndex: "title",
    },
    {
      title: "操作",
      fixed: "right",
      width: 200,
      render: (data) => {
        return (
          <div>
            <Tooltip title="更新课程分类">
              <Button type="primary" style={{ margin: "0 10px" }}>
                <FormOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="删除课程分类">
              <Button type="danger">
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  render() {
    return (
      <div className="subject">
        <Button type="primary" style={{ marginBottom: 20, marginLeft: 20 }}>
          <PlusOutlined />
          新建
        </Button>
        <Table rowKey="id" columns={this.columns} dataSource={subjects} />
      </div>
    );
  }
}
