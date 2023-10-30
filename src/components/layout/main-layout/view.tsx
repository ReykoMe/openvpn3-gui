import React from "react";
import { Header } from "../header";
import { Box } from "@mui/material";
import { Content } from "../content";
import { Footer } from "../footer";

export const MainLayout: React.FC<React.PropsWithChildren> = (props) => {
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
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Box>
  );
};
