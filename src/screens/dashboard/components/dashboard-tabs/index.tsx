import React from "react";
import { Tabs as MuiTabs } from "@mui/material";
import { DashboardTabsProps } from "./types";

export const DashboardTabs: React.FC<DashboardTabsProps> = React.memo(
  (props) => {
    const { children, ...muiTabsProps } = props;
    return (
      <MuiTabs
        sx={(theme) => {
          const height = theme.spacing(5);
          return {
            height,
            minHeight: height,
            "& .MuiTab-root": {
              p: 0,
              height,
              minHeight: height,
            },
            "& .MuiTabs-fixed": {
              height: height,
              minHeight: height,
            },
          };
        }}
        {...muiTabsProps}
      >
        {children}
      </MuiTabs>
    );
  }
);
