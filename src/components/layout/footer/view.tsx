import React from "react";
import { Box, Typography } from "@mui/material";

export const Footer: React.FC = () => {
  return (
    <Box bgcolor="grey.200" display="flex" justifyContent="center" p={0.5}>
      <Typography variant="caption" textAlign="center">
        Openvpn GUI for Linux
      </Typography>
    </Box>
  );
};
