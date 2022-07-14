// 新版本之后 不用每个页面都引入React了

import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { User } from "./search-panel";

/*
  react-router 和 react-router-dom的关系类似于
  react 和react-dom/react-native/react-vr  等等

  react 只处理虚拟计算的,理论的逻辑, 比如state 的状态之类的 / useMount的处理,来怎么去影响我们的虚拟dom树,虚拟dom区别的diff运算等等
  然后经历一系列的计算得出的结果,就会被react-dom进行消费/  为什么不和起来,因为react-dom只生活在浏览器环境的宿主里.里面充满了dom操作

  以此类推,react-router 和 react-router-dom 也是一个专门处理数据,一个处理结果数据后的渲染.  或者其他环境下的消费

*/

export interface ListItem {
  id: number;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

// 定义列表的时候让他继承所有table的所有属性.
interface ListProps extends TableProps<ListItem> {
  users: User[];
  // list: ListItem[];  // 因为直接使用 table的属性了  所以不需要list了  table中有一个 dataSource
  // 然后之前的 dataSource ={list}  就可以删掉了.
}

// 换成antd 带有的表格组件
// 还要安装一个处理时间的库 dayjs
// 修改之后 这里的props 就等于是 type PropType =  Omit<ListProps,'users'>
// 这样剩下的都是 TableProps  所以只要是 TableProps 支持的属性,你都可以直接传进来了 不用自定义一个loading然后传入
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          // dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name), // 按字母 顺序排序 localeCompare 可以排序中文字符
          // 给名称加一个超链接 所以不能用dataindex  ;
          render(value, project) {
            //  因为这个是在Project之后的子路由  所以它会自己拼接上去的
            return <Link to={project.id + ""}>{project.name}</Link>;
          },
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
                {users.find((user) => user.id === +item.personId)?.name ||
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
      {...props}
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
