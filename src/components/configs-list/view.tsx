import React from "react";
import { Box } from "@mui/material";
import { ConfigItemCard } from "./components/config-item";
import { ConfigCardListItem, ConfigCardsListProps } from "./types";

export const ConfigCardsList: React.FC<ConfigCardsListProps> = React.memo(
  (props) => {
    const handleClickDelete = (item: ConfigCardListItem) => {
      if (!props.onClickDelete) return;
      return () => {
        props.onClickDelete?.(item);
      };
    };

    const handleToggleConnection = (item: ConfigCardListItem) => () => {
      props.onClickToggleConnection(item);
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {props.items.map((el) => (
            <ConfigItemCard
              key={el.path}
              name={el.name}
              isProgressShow={props.processingItem === el.name}
              onClickConnect={handleToggleConnection(el)}
              onClickDelete={handleClickDelete(el)}
              isButtonDisabled={props.isConnecting}
              isConnected={props.isConnected}
              isShowMenu={props.isShowItemsMenu}
            />
          ))}
        </Box>
      </Box>
    );
  }
);
