import React, { Component } from "react";
// 引入antd组件
import { Button, Table, Tooltip, Input, message, Modal } from "antd";
// 引入antd字体图标
import {
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";

import { getSubjectList, getSubSubjectList, updateSubject } from "./redux";
import { reqDelSubject } from "@api/edu/subject";
import { filterPermissions } from "@utils/tools";

import "./index.less";

@connect(
  (state) => ({
    subjectList: state.subjectList,
    permissionValueList: filterPermissions(
      // 过滤不要权限值，返回一个对象
      state.user.permissionValueList,
      "subject"
    ), // 按钮权限列表
  }), // 状态数据
  {
    // 更新状态数据的方法
    getSubjectList,
    getSubSubjectList,
    updateSubject,
  }
)
class Subject extends Component {
  state = {
    expandedRowKeys: [], // 展开项
    subjectId: "", // 要更新商品分类id
    subjectTitle: "", // 要更新商品分类标题
    updateSubjectTitle: "", // 正在更新分类的标题
    current: 1, // 当前页数
    pageSize: 10, // 每页条数
  };

  componentDidMount() {
    // 代表一上来请求第一页数据
    this.getSubjectList(1, 10);
  }

  /*
    问题1： 展开第一项 展开第二项 关闭第二项 第一项数据发生了更新
      原因：
        不管展开还是关闭都会触发 handleExpandedRowsChange
        [1, 2] --> [1] 就会拿着 1 重新发送请求，所以更新了第一项数据
      解决：
        关键点：判断当前是 展开 还是 关闭~
          如果是展开，就要发送请求更新数据，还要更新expandedRowKeys
          如果是关闭，就只要更新expandedRowKeys，而不需要发送请求
        展开，长度会+1，而关闭，长度会-1
        当前expandedRowKeys --> this.state.expandedRowKeys
        最新expandedRowKeys --> 函数传入的参数
  */
  // 点击展开一级菜单
  // expandedRowKeys展开的行项（如果有没有展开的会自动去掉）
  handleExpandedRowsChange = (expandedRowKeys) => {
    // console.log("handleExpandedRowsChange", expandedRowKeys);
    // 长度
    const length = expandedRowKeys.length;

    // 如果最新长度大于之前的长度，说明就是展开~
    if (length > this.state.expandedRowKeys.length) {
      // 点击要展开的最后一项值~
      const lastKey = expandedRowKeys[length - 1];
      // 发送请求，请求要展开菜单的二级菜单数据
      this.props.getSubSubjectList(lastKey);
    }

    // 更新state --> 告诉Table哪个子菜单需要展开
    this.setState({
      expandedRowKeys,
    });
  };

  // 解决在第二页切换每页数量时显示数据不正确问题~
  getFirstPageSubjectList = (page, limit) => {
    // 每页数量发生变化触发的回调
    this.getSubjectList(1, limit);
  };

  // 显示添加页面
  showAddSubject = () => {
    this.props.history.push("/edu/subject/add");
  };

  // 显示更新分类
  showUpdateSubject = (subject) => {
    return () => {
      if (this.state.subjectId) {
        message.warn("请更新当前课程分类~");
        return;
      }
      this.setState({
        subjectId: subject._id,
        subjectTitle: subject.title,
      });
    };
  };

  // 收集更新分类标题数据
  handleInputChange = (e) => {
    this.setState({
      updateSubjectTitle: e.target.value,
    });
  };

  // 更新课程分类
  updateSubject = async () => {
    const { subjectId, updateSubjectTitle, subjectTitle } = this.state;
    if (!updateSubjectTitle) {
      message.warn("请输入要更新课程分类标题~");
      return;
    }
    if (updateSubjectTitle === subjectTitle) {
      message.warn("输入更新课程分类标题不能与之前一样~");
      return;
    }
    // 更新数据 --> 1. 更新服务器数据（发送请求） 2. 更新客户端数据（redux数据）
    await this.props.updateSubject(updateSubjectTitle, subjectId);
    message.success("更新分类数据成功~");
    this.cancel();
  };
  // 取消更新课程分类
  cancel = () => {
    this.setState({
      subjectId: "",
      updateSubjectTitle: "",
    });
  };

  delSubject = (subject) => {
    return () => {
      Modal.confirm({
        title: (
          <p>
            你确认要删除 <span className="subject-text">{subject.title}</span>{" "}
            课程分类吗?
          </p>
        ),
        icon: <ExclamationCircleOutlined />,
        onOk: async () => {
          // 点击确认回调函数
          await reqDelSubject(subject._id);
          // 删除成功
          message.success("删除课程分类数据成功~");
          // 请求新的分页数据~
          const { current, pageSize } = this.state;
          // 如果删除的数据只有一条，应该要跳转到前一页
          // 前提条件是必须是大于1，page为2以上
          // 前提条件删除分类是一级分类
          if (
            current > 1 &&
            this.props.subjectList.items.length === 1 &&
            subject.parentId === "0"
          ) {
            this.getSubjectList(current - 1, pageSize);
            return;
          }

          this.getSubjectList(current, pageSize);
        },
        // onCancel() {
        //   // 点击取消的回调函数
        //   console.log("Cancel");
        // },
      });
    };
  };

  getSubjectList = (page, limit) => {
    this.setState({
      current: page,
      pageSize: limit,
    });
    return this.props.getSubjectList(page, limit);
  };

  render() {
    const { subjectList, permissionValueList } = this.props;
    const { expandedRowKeys, current, pageSize } = this.state;

    const columns = [
      {
        // 表头显示的内容
        title: "分类名称",
        // 当前列要显示data中哪个数据（显示数据的key属性）
        // data[dataIndex]
        // dataIndex: "title",
        // 遍历元素需要唯一key属性
        key: "title",
        /*
          render方法接受参数看dataIndex的值
          如果dataIndex: title, render方法就能接受title的值
          如果dataIndex: _id, render方法就能接受_id的值
          如果dataIndex: '', render方法就能接受当前所有数据的值
        */
        render: (subject) => {
          // 点击按钮要更新的目标分类id
          const { subjectId } = this.state;
          // 得到当前渲染的分类id
          const id = subject._id;

          if (subjectId === id) {
            return (
              <Input
                className="subject-input"
                defaultValue={subject.title}
                onChange={this.handleInputChange}
              />
            );
          }

          return <span>{subject.title}</span>;
        },
      },
      {
        title: "操作",
        dataIndex: "",
        key: "action",
        // 列的宽度
        width: 200,
        // 默认情况下，渲染的内容是纯文本
        // 如果想渲染成其他方案（按钮）需要用render方法指定
        render: (subject) => {
          // 点击按钮要更新的目标分类id
          const { subjectId } = this.state;
          // 得到当前渲染的分类id
          const id = subject._id;

          if (subjectId === id) {
            return (
              <>
                <Button type="primary" onClick={this.updateSubject}>
                  确认
                </Button>
                <Button className="subject-btn" onClick={this.cancel}>
                  取消
                </Button>
              </>
            );
          }

          return (
            <>
              <Tooltip title="更新课程分类">
                <Button
                  type="primary"
                  onClick={this.showUpdateSubject(subject)}
                >
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title="删除课程分类">
                <Button
                  type="danger"
                  className="subject-btn"
                  onClick={this.delSubject(subject)}
                >
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </>
          );
        },
      },
    ];

    console.log(permissionValueList);

    return (
      <div className="subject">
        {permissionValueList["subject.add"] && (
          <Button
            type="primary"
            className="subject-btn"
            onClick={this.showAddSubject}
          >
            <PlusOutlined />
            新建
          </Button>
        )}
        <Table
          columns={columns} // 决定列头
          expandable={{
            // 内部默认会使用children作为展开的子菜单
            // 也就是说，如果要展开的数据有children属性，才会有展开图标，就会作为子菜单展开~
            // 负责展开行
            // 展开哪些行？[行的key值, 行的key值...]
            // [_id, _id]
            expandedRowKeys,
            // 展开行触发的方法。
            // 将展开的行[1, 2, 3]作为参数传入
            onExpandedRowsChange: this.handleExpandedRowsChange,
          }}
          dataSource={subjectList.items} // 决定每一行显示的数据
          rowKey="_id" // 指定key属性的值是_id
          pagination={{
            // 分页器
            current, // 当前页数
            pageSize, // 每页条数
            total: subjectList.total, // 数据总数
            showQuickJumper: true, // 是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数量
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
            onChange: this.getSubjectList, // 页码发生变化触发的回调
            onShowSizeChange: this.getFirstPageSubjectList,
          }}
        />
      </div>
    );
  }
}

export default Subject;
