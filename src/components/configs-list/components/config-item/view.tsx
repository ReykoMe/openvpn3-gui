import React, { MouseEventHandler, useState } from "react";
import { ConfigItemCardProps } from "./types";
import {
  Box,
  Button,
  IconButton,
  MenuList,
  MenuItem,
  Paper,
  Typography,
  ListItemIcon,
  ListItemText,
  Popover,
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/DeleteForever";

export const ConfigItemCard: React.FC<ConfigItemCardProps> = React.memo(
  (props) => {
    const [menu, setMenu] = useState<HTMLElement | null>(null);
    const handleMoreMenuClick: MouseEventHandler<HTMLButtonElement> = (e) => {
      setMenu(e.currentTarget);
    };

    const handleMenuClose = () => setMenu(null);

    return (
      <Paper
        sx={{
          p: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        variant="outlined"
      >
        <Typography variant="body2" fontWeight="500" color="grey.600">
          {props.name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            size="small"
            onClick={props.onClickConnect}
            disabled={props.isButtonDisabled}
            endIcon={props.isProgressShow && <CircularProgress size="15px" />}
          >
            {!props.isConnected ? "Connect" : "Disconnect"}
          </Button>
          {props.isShowMenu && (
            <>
              <IconButton
                color="default"
                onClick={handleMoreMenuClick}
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
              <Popover
                anchorEl={menu}
                open={Boolean(menu)}
                onClose={handleMenuClose}
              >
                <MenuList>
                  {props.onClickDelete && (
                    <MenuItem color="red">
                      <ListItemIcon>
                        <DeleteIcon color="error" />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography color="error">Remove</Typography>
                      </ListItemText>
                    </MenuItem>
                  )}
                </MenuList>
              </Popover>
            </>
          )}
        </Box>
      </Paper>
    );
  }
);
