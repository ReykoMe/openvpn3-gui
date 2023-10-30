import { Box } from "@mui/material";
import { useVPN } from "../../../contexts/ovpn-client";
import React, { useMemo } from "react";
import { ConfigCardsList } from "../../../components/configs-list";
import {
  ConfigCardListItem,
  ConfigCardsListProps,
} from "../../../components/configs-list/types";
import { EmptyConnections } from "../../../components/empty-connections";

export const ConnectionsAll: React.FC = React.memo(() => {
  const vpn = useVPN();

  const sessions = useMemo((): ConfigCardListItem[] => {
    return vpn.client.sessions.map((el) => ({
      name: el.sessionName,
      path: el.path,
    }));
  }, [vpn.client.sessions]);

  const handleToggleConnections: ConfigCardsListProps["onClickToggleConnection"] =
    async (item) => {
      await vpn.client.sessionDisconnectByPath(item.path);
    };

  return (
    <Box sx={{ display: "flex", p: 1, pt: 0, flexDirection: "column" }}>
      {!sessions.length && <EmptyConnections />}
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 1, pt: 1 }}
      ></Box>
      <ConfigCardsList
        items={sessions}
        onClickToggleConnection={handleToggleConnections}
        isConnecting={vpn.isFetching.sessionDisconnect}
        isConnected
      />
    </Box>
  );
});
