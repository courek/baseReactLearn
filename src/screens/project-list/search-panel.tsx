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
    <Form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "300px",
          margin: "10px auto",
        }}
      >
        <Input
          type="text"
          value={param.name}
          onChange={(event) =>
            setParam({
              ...param,
              name: event.target.value,
            })
          }
        />
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
      </div>
    </Form>
  );
};
