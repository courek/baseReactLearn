import { useEffect, useState } from "react";
import { List, ListItem } from "./list";
import { SearchPanel } from "./search-panel";
import {
  cleanObject,
  useDebounce,
  useDocumentTitle,
  useMount,
} from "../../utils";
// import { TsReactTest } from "./test-array";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
// import { useAsync } from "utils/use-async";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";

// 给json-server 配置中间件.  因为像 api/login  这种接口就不满足restapi 形式

// const apiUrl = process.env.REACT_APP_API_URL;

// 处理 error错误 和添加 loading  --- 也就是处理在react中的异步问题

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  useDocumentTitle("项目列表"); // 如果没有路由管理的话就直接这样使用就好了

  const debounceParams = useDebounce(param, 500); // 函数截流的 hook 结合体

  // const [users, setUsers] = useState([]);  // 有了 useUsers hook 就不用了
  // 使用集成,和封装了的 fetch hook
  // const client = useHttp(); // 有了 useUsers hook 就不用了

  // 在没有写 useAsync hook的时候-- 需要的这三个
  // const [list, setList] = useState([]);
  // const [isLoading, setLoading] = useState(false); // 异常处理类似
  // const [error, setError] = useState<null | Error>(null);

  // 有了 useAsync hook之后

  // const { run, isLoading, data: list, error } = useAsync<ListItem[]>();  // 使用useAsync的情况

  const { isLoading, data: list, error } = useProjects(debounceParams); // 使用在封装的 useProjects的情况
  const { data: users } = useUsers();

  // 一般情况下的写法,就多一个loading变量 默认为false 请求开始就是ture,请求不管成功失败都改为false
  // 然后传到子组件去使用,是可以的  但是如果以后需要很多属性或者状态. 那一个个的传入就很难了   因为现在是react 已经状态提升了.
  // 所以有没有办法,可以一次性在这里写 然后能传透到里面去

  // 使用 useProjects之后 这块就可以删掉了  抽象出来后
  // useEffect(() => {
  //   // client(["projects", { data: cleanObject(debounceParams) }]); // 因为需要一个元组  所以才说是需要一个函数/  那如果不想要这种元组的传值方式.
  //   // 怎么办? 就是在 [endpoint, config]: Parameters<typeof httpRequst> 的时候用 ... 进行解构.  这样就可以了

  //   // 然后 在调用接口的时候 aa().then().finally( xxx= false ) // 第一次知道这样使用,就像以前jq.ajax中的compile?  反正是失败成功都会执行到finally的

  //   // 但是每个页面或者请求都要这样写loading或者error 不是我们想要的.  所以需要写一个高级点的hook 来实现, 异步错误的处理

  //   // setLoading(true);
  //   // client("projects", { data: cleanObject(debounceParams) })
  //   //   .then(setList)
  //   //   .catch((error) => {
  //   //     setList([]);
  //   //     setError(error);
  //   //   })
  //   //   .finally(() => setLoading(false));

  //   // 直接使用 run函数,  于此同时 还可以把 projects 层抽离出来.
  //   run(client("projects", { data: cleanObject(debounceParams) }));

  //   //then(result=> setList(result))  // 直接setList就行,不用函数再调用

  //   // fetch(`${apiUrl}/projects`).then(async (response) => {
  //   //   if (response.ok) {
  //   //     setList(await response.json());
  //   //   }
  //   // });
  //   //// @ts-ignore --- 加上这句可以忽略检查
  //   //react-hook/exhaustive-deps
  //   //eslint-disable-next-line
  // }, [debounceParams]); // 后面[param] 的意思是,当param改变的时候,才会去触发 useEffect 这个hook

  // 初始化 users --- 这个部分也可以抽离出来.   有useUsers hook 删掉
  // useMount(() => {
  //   client("users", {}).then(setUsers);
  // });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users || []}
      ></SearchPanel>
      {/*  因为list直接继承了table 所以list直接改成dataSource就好了,loding 也是自带属性所以直接使用就好了 */}

      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}

      <List
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
      ></List>
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

export default ProjectListScreen;
