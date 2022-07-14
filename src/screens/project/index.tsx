import { BrowserRouter, Link } from "react-router-dom";

import { Route, Routes, Navigate } from "react-router";
import KanbanScreen from "screens/kanban";
import TaskgroupScreen from "screens/taskgroup";

// 开始添加子路由
const ProjectScreen = () => {
  return (
    <div>
      <h1>单个项目列表--ProjectScreen</h1>
      <Link to={"Kanban"}>看板</Link>
      <Link to={"taskgroup"}>任务组</Link>

      {/* </BrowserRouter><BrowserRouter>  这个东西只用使用一次就好了 在全局的父级*/}
      <Routes>
        {/* 
          /project/:id/kanban 匹配的路由是这样的  react-router 会自动append路由的  也就是逐层拼接那种意思
          现在想要的是 打开id的时候,如果没有匹配到我们写的其他子路由,就主动打开看板

          这时候就需要用到 Navigate了 // 有斜杠的意思是 指到跟路由? 教程那么说的 但是没发现有问题
        */}
        <Route path={"/kanban"} element={<KanbanScreen />}></Route>
        <Route path={"/taskgroup"} element={<TaskgroupScreen />}></Route>
        {/* 意思就是,如果上面两个匹配不到,就跳下面那个, 也等于重定向的意思 */}
        {/* <Navigate to={window.location.pathname + "/kanban"} />  不能直接这样写... 可能是跟版本有关系了*/}
        <Route
          path="*"
          element={
            <Navigate
              to={window.location.pathname + "/kanban"}
              replace={true}
            ></Navigate>
          }
        ></Route>
      </Routes>
    </div>
  );
};
export default ProjectScreen;
