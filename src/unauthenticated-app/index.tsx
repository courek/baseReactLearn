// 这个文件夹下,放置的是未登录状态下的app  也就是不用登录就能看到的那种
// 就比如 登录,注册页面之类的.

import { Button, Card, Divider } from "antd";
import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

import styled from "@emotion/styled";

// 加上一个自定义的头部

import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

// 修改ui库的Card, 这样,这里面的样式就会被应用到 Card 里面了
// 然后把Card 改成ShadowCrad 就行了
const ShadowCrad = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 10px;
  text-align: center;
`;

// 写左右两边的背景
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  /* 决定了背景图片是否会随着我们页面的滑动而一起滑动 */
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  /* 左边和右边一样  所以平铺 */
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem) cover;
  background-image: url(${left}), url(${right});
`;

// 在写个标题
const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

// 希望 登录和注册的按钮一样  所以写一个统一的

export const LongButton = styled(Button)`
  width: 100%;
`;

export const UnauthenticatedApp = () => {
  //定义一个状态,状态是用来进行 登录和注册进行切换的

  const [isRegister, setIsRegister] = useState(false);

  return (
    // <div style={{ display: "flex", justifyContent: "center", }} > </div>  // 然后用emotion的形式去修改行内样式
    // emotion 形式,当组件来用就好了.  但是这个是自己加的独立div样式
    // 如果我要改的是 antd的Card组件的样式呢?
    <Container>
      <Header />
      <Background />

      <ShadowCrad>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        {isRegister ? <RegisterScreen /> : <LoginScreen />}
        <Divider />
        <a href="/#" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "已经有账号了?直接登录" : "没有账号?去注册"}
        </a>
      </ShadowCrad>
    </Container>
  );
};
