import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

// 鸭子类型,面向接口编程. 而不是面向对象编程. 也就是我需要 abc 你给我abcdefg 也行. 满足我需要的就可以,多出来的无所谓(不管是否使用到).
export const RegisterScreen = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    // 调用注册
    register({ username, password });
  };

  //   写法 AppProvider 之后  就像vue 调用store.xxx 就可以了
  const { register } = useAuth();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" name="" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" name="" id={"password"} />
      </div>
      <button type={"submit"}>注 册</button>
    </form>
  );
};
