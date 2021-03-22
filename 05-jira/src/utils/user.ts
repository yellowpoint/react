import { User } from "../screens/project-list/search-panel";
import { useAsync } from "utils/use-async";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";

export const useUser = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...ressult } = useAsync<User[]>();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
  }, [param]);

  return ressult;
};
