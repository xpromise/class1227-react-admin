import React from "react";
import { Row, Col } from "antd";
import Card from "@comps/Card";

const layout = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 6,
};

export default function Visits() {
  return (
    <Row gutter={16}>
      <Col {...layout}>
        <Card
          title="title..."
          number="123456"
          content="content..."
          footer="footer..."
        />
      </Col>
      <Col {...layout}>
        <Card
          title="title..."
          number="123456"
          content="content..."
          footer="footer..."
        />
      </Col>
      <Col {...layout}>
        <Card
          title="title..."
          number="123456"
          content="content..."
          footer="footer..."
        />
      </Col>
      <Col {...layout}>
        <Card
          title="title..."
          number="123456"
          content="content..."
          footer="footer..."
        />
      </Col>
    </Row>
  );
}
