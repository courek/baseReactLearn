import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

// const apiUrl = process.env.REACT_APP_API_URL;

// 鸭子类型,面向接口编程. 而不是面向对象编程. 也就是我需要 abc 你给我abcdefg 也行. 满足我需要的就可以,多出来的无所谓(不管是否使用到).
export const LoginScreen = () => {
  // React.FormEventHandler<HTMLFormElement>  // 编辑器提示是这个类型
  // 教程说的是 这个类型  FormEvent<HTMLFormElement>  //教程的才是对的

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // 因为event.currentTarget.elements[0] 是Elemen类型. 没有value属性.  而我们知道自己在干嘛 所以断言类型
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;

    // 调用登陆
    login({ username, password });
  };

  // const login = (params: { username: string; password: string }) => {
  //   //  先注册才能登陆  //register
  //   fetch(`${apiUrl}/register`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(params),
  //   }).then(async (response) => {
  //     if (response.ok) {
  //       console.log("之下完成");
  //       // setList(await response.json());
  //     }
  //   });
  // };

  //   写法 AppProvider 之后  就像vue 调用store.xxx 就可以了
  const { login, user, register } = useAuth();

  return (
    <form onSubmit={handleSubmit}>
      {/*
      react 里面是可以这样写的, 反正只要能编译 AST语法树就行了.  也就是说子节点只是父节点的一个属性
      <div
        children={
          <>
            <label htmlFor="username">用户名</label>
            <input type="text" name="" id={"username"} />
          </>
        }
      ></div> */}
      {/* 判断user了再显示 */}

      {user ? (
        <div>
          登录成功,用户名:{user?.name} {user.token}
        </div>
      ) : (
        ""
      )}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" name="" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" name="" id={"password"} />
      </div>
      <button type={"submit"}>登 录</button>
    </form>
  );
};
