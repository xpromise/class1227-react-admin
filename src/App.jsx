import React from "react";
import { Router } from "react-router-dom";
// 引入antd的国际化配置，来完成antd组件国际化
import { ConfigProvider } from "antd";
import enUS from "antd/es/locale/en_US";
import zhCN from "antd/es/locale/zh_CN";
// 引入自定义国际化方案
import { IntlProvider } from "react-intl";
import { zh, en } from "./locales";
import { connect } from "react-redux";

import history from "@utils/history";

import Layout from "./layouts";
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";

function App({ language }) {
	const messages = language === "en" ? en : zh; // 自定义的方案
	const locale = language === "en" ? enUS : zhCN; // antd的方案

	return (
		<Router history={history}>
			<ConfigProvider locale={locale}>
				<IntlProvider
					locale={language} // 当前语言环境
					messages={messages} // 加载使用的语言包
				>
					<Layout />
				</IntlProvider>
			</ConfigProvider>
		</Router>
	);
}

export default connect((state) => ({ language: state.language }))(App);
