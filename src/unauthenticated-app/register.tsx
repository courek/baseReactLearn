import { useAuth } from "context/auth-context";
// import { FormEvent } from "react";

import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

interface ErrorType {
  onError: (error: Error) => void;
}
export const RegisterScreen = ({ onError }: ErrorType) => {
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // 如果有确认密码  那就需要再多加一个值了
  const handleSubmit = ({
    // 这样写属于解构,单独把确认密码提取出来  因为他不参与服务之间的操作
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("请确认两次输入的密码相同"));
      return;
    }
    // 什么时候调用错误监听? 肯定是怀疑要出错的地方了
    // try {
    //   register(values); // 调用注册
    // } catch (e) {
    //   onError(e);
    // }
    // 如果不喜欢 try catch的话  就直接用promise的 catch监听也行  --login 部分类似
    // 多了一个loading 包裹
    run(register(values)).catch(onError);
  };
  const { register } = useAuth();
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" name="" id={"username"} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder="密码" type="password" name="" id={"password"} />
      </Form.Item>
      {/* 这里新增一个模块,也就是注册的时候密码验证 */}

      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: "请输入确认密码" }]}
      >
        <Input
          placeholder="确认密码"
          type="password"
          name=""
          id={"cpassword"}
        />
      </Form.Item>

      <Form.Item>
        <LongButton loading={isLoading} htmlType="submit" type="primary">
          注 册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
