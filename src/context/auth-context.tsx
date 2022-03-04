import { useState } from "react";
import React from "react";

import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";

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

// 跟写vuex 的modules 差不多意思
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); //传入范型

  // 就是引入(全部+改名),然后直接赋值  调用
  // 登陆
  //   const login = (form: AuthForm) => auth.login(form).then((user) => setUser(user));  // 这种可以直接省略的  函数式编程嘛

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  // 注册
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  // 登出
  const logout = () => auth.logout().then(() => setUser(null)); // 作用就是登出清空

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
