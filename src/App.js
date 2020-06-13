import React from "react";
import { Router } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { zh, en } from "./locales";

import history from "@utils/history";

import Layout from "./layouts";
// 引入重置样式（antd已经重置了一部分了）
import "./assets/css/reset.css";

function App() {
  const locale = "zh";
  const messages = locale === "en" ? en : zh;

  // console.log(messages);

  return (
    <Router history={history}>
      <IntlProvider
        locale={locale} // 当前语言环境
        messages={messages} // 加载使用的语言包
      >
        <Layout />
      </IntlProvider>
    </Router>
  );
}

export default App;
