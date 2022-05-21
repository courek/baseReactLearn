// 用来处理错误边界的捕获 ,可以直接使用现有的库  这里是来看,如何自己写一个

import React from "react";

// 一般是直接使用react-error-boundary 的库 https://github.com/bvaughn/react-error-boundary

// 错误边界的实现 一定要class components 形式来实现
// 两个范型 第一个P = props  第二个 s = state
// props 当然就是代表使用组件时候,需要传入的属性了.
// childer
// FallBackRender  ---发生错误的时候显示一个页面,而不是显示一个空白的页面了   因为react 在渲染阶段,如果出现了渲染异常 那么整个组件树都会被卸载掉 react16之后
// 使用备用方案, 错误提示页面 缺省页
// export class ErrorBoundary extends React.Component<any, any> {}

//这里传的error就是我们渲染错误的时候 抛出的异常
type FallBackRender = (props: { error: Error | null }) => React.ReactElement; // 其实就是传一个组件来显示的意思了
// export class ErrorBoundary extends React.Component<
//   {
//     childer: ChildNode;
//     FallBackRender: FallBackRender;
//   },
//   {error:Error}  //错误
// > {}    这样写可能会太长,也就是每次都要写一个 [ childer: ChildNode;] 如果经常使用就会显得很麻烦, 可以用react内置的一个 方法
// 其实长度不会见的短多少,只是会显得统一一点 更高大上的写法

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{
    fallbackRender: FallBackRender; //传入的范型,就是出了childer之外的其他 类型
  }>,
  { error: Error | null }
> {
  // class 形式和函数式形式的state不一样
  state = { error: null };
  //   constructor(
  //     props: React.PropsWithChildren<{ FallBackRender: FallBackRender }>
  //   ) {
  //     super(props);
  //     this.state = { error: null };
  //   }
  // 定义一个错误边界,标准的静态方法
  // 这样什么意思?  也就是当这个ErrorBoundary的子组件,发生了那种渲染错误的情况, 这个方法就会接收到error,并且被调用
  // 返回的值就会被赋值给state  也就是当子组件发生异常了,state里面的error就不再是null了
  static getDerivedStateFormError(error: Error) {
    // 这个方法需要跟官方说的名字一样 不然不会生效的
    return { error };
  }
  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props; //读取传回来显示的错误内容

    // 有错误 输出错误
    if (error) {
      return fallbackRender({ error });
    }

    return children; // 没错误输出正常
  }
}
