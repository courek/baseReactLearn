import { useEffect } from "react";
import { useAsync } from "./use-async";
import { cleanObject } from "../utils";
import { useHttp } from "utils/http";

import { User } from "screens/project-list/search-panel";

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();
  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
    //eslint-disable-next-line
  }, [param]);
  return result;
};
