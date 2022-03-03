import { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "../../utils";
import { TsReactTest } from "./test-array";

// 给json-server 配置中间件.  因为像 api/login  这种接口就不满足restapi 形式

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debounceParams = useDebounce(param, 500); // 函数截流的 hook 结合体

  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/projects`).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
    //// @ts-ignore --- 加上这句可以忽略检查
  }, [debounceParams]); // 后面[param] 的意思是,当param改变的时候,才会去触发 useEffect 这个hook

  // 初始化 users
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List list={list} users={users}></List>
      <TsReactTest></TsReactTest>
    </div>
  );
};

// 元组形式的数组的好处就是 长度固定,所以解构的时候可以随便改名字
/* 比如

    let a = [1,"w",true ]  
    //解构就可以
    let [isOne,isW, isBoolean] = a;  // 完全可以这样取值. 因为固定长度. 所以能匹配得上  

    //但是只有元组类型才得  不然对象解构改名字的形式不变.


  任何类型都可以赋值给 unknown , 但是unknown 不能赋值给任何类型
*/

export default ProjectScreen;
