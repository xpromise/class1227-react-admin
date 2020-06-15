import React from "react";
import { Row, Col } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import { AreaChart } from "bizcharts";

import Card from "@comps/Card";
import "./index.less";

// 数据源
const data = [
  { year: "1991", value: 3 },
  { year: "1992", value: 10 },
  { year: "1993", value: 15 },
  { year: "1994", value: 5 },
  { year: "1995", value: 4.9 },
  { year: "1996", value: 10 },
  { year: "1997", value: 4 },
  { year: "1998", value: 9 },
  { year: "1999", value: 13 },
];

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
          title="总销售额"
          number="￥123456"
          content={
            <>
              <span>
                周同比 12% &nbsp;
                <CaretUpOutlined style={{ color: "red" }} />
              </span>
              &nbsp; &nbsp;
              <span>
                日同比 10% &nbsp;
                <CaretDownOutlined style={{ color: "green" }} />
              </span>
            </>
          }
          footer="日销售额 ￥123456"
        />
      </Col>
      <Col {...layout}>
        <Card
          title="title..."
          number="123456"
          content={
            <div className="charts-container">
              {/* https://bizcharts.net/product/BizCharts4/category/77/page/118 */}
              <AreaChart
                data={data} // 数据
                // width={270}
                // height={30}
                forceFit // 自适应宽高
                xField="year" // x轴加载数据的字段
                yField="value" // y轴加载数据的字段
                smooth // 曲线
                color="pink" // 颜色
                xAxis={{ visible: false }} // 隐藏x轴
                yAxis={{ visible: false }} // 隐藏y轴
              />
            </div>
          }
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
