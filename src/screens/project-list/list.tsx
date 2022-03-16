// 新版本之后 不用每个页面都引入React了

import { Table } from "antd";
import dayjs from "dayjs";
import { User } from "./search-panel";

interface ListItem {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps {
  users: User[];
  list: ListItem[];
}

// 换成antd 带有的表格组件
// 还要安装一个处理时间的库 dayjs
export const List = ({ users, list }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name), // 按字母 顺序排序 localeCompare 可以排序中文字符
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人", // 没办法直接使用 dataindex 显示
          render(value, item) {
            return (
              <span>
                {users.find((user) => user.id === item.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, item) {
            return (
              <span>
                {item.created ? dayjs(item.created).format("YYYY-MM-DD") : "无"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    >
      {" "}
    </Table>
    // <table>
    //   <thead>
    //     <tr>
    //       <th>名称</th>
    //       <th>负责人</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {list.map((item) => (
    //       <tr key={item.id}>
    //         <td>{item.name}</td>
    //         {/* 后端不一定会直接返回给你,直接能用的数据, 可能只返回一个id 让你自己匹配
    //             因为后端会尽量以最少的且最精确的,传回给前端.   这部分使用hash模式,也就是没有 persionName的 需要自己弄数据结构.
    //             类似这种表和表的链接,都是用id来关联.
    //         */}
    //         {/* <td>{item.persionName}</td> */}
    //         <td>
    //           {users.find((user) => user.id === item.personId)?.name || "未知"}
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  );
};

//  使用custom hook 提取并且复用组件代码
