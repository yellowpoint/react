import { Typography } from "antd";
import React, { useState } from "react";
import { useDebounce } from "utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useProject } from "../../utils/project";
import { useUser } from "../../utils/user";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debounceParam = useDebounce(param, 500);
  const { isLoading, error, data: list } = useProject(debounceParam);
  const { data: users } = useUser();

  return (
    <div>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : (
        ""
      )}
      <List
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      ></List>
    </div>
  );
};
