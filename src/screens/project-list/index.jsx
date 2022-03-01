import { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import qs from "qs";
import { cleanObject } from "../../utils";

// 所有不是为了修改业务,而进行修改源代码的行为都是不好的. ---

// 读取配置的url (自动读取,也可以配置在scripts上,运行直接赋予)
// 当运行,npm start 会读取到的是 .evn.develoopment 文件的 REACT_APP_API_URL
// 当执行 npm run build  会读取到的是 .evn 文件的 REACT_APP_API_URL

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    // 这个写法更简洁,只是变得难理解, useState 可以接受promise? 还不太了解
    // fetch(`${apiUrl}/projects`).then(async (response) => {
    //   if (response.ok) {
    //     setList(await response.json());
    //   }
    // });

    // 这种形式肯定不好了,只是后期再换吧.  添加qs插件拿来序列化参数
    // 状态提升 后自组件设置了 setParam 也能触发这个,因为这个 是等于监听了param的变化.  所以当在这个页面定义了param,用到param的子组件,一发生改变,
    // 这里的useEffect都能触发?
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`)
      .then(async (response) => await response.json())
      .then((data) => {
        console.log(data, "data");
        setList(data);
      });
  }, [param]); // 后面[param] 的意思是,当param改变的时候,才会去触发 useEffect 这个hook

  // 初始化 users
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []); // 这里依赖空数组,因为 只需要页面渲染,执行一次.

  return (
    <div>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  );
};

export default ProjectScreen;
