import React from "react";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export const Header: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            title="not implemented yet"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            Open VPN 3 GUI (unofficial)
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
