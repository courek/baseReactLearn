// 拿来统一管理 页面的loading/error

import { useState } from "react";

interface State<T> {
  error: Error | null;
  data: T | null;
  status: "idle" | "loading" | "error" | "success";
  // 异步操作没有发生 idle状态   正在发生 loading, 后面两个就是成功和失败了
}
// 默认的 state
const defaultInitialState: State<null> = {
  status: "idle",
  data: null,
  error: null,
};

// 也就是添加一个 配置功能
const defaultConfig = {
  throwOnError: false,
};

// 用户可以自己传入的initialState
export const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState,
  });

  const config = { ...defaultConfig, initialConfig }; // 这样写在后面是 可以用自己传入的值来进行覆盖的

  // 设置数据用的
  const setData = (data: T) =>
    setState({
      data,
      status: "success",
      error: null,
    });
  // 设置错误用的
  const setError = (error: Error) =>
    setState({
      error,
      status: "error",
      data: null,
    });

  // Promise 就是个容器,所以需要一个 传入的类型,这个类型就是上面定义的T
  // run 用来触发异步请求.
  const run = (promise: Promise<T>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入promise类型数据");
    }
    // 刚触发的时候就要设置loading了
    setState({ ...state, status: "loading" });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        // 遇到了异常 -- 会消化异常,第一个catch碰到异常之后 后面的所有catch都不会再收到异常
        // 如果不主动抛出,外面是不会再能接收到异常的
        setError(error);
        //  所以光 return error 是不行的  需要 Promise.reject(error)
        // 但是我们不能每次都抛出异常 有时候error是很好用的 所以就需要加上一个配置 来判断什么时候需要什么
        if (config.throwOnError) {
          return Promise.reject(error);
        }
        return error;
      });
  };
  // 最后这个hook返回什么?  我们给他四个状态
  return {
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isSuccess: state.status === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
