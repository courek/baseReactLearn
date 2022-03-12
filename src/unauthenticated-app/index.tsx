// 这个文件夹下,放置的是未登录状态下的app  也就是不用登录就能看到的那种
// 就比如 登录,注册页面之类的.

import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedApp = () => {
  //定义一个状态,状态是用来进行 登录和注册进行切换的

  const [isRegister, setIsRegister] = useState(false);

  return (
    <>
      {isRegister ? (
        <RegisterScreen></RegisterScreen>
      ) : (
        <LoginScreen></LoginScreen>
      )}

      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "登陆" : "注册"}
      </button>
    </>
  );
};
