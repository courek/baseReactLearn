import { useAuth } from "context/auth-context";

// 异步引入组件
import { Button, Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";

// 使用antd 改造
export const LoginScreen = () => {
  // 因为antd 帮处理了. 所以就普通就好了 不用写什么FormEvent<HTMLFormElement>
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  // 由 Form.Item 定义的name属性推断,知道你是要string还是number
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  const { login } = useAuth();

  return (
    <Form onFinish={handleSubmit}>
      {/* rules 进行表单规则  表示用户名必须嘛,看文档就行了这种 */}
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="text" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton type={"primary"} htmlType={"submit"}>
          登 录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
