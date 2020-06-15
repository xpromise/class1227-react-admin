import React, { Component } from "react";
import { Card, Radio } from "antd";
import { DonutChart } from "bizcharts";

export default class Search extends Component {
	state = {
		radioValue: "all",
		data: [],
	};

	componentDidMount() {
		setTimeout(() => {
			// 数据源
			const data = [
				{
					type: "分类一",
					value: 27,
				},
				{
					type: "分类二",
					value: 25,
				},
				{
					type: "分类三",
					value: 18,
				},
				{
					type: "分类四",
					value: 15,
				},
				{
					type: "分类五",
					value: 10,
				},
				{
					type: "其它",
					value: 5,
				},
			];

			// console.log(data);

			this.setState({ data });
		}, 1000);
	}

	onRadioChange = (e) => {
		this.setState({
			radioValue: e.target.value,
		});
	};

	render() {
		const { radioValue, data } = this.state;
		return (
			<Card
				title="销售额类型占比"
				extra={
					<Radio.Group onChange={this.onRadioChange} value={radioValue}>
						<Radio.Button value="all">全部渠道</Radio.Button>
						<Radio.Button value="line">线上</Radio.Button>
						<Radio.Button value="shop">门店</Radio.Button>
					</Radio.Group>
				}
			>
				<DonutChart
					data={data}
					// title={{
					// 	visible: true,
					// 	text: "环图",
					// }}
					forceFit
					// description={{
					// 	visible: true,
					// 	text: "环图的外半径决定环图的大小，而内半径决定环图的厚度。",
					// }}
					statistic={{
						visible: true,
						totalLabel: "销售额",
					}}
					radius={0.8}
					padding="auto"
					angleField="value" // 扇形区域的值
					colorField="type" // 扇形区域的颜色
				/>
			</Card>
		);
	}
}
