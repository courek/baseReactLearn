// 写一个react组件,先找他的状态.
// import { useEffect, useState } from "react";

// 传参过来后 子组件接收
export const SearchPanel = ({ users, param, setParam }) => {
  // 比如需要一个 input的状态.  select的列表状态  (其实就是数据)
  //   const [param, setParam] = useState({
  //     name: "",
  //     personId: "",
  //   });
  // const [users, setUsers] = useState([]);

  // 这部分移到 伏组件去
  //   const [list, setList] = useState([]); //  这个在这里创建,但是table组件独立  所以涉及到状态提升了.  所以需要把这个 状态提升到父组件里,然后让他在流到对应的子组件去
  //   //然后当  param 改变的时候,应该去请求项目列表的接口.
  //   useEffect(() => {
  //     // 这里就去写 请求接口的代码了
  //     fetch("").then(async (response) => {
  //       if (response.ok) {
  //         // 当请求成功的时候,要把这个数据保存下来  所以又是少了状态 ()
  //         setList(await response.json);
  //       }
  //     });
  //   }, [param]); // 后面[param] 的意思是,当param改变的时候,才会去触发 useEffect 这个hook

  return (
    <form action="">
      <div>
        {/* setParam(Object.assign({},param,{name: event.target.value}))  与下面等价*/}
        <input
          type="text"
          value={param.name}
          onChange={(event) =>
            setParam({
              ...param, // 先把自身进行解构. 然后再修改对应的值.
              name: event.target.value,
            })
          }
        />
        <select
          value={param.personId}
          onChange={(event) =>
            setParam({
              ...param,
              personId: event.target.value,
            })
          }
        >
          <option value={""}>负责人</option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
