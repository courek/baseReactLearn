// 以前用redux 对数据做全局管理,但是出现 hook后 就有了context,可以使用 context放置和管理全局,不经常改动的数据  比如token

import React from "react";
import { AuthProvider } from "./auth-context";

// AppProviders 就是我们整个项目的,在根结点上的
// 也就是app级别的 provider 都可以统一写在这里.  也就是哪里需要有数据全局共享的话,都可以写成一个 provider 然后放在这里
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  // children 就是他被包裹的子组件

  // return <AuthProvider>{children}</AuthProvider>;
  return <AuthProvider children={children} />; // 报错是指AuthProvider没有指定类型要我们传  所以去写就好了
  // 所以定义 AuthProvider的时候也要给他一个  {children}
};
