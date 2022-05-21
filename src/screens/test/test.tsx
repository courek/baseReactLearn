import { useEffect, useState } from "react";
import { useMount } from "utils";

// 这个页面主要用来理解 react 中hook 和闭包的问题
export const Test = () => {
  const [num, setNum] = useState(0);

  const add = () => setNum(num + 1);

  // 这里也不能使用 useMount了
  //   useMount(() => {
  //     setInterval(() => {
  //       console.log("setInterval-" + num);
  //     }, 1000);
  //   });

  useEffect(() => {
    //每当num变化就会生成一个新的定时器
    const id = setInterval(() => {
      console.log("setInterval-" + num);
    }, 1000);
    return () => clearInterval(id); // 每次清理都执行清除定时器
  }, [num]);

  // 因为这里返回了函数产生了闭包,所以每次都只会调用 一开始初始化的值,而不是参数变化后的最终结果值
  useEffect(() => {
    return () => {
      console.log("useEffect-" + num);
    };
  }, [num]); // 处理这个问题也简单,就是这里面调用了num 你第二个参数依赖num  就去监听他就好了, 这样就会拿到num最新的值了
  // 所以如果在useEffect 里面发现有问题,一定要先检查 依赖项填了没有
  return (
    <>
      <div>
        <button onClick={add}></button>
      </div>
    </>
  );
};

// 使用纯函数来理解-- 组件抽象成纯函数
const test = () => {
  let num = 0;
  const effect = () => {
    num += 1;
    const message = `现在的num的值${num}`;
    return function unmount() {
      console.log(message);
    };
  };
  return effect;
};

const add = test(); // 执行test 返回了effect函数
const unmount = add(); // 执行effect函数 返回引用了message1的unmount函数

// 第二次调用执行创建的 message  已经不是第一次调用的message了
add(); // 执行加法--- 再次执行effect函数,返回引用了message2的unmount函数
add(); //message3
add(); //message4
add(); //message5

// 调用unmount, 他引用的是几呢? 那肯定是message1= 那被定义的是值就是1 ,所以打印的结果就是1了
unmount(); // 调用输出  -- 按照正常思维 应该感觉会打印3, 实际上打印的是1
