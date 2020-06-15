import React from "react";
import { Statistic, Divider } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import "./index.less";

export default function Card({ title, number, content, footer }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <Statistic title={title} value={number} />
        </div>
        <div className="card-extra">
          <QuestionCircleOutlined />
        </div>
      </div>
      <div className="card-content">{content}</div>
      <Divider style={{ margin: "10px 0 0 0" }} />
      <div className="card-footer">{footer}</div>
    </div>
  );
}
