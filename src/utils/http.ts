// 对fetch 请求,进行统一的抽象. 封装

import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

//endpoint 接口字段名
// {data,token,headers} 这些统一叫 customConfig

// RequestInit 类型中 没有 data,token  所以需要定义新的类型 继承

interface CustomParamConfig extends RequestInit {
  data?: object;
  token?: string;
}

export const httpRequst = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: CustomParamConfig = {}
  // 解构之后不能使用 ? 可选属性了,只好赋值一个默认值. 当一个参数有默认值的之后 又变成了可选了
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "", // 加上 Bearer是标准的格式.
      "Content-Type": data ? "application/json" : "",
    },
    // 因为这个写在后面,如果传入其他自定义的值,重复的话  会被覆盖掉. 就可以使用自定义的值了
    ...customConfig,
  };

  //fetch 的git请求是需要拼到url上的  好像什么http请求都是的捏...

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data);
  }

  //axios 和 fetch 表现不一样. axios可以直接在返回状态不是2xx的时候 抛出异常.  可axios核心就是XMLHttpRequest对象的错误处理行为.
  // 而fetch 新的webapi 不会帮你处理错误
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      // 处理情况 --- 这种情况建议使用 restful api的规范   也就是用浏览器响应的状态码.  而不是自定义返回什么都是200  然后再通过里面的一个code值去判断是否成功.
      // 当然 也不是不可以
      if (response.status === 401) {
        // 没有登录的状态
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }

      const data = await response.json();
      if (response.ok) {
        return data;
        // Promise.resolve(data);
      } else {
        // 为什么要手动抛出错误? fetch 会自动抛出吗? 不会,所以需要你手动抛出异常,方便自己捕获服务端给我们的异常,用去catch监听. fetch只有断网,网络连接失败的时候 fetch 才会抛出异常
        // 看文档. XMLHttpRequest 才会啥异常都抛出
        Promise.reject(data);
      }
    });
};

// 上面的方法有缺陷,token需要自己传  那很不方便.
// 所以写成了一个hook  因为里面要使用到别的hook
export const useHttp = () => {
  const { user } = useAuth(); // 因为是全局的 context 所以全局都可以拿到
  // 里面这个就是tuplm 类型  也就是所谓的元组

  return (...[endpoint, config]: [string, CustomParamConfig]) =>
    httpRequst(endpoint, { ...config, token: user?.token });
  // 那有没有办法 可以不用自己写[string, CustomParamConfig] 这种形式才知道需要什么类型呢?  那就只好用内置类型 parameters 内置类型. TS中的操作符
  // 如下
  // return ([endpoint, config]: Parameters<typeof httpRequst>) =>{}    // 这样就能得到所有 httpRequst 的传参的所有 参数类型了.
};
