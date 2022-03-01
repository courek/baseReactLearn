// 新版本之后 不用每个页面都引入React了

export const List = ({ users, list }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            {/* 后端不一定会直接返回给你,直接能用的数据, 可能只返回一个id 让你自己匹配
                因为后端会尽量以最少的且最精确的,传回给前端.   这部分使用hash模式,也就是没有 persionName的 需要自己弄数据结构.
                类似这种表和表的链接,都是用id来关联.
            */}
            {/* <td>{item.persionName}</td> */}
            <td>
              {users.find((user) => user.id === item.personId)?.name || "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

//  使用custom hook 提取并且复用组件代码
