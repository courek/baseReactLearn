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

//  作业 实现 useArray ---  上面自己实现
export const useArray = <T>(initialArray: T[]) => {
  // 返回的value 是个数组

  // let array = { ...value };
  type Item = keyof T; // 获取数组的子项类型
  // type arrayItem = Item[number]
  interface ReObject {
    value: T[];
    clear: () => void;
    removeIndex: (number: number) => void;
    add: (item: T) => void;
  }
  let [presionArray, setPresionArray] = useState(initialArray);
  const [result, setResult] = useState<ReObject>({
    value: presionArray,
    clear: () => {
      presionArray = [];
      setPresionArray(presionArray);
    },
    removeIndex: (number) => {
      presionArray.splice(number, 1);
      setPresionArray([...presionArray]);
    },
    add: (item: T) => {
      presionArray.push(item);
      setPresionArray([...presionArray]);
    },
  });

  useEffect(() => {
    setResult({
      ...result,
      value: presionArray,
    });
    // console.log(presionArray, "// 肯定要坚挺这个的");
  }, [presionArray]);
  return result;
};

//  作业 实现 useArray ---  跟学实现,对比差别...  很简单,是我想得太复杂..  果然还是不熟悉react
export const useArray2 = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value]; // 浅拷贝
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};

// 增加一个自动修改 文档标题
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true // 表示页面卸载的时候
) => {
  const oldTitle = document.title;

  useEffect(() => {
    document.title = title;
  }, [title, oldTitle, keepOnUnmount]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, []);
};
