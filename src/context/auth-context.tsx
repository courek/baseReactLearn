import { useState } from "react";
import React from "react";

import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { httpRequst } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallBack, FullPageLoading } from "components/lib";

interface AuthForm {
  username: string;
  password: string;
}

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext"; // 其实实际项目中没啥作用的

// bootsterap 就是启动初始化的意思 - -,
// 作用就是初始化user
const bootsterapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await httpRequst("me", { token });
    user = data.user;
  }
  return user;
};

// 跟写vuex 的modules 差不多意思
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null); //传入范型
  //  但是这样会有问题, 就是刷新就会把user 变成了null  所以需要user的持久化才行.

  // 就是引入(全部+改名),然后直接赋值  调用
  // 登陆
  //   const login = (form: AuthForm) => auth.login(form).then((user) => setUser(user));  // 这种可以直接省略的  函数式编程嘛

  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  // 注册
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  // 登出
  const logout = () => auth.logout().then(() => setUser(null)); // 作用就是登出清空

  // 整个app 加载的时候 -- 也就是说这个页面 跟vue里面的 permission.js 差不多
  // --- 因为做了一个公共的loading useAsync  所以用那个来进行改造一下

  // 旧的方法模式
  // useMount(() => {
  //   bootsterapUser().then(setUser);
  // });

  // 使用useAsync 改造
  useMount(() => {
    run(bootsterapUser());
  });

  // 当开始的时候或者加载的时候
  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  // 如果出现错误 -- 提示一个全局的错误信息
  if (isError) {
    return <FullPageErrorFallBack error={error} />;
  }

  return (
    // 写完 children 之后记得给他.
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }} // 这里 如果上面定义的AuthContext 是undefined,那这样设置就会出问题,所以初始化的时候还是要给一个范型.
    ></AuthContext.Provider>
  );
};

// 添加一个 user 自定义的hook.  大部分对我们来说最有用的还是这个 useAuth
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用.");
  }
  return context;
};
