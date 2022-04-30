// 一些操作 jwt的 函数
// 在真实环境中,如果使用 firebase 这种第三方auth服务的话,本文件不需要开发者开发.
// 不过存储 token这种东西基本还是要处理的

import { User } from "./screens/project-list/search-panel";

const localStorageKey = "__AUTH_PROVIDER_TOKEN__";
const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handlerUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

// 登陆
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handlerUserResponse(await response.json());
    } else {
      //  Promise.reject 跟直接输出一个Error类型的错误相似
      // console.log(await response.json(), "data");
      return Promise.reject(await response.json());
    }
  });
};

// 注册
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handlerUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

// 退出
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);

export default localStorageKey;
