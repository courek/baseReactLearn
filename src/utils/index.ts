// 在一个函数里,改变传入的对象本身是不好的, 也就是写函数的时候,不要污染传入的对象.

import { useEffect, useRef, useState } from "react";

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
// react hook  和闭包, hook 与闭包经典的坑
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true // 表示页面卸载的时候
) => {
  // const oldTitle = document.title; // 这里因为 useEffect 每次都更新了依赖所以需要 useRef进行存储
  // useRef 保存的值,在组件的整个声明周期中都是不会变化的.

  const oldTitle = useRef(document.title).current; // .current 是读取的值,  vue3的ref .value就是抄的这个
  // 也就是说 useRef 是可以持久化变量的

  //页面加载时: oldTitle === 旧title 'React App'  // 这个部分的注释是在没有使用 useRef 的情况下. 使用了useRef 就正常流程了
  // 加载后: oldTitle === 新title (传入的title)

  useEffect(() => {
    document.title = title;
  }, [title, oldTitle, keepOnUnmount]);

  // useMount()   //这个是开始时会执行

  // 这个是渲染都会执行?
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        //卸载时,如果不指定依赖,读到的就是旧的title
        document.title = oldTitle;
      }
    };
    // 但是这里添加依赖之后,就没办法保存旧的title了   所以使用react内部支持的 useRef
    // useRef 能存储,并且 修改 ref 的值是不会引发组件的重新 render
  }, [oldTitle, keepOnUnmount]); // hook中返回函数  容易产生闭包问题,记得添加依赖项
  // 也就是说,useEffect 内部需要什么使用什么变量,尽量去监听这几个变量(添加依赖)  不然可能会造成错误
};

// 上述这些是能实现,但是对接手代码的人不友好(水平不够,理解不了闭包的那种)  所以改成直接点的, 如下:
