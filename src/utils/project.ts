import { useEffect } from "react";
// import { ListItem } from "screens/project-list/list";
import { useAsync } from "./use-async";
import { cleanObject, useDebounce } from "../utils";
import { useHttp } from "utils/http";
import { ListItem } from "screens/project-list/list";

export const useProjects = (param?: Partial<ListItem>) => {
  //   const debounceParams = useDebounce(param, 500); // 函数截流的 hook 结合体
  const { run, ...result } = useAsync<ListItem[]>();

  const client = useHttp();
  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
    //eslint-disable-next-line
  }, [param]);

  // 返回所有数据
  return result;
};


// 这部分主要是合并 这些内容
// useEffect(() => {
//   run(client("projects", { data: cleanObject(debounceParams) }));
// }, [debounceParams]);
