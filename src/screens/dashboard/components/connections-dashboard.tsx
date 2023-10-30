import React, { useCallback, useMemo, useState } from "react";
import { DropzoneProps, Dropzone } from "../../../components/dropzone";
import { useVPN } from "../../../contexts/ovpn-client";
import { ConfigItemCardProps } from "../../../components/configs-list/components/config-item";
import {
  ConfigCardListItem,
  ConfigCardsListProps,
} from "../../../components/configs-list/types";
import { Dialog, Fab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ConfigCardsList } from "../../../components/configs-list";
import { EmptyConnections } from "../../../components/empty-connections";

export const ConnectionsDashboard: React.FC = React.memo(() => {
  const [openImportDialog, setOpenImportDialog] = useState<boolean>(false);
  const [processingItemName, setProcessingItemName] = useState<
    ConfigItemCardProps["name"] | null
  >(null);

  const vpn = useVPN();

  const lists: {
    configs: ConfigCardsListProps["items"];
    sessions: ConfigCardsListProps["items"];
  } = useMemo(() => {
    const configs: ConfigCardsListProps["items"] = [];
    const sessions: ConfigCardsListProps["items"] = [];

    for (const config of vpn.client.configs) {
      const isConnected = vpn.client.sessions.find(
        (session) => session.configName === config.configName
      );
      const { path, configName } = config;
      const item = { path, name: configName };
      isConnected ? sessions.push(item) : configs.push(item);
    }
    return { configs, sessions };
  }, [vpn.client.configs, vpn.client.sessions]);

  const handleClickToggleConnection: ConfigCardsListProps["onClickToggleConnection"] =
    useCallback(
      async (configItem) => {
        const isConnected = vpn.client.sessions.some(
          (el) => el.configName === configItem.name
        );

        const configName = configItem.name;
        setProcessingItemName(configName);
        !isConnected
          ? await vpn.client.sessionConnect(configName)
          : await vpn.client.sessionDisconnect(configName);
        setProcessingItemName(null);
      },
      [vpn.client.sessions]
    );

  const handleRemoveImportedConfig: ConfigCardsListProps["onClickDelete"] =
    useCallback(async (item: ConfigCardListItem) => {
      await vpn.client.configRemove(item.path);
    }, []);

  const handleImportConfig: DropzoneProps["handleSubmit"] = async ({
    configName,
    file,
  }) => {
    await vpn.client.configImport({ configName, filePath: file.path });
    setOpenImportDialog(false);
  };

  const handleClickFloatingButton = () => {
    setOpenImportDialog((prev) => !prev);
  };
  return (
    <Box sx={{ display: "flex", p: 1, pt: 0, flexDirection: "column" }}>
      <Dialog
        open={openImportDialog}
        onClose={handleClickFloatingButton}
        PaperProps={{
          sx: {
            p: 2,
          },
        }}
      >
        <Dropzone
          handleSubmit={handleImportConfig}
          onClickCancel={handleClickFloatingButton}
        />
      </Dialog>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleClickFloatingButton}
        sx={{
          position: "absolute",
          bottom: (theme) => theme.spacing(4),
          right: (theme) => theme.spacing(2),
        }}
      >
        <AddIcon />
      </Fab>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {Boolean(!vpn.client.sessions.length) && <EmptyConnections />}

        {Boolean(vpn.client.sessions.length) && (
          <ConfigCardsList
            items={lists.sessions}
            onClickToggleConnection={handleClickToggleConnection}
            processingItem={processingItemName}
            isConnecting={
              vpn.isFetching.sessionConnect || vpn.isFetching.sessionDisconnect
            }
            isConnected
          />
        )}

        <ConfigCardsList
          items={lists.configs}
          onClickToggleConnection={handleClickToggleConnection}
          processingItem={processingItemName}
          onClickDelete={handleRemoveImportedConfig}
          isShowItemsMenu
          isConnecting={
            vpn.isFetching.sessionConnect || vpn.isFetching.sessionDisconnect
          }
        />
      </Box>
    </Box>
  );
});
