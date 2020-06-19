import React, { Component } from "react";
import { Tabs } from "antd";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
  RingProgressChart,
} from "bizcharts";

import "./index.less";

const { TabPane } = Tabs;

const data = [...Array(30).keys()].map((i) => {
  return {
    key: i + 1,
    percent: +Math.random().toFixed(1),
  };
});

const lineData = [
  {
    month: "Jan",
    city: "Tokyo",
    temperature: 7,
  },
  {
    month: "Jan",
    city: "London",
    temperature: 3.9,
  },
  {
    month: "Feb",
    city: "Tokyo",
    temperature: 6.9,
  },
  {
    month: "Feb",
    city: "London",
    temperature: 4.2,
  },
  {
    month: "Mar",
    city: "Tokyo",
    temperature: 9.5,
  },
  {
    month: "Mar",
    city: "London",
    temperature: 5.7,
  },
  {
    month: "Apr",
    city: "Tokyo",
    temperature: 14.5,
  },
  {
    month: "Apr",
    city: "London",
    temperature: 8.5,
  },
  {
    month: "May",
    city: "Tokyo",
    temperature: 18.4,
  },
  {
    month: "May",
    city: "London",
    temperature: 11.9,
  },
  {
    month: "Jun",
    city: "Tokyo",
    temperature: 21.5,
  },
  {
    month: "Jun",
    city: "London",
    temperature: 15.2,
  },
  {
    month: "Jul",
    city: "Tokyo",
    temperature: 25.2,
  },
  {
    month: "Jul",
    city: "London",
    temperature: 17,
  },
  {
    month: "Aug",
    city: "Tokyo",
    temperature: 26.5,
  },
  {
    month: "Aug",
    city: "London",
    temperature: 16.6,
  },
  {
    month: "Sep",
    city: "Tokyo",
    temperature: 23.3,
  },
  {
    month: "Sep",
    city: "London",
    temperature: 14.2,
  },
  {
    month: "Oct",
    city: "Tokyo",
    temperature: 18.3,
  },
  {
    month: "Oct",
    city: "London",
    temperature: 10.3,
  },
  {
    month: "Nov",
    city: "Tokyo",
    temperature: 13.9,
  },
  {
    month: "Nov",
    city: "London",
    temperature: 6.6,
  },
  {
    month: "Dec",
    city: "Tokyo",
    temperature: 9.6,
  },
  {
    month: "Dec",
    city: "London",
    temperature: 4.8,
  },
];

export default class Static extends Component {
  render() {
    return (
      <div className="static">
        <Tabs
          // defaultActiveKey="1"
          // tabPosition={mode}
          style={{ height: 600 }}
        >
          {data.map((item) => (
            <TabPane
              tab={
                <div>
                  <h3>store{item.key}</h3>
                  <RingProgressChart
                    width={30}
                    height={30}
                    percent={item.percent}
                  />
                </div>
              }
              key={item.key}
              // disabled={i === 28} // 不能选中
            >
              <Chart height={400} data={lineData} autoFit>
                <Legend position="top" />
                <Axis name="month" />
                <Axis
                  name="temperature"
                  label={{
                    formatter: (val) => `${val}°C`,
                  }}
                />
                <Tooltip
                  crosshairs={{
                    type: "y",
                  }}
                  // custom={true}
                  //         containerTpl={`
                  //   <div class="g2-tooltip"><div class="g2-tooltip-title" style="margin-bottom: 4px;"></div>
                  //   <table>
                  //     <thead>
                  //       <tr>
                  //         <th>&nbsp;</th>
                  //         <th>名称</td>
                  //         <th>值</td>
                  //       </tr>
                  //     <thead>
                  //     <tbody
                  //       class="g2-tooltip-list"
                  //     >
                  //     </tbody>
                  //   <table>
                  //   `}
                  //         itemTpl={`
                  //     <tr data-index={index}>'
                  //       <td><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span></td>
                  //       <td>{name}</td>
                  //       <td>{value}</td>
                  //     </tr>
                  //  `}
                />
                <Geom
                  type="line"
                  position="month*temperature"
                  size={2}
                  color={"city"}
                  shape={"smooth"}
                />
                <Geom
                  type="point"
                  position="month*temperature"
                  size={4}
                  shape={"circle"}
                  color={"city"}
                  style={{
                    stroke: "#fff",
                    lineWidth: 1,
                  }}
                />
              </Chart>
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}
