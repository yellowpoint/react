import { useAsync } from "utils/use-async";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { Project } from "screens/project-list/list";
import { useHttp } from "./http";

export const useProject = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...ressult } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);

  return ressult;
};
