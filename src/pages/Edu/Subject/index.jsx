import React, { Component } from "react";
// 引入antd组件
import { Button, Table } from "antd";
// 引入antd字体图标
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import { getSubjectList, getSubSubjectList } from "./redux";

import "./index.less";

@connect(
  (state) => ({ subjectList: state.subjectList }), // 状态数据
  {
    // 更新状态数据的方法
    getSubjectList,
    getSubSubjectList,
  }
)
class Subject extends Component {
  componentDidMount() {
    // 代表一上来请求第一页数据
    this.props.getSubjectList(1, 10);
  }

  // 点击展开一级菜单
  handleExpand = (expanded, record) => {
    if (!expanded) return;
    // 请求一级菜单对应二级菜单数据
    this.props.getSubSubjectList(record._id);
  };

  render() {
    const { subjectList, getSubjectList } = this.props;

    const columns = [
      {
        // 表头显示的内容
        title: "分类名称",
        // 当前列要显示data中哪个数据（显示数据的key属性）
        // data[dataIndex]
        dataIndex: "title",
        // 遍历元素需要唯一key属性
        key: "title",
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
            expandedRowRender: (record) => {
              // 判断有没有children
              const children = record.children ? record.children : [];

              return children.map((subSubject) => {
                return (
                  <div key={subSubject._id} className="sub-subject-row">
                    <div>{subSubject.title}</div>
                    <div className="sub-subject-row-right">
                      <Button type="primary">
                        <FormOutlined />
                      </Button>
                      <Button type="danger" className="subject-btn">
                        <DeleteOutlined />
                      </Button>
                    </div>
                  </div>
                );
              });
            },
            // 决定行是否可以展开
            // 返回值true 就是可以展开
            // 返回值false 就是不可以展开
            // rowExpandable: (record) => record.name !== "Not Expandable",
            onExpand: this.handleExpand,
          }}
          dataSource={subjectList.items} // 决定每一行显示的数据
          rowKey="_id" // 指定key属性的值是_id
          pagination={{
            // 分页器
            total: subjectList.total, // 数据总数
            showQuickJumper: true, // 是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数量
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
            onChange: getSubjectList, // 页码发生变化触发的回调
            onShowSizeChange: getSubjectList,
          }}
        />
      </div>
    );
  }
}

export default Subject;
