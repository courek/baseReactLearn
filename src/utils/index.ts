// 在一个函数里,改变传入的对象本身是不好的, 也就是写函数的时候,不要污染传入的对象.

import { useEffect, useState } from "react";

// 自己写的
// const cleanObject = (object) => {
//   if (object) return "";
//   let orginObj = { ...object };
//   let obj = {};
//   Object.keys(orginObj).map((v) => {
//     if (object[v]) {
//       obj[v] = object[v];
//     }
//   });
//   return obj;
// };

// 跟着写的

//辅助函数
const isFalsy = (value: any) => (value === 0 ? false : !value);
export const cleanObject = (object: { [s: string]: any }) => {
  const result = { ...object };
  Object.keys(result).map((key) => {
    const value = result[key];
    // 这样写 当value 等于 0的时候就会也删掉了,那是不对的.  所以又做了辅助函数-- (那还是我的写法可靠点?)
    // if(!value)
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

// 页面加载的时候执行的一个函数. 自己写hook的时候必须 use开头 不然就会报错了 主要是eslint的问题.
// 自带的hook,或者自己写的hook,都不可以在函数中运行的.  只能在 1.其他的hook中运行, 2.组件中运行
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// // 函数截流 --- 普通形式, 但是使用起来,嵌套太严重,需要进行优化.
// export const debounce = (func, delay) => {
//   let timeout = null;
//   return (...params) => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(() => {
//       func(...params);
//     }, delay);
//   };
// };

// 方便形式的hook,高级到看不懂.  一个custom hook是需要在里面用到其他的hook 如果都用不到hook 那没必要写hook 函数也挺好的

// export const useDebounce = (value: unknown, delay?: number): any => {  // 每家范型 约束
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // 每次在value变化后才会设置数据
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 这个返回的清除, 是在上一次 useEffect 运行完成了之后去执行的.  这里是负责清理上一次的定时器的任务.
    return () => clearTimeout(timeout);
  }, [value, delay]);
  // 状态在react意味着他需要是响应式的.
  return debounceValue;
};
