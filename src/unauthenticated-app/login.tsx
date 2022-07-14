import { useAuth } from "context/auth-context";

// 异步引入组件
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

// 使用antd 改造
interface ErrorType {
  onError: (error: Error) => void;
}
export const LoginScreen = ({ onError }: ErrorType) => {
  // 因为antd 帮处理了. 所以就普通就好了 不用写什么FormEvent<HTMLFormElement>
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  // 由 Form.Item 定义的name属性推断,知道你是要string还是number

  // 使用loading
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  // 这个方法里面其实写了一个error的 但是因为异步操作,如果跟同步操作混用,不能很准确的判断
  // 但是用在纯异步的情况下就很好用
  /*
    error ? error.message : ''  // 比如这样 -- 但是其他时候就不要跟同步代码混用了
  */

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    console.log(values, "values");
    run(login(values)).catch(onError); // 因为这样写就没办法拿到报错信息了--
    // 把因为useAsync内部自己消化了一次catch  加上手动抛出错误后就可以这样使用了

    // 也就是说同步跟异步混用的时候  需要使用try catch 去判断,而不能直接使用error来判断

    // 还是不用try方式 好看
    // try {
    //   await run(login(values));
    // } catch (e) {
    //   onError(e as Error);
    // }
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
        <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
          登 录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
