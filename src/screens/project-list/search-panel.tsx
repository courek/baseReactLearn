/** @jsxImportSource @emotion/react */
// 文件头部加上这句  才能使用emotion的css={{}}
//指定成这种文件才能  用css={{}} 这种方式替换 style={{}}  也就是用emotion代替react 自带的style  因为emotion比较强大
// 所有之前知识点记录 看js. ts部分之后,删除历史,只记录ts部分的笔记

import { Input, Select } from "antd";
import { Form } from "antd";

// 写组件给别人使用  告诉别人需要什么,那就等于是写说明  因此要加上接口.
export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void; // 可以直接读取自己定义的类型中的属性
}

// 传参过来后 子组件接收
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form
      layout={"inline"}
      css={{
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
    >
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(event) =>
            setParam({
              ...param,
              name: event.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option value={user.id} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
