// 来学习一些  utility type .
// 也就是ts 内置的一些工具类型

import { type } from "os";

// 类型别名在很多情况下是可以和 interface 互换的.

// 区别是

/*
    type 可以定义的联合类型或者交叉类型等高级联合类型,但是 interface 是做不到的
    interface 也没办法实现 utility type
*/

//utility type的意思是 用范型给他传入一个其他类型,然后utility type对这个传入的类型进行某种操作

//

type Persion = { name: string; age: number; sex: string };

// const xiao:Persion = { name:'xiaoming'}   // 假设xiao 就是Persion 可是我不知道age字段的值. 那我总不能所有都把Persion 的age 改成可选属性吧?
// 有时候是不想改动任何,原来就有的类型, 有可能是他从第三方库引进来的. 有可能是为了代码整洁性啥的,不考虑侵入原来的类型.

// 那就 可以使用 Partial的形式传进来,就能把你想要改成可选属性的  改了.
const xiao: Partial<Persion> = { name: "xiaoming" };

// 那这个时候 我们需要一个类型,只有名字没有年龄,而且是必须有年龄的. 那Persion就不符合了且Partial处理后的也不符合,定一个新的又很浪费/麻烦.
const shenMiRen: Omit<Persion, "age"> = { name: "xiaoming", sex: "" }; // 这样就排除掉了 指定的某个字段  比如这里就是要删除掉 age 于是现在这个shenMiRen最后的类型其实是 {name:string}
const shenMiRen2: Omit<Persion, "age" | "name"> = { sex: "" }; // 如果我两个属性都不想要的话,直接第二个范型 写联合类型(你要排除的字段n个字符串,联合)

// 如果你想只要 name 属性的话 Pick 和 Omit 相反,一个是只要某一个,一个是排除 某一个.  Pick就是挑选某几个键值,然后组成新的类型
type PersionName = Pick<Persion, "name" | "sex">;

//
type PersionKeys = keyof Persion;
type age = Exclude<PersionKeys, "name">; // 把传入的PersionKeys 联合类型,通过过滤掉第二个参数  返回一个新的类型
// 也就是直接是排除某个 属性. 上面这个就是不要name属性了. Omit是操作键值对, Exclude则是操作联合类型,也可以这样写 Exclude<keyof Persion, "name">
// Omit 是由 Exclude+Pick 联合在一起的 比较复杂.

export default "";
