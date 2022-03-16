import { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { cleanObject, useDebounce } from "../../utils";
import { TsReactTest } from "./test-array";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

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

  // 使用集成,和封装了的 fetch hook
  const client = useHttp();

  useEffect(() => {
    // client(["projects", { data: cleanObject(debounceParams) }]); // 因为需要一个元组  所以才说是需要一个函数/  那如果不想要这种元组的传值方式.
    // 怎么办? 就是在 [endpoint, config]: Parameters<typeof httpRequst> 的时候用 ... 进行解构.  这样就可以了

    client("projects", { data: cleanObject(debounceParams) }).then(setList); //then(result=> setList(result))  // 直接setList就行,不用函数再调用

    // fetch(`${apiUrl}/projects`).then(async (response) => {
    //   if (response.ok) {
    //     setList(await response.json());
    //   }
    // });
    //// @ts-ignore --- 加上这句可以忽略检查
  }, [debounceParams]); // 后面[param] 的意思是,当param改变的时候,才会去触发 useEffect 这个hook

  // 初始化 users
  useEffect(() => {
    client("users", {}).then(setUsers);
    // fetch(`${apiUrl}/users`).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  }, []);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List list={list} users={users}></List>
      {/* <TsReactTest></TsReactTest> */}
    </Container>
  );
};

// 结构太贴边-- 加边距

const Container = styled.div`
  padding: 3.2rem;
`;

// 元组形式的数组的好处就是 长度固定,所以解构的时候可以随便改名字
/* 比如

    let a = [1,"w",true ]  
    //解构就可以
    let [isOne,isW, isBoolean] = a;  // 完全可以这样取值. 因为固定长度. 所以能匹配得上  

    //但是只有元组类型才得  不然对象解构改名字的形式不变.


  任何类型都可以赋值给 unknown , 但是unknown 不能赋值给任何类型
*/

export default ProjectScreen;
