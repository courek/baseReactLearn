import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadDevTools } from "jira-dev-tool";
import { AppProviders } from "context";

// 改成使用jira-dev-tool模拟数据之后,去掉了所有的 json-server形式的数据模拟.

// 开始使用jwt(json web token)技术,其实就是token验证等等

loadDevTools(() => {
  ReactDOM.render(
    <React.StrictMode>
      {/* 这个是自定义 context */}
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
