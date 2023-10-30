import React from "react";
import { Box } from "@mui/material";

export const Content: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {children}
    </Box>
  );
};
