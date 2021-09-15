import styled from "@emotion/styled";
import { Spin } from "antd";
import React from "react";

export const Row = styled.div`
  display: flex;
  align-items: center;
  > * {
    margin: 0;
  }
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large"></Spin>
  </FullPage>
);
