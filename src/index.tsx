import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// 改成使用jira-dev-tool模拟数据之后,去掉了所有的 json-server形式的数据模拟.
import { loadDevTools } from "jira-dev-tool";
import { AppProviders } from "context";

// 引入antd
import "antd/dist/antd.less"; // 因为要自定义 antd的主题变量,所以才要这样引入 需要在jira-dev-tool 后面引入,因为会冲突.(除非不使用jira-dev-tool)

// 然后使用 craco 依赖,来进行对create-react-app这个命令生成的文件的一些默认配置  yarn add  @craco/craco
/*
  然后 需要把 package.json文件的 react-scripts start  替换成 craco 

  antd 文档的高级用法里面有使用方法.

*/

// 安装emotion  yarn add @emotion/react  yarn add @emotion/styled  需要安装一下 vscode-styled-component 插件 才有语法提示
// https://marketplace.visualstudio.com/items?itemName=diegolincoln.vscode-styled-components  这个插件才是对的

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
