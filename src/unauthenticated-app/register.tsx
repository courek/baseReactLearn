import { useAuth } from "context/auth-context";
import { FormEvent } from "react";

import { Button, Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";

export const RegisterScreen = () => {
  const handleSubmit = (values: { username: string; password: string }) => {
    // 调用注册
    register(values);
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
        rules={[{ required: true, message: "请输入用密码" }]}
      >
        <Input placeholder="密码" type="password" name="" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType="submit" type="primary">
          注 册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
