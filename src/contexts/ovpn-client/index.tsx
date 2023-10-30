import React, { useContext, useEffect, useMemo, useState } from "react";
import { ConfigsItems, SessionItems, OVPNContext } from "./types";
import { EVENT_TYPES } from "../../../shared/events";
import { useBooleanState } from "../../hooks/use-boolean-state";

const fetchingKeys = [
  "sessionGetList",
  "configGetList",
  "configImport",
  "configRemove",
  "sessionConnect",
  "sessionDisconnect",
] as const;

type FetchingKeys = (typeof fetchingKeys)[number];

type OVPNContextWithFetching = OVPNContext & {
  isFetching: Record<FetchingKeys, boolean>;
};

const contextDefaultValues: OVPNContextWithFetching = {
  client: {
    configs: [],
    sessions: [],
    sessionGetList: () => Promise.reject(),
    configGetList: () => Promise.reject(),
    configImport: () => Promise.reject(),
    configRemove: () => Promise.reject(),
    sessionConnect: () => Promise.reject(),
    sessionDisconnect: () => Promise.reject(),
    sessionDisconnectByPath: () => Promise.reject(),
  },

  isFetching: {
    configGetList: false,
    configImport: false,
    configRemove: false,
    sessionConnect: false,
    sessionDisconnect: false,
    sessionGetList: false,
  },
};

const OVPNClientContext =
  React.createContext<OVPNContextWithFetching>(contextDefaultValues);

export const OVPNClientProvider: React.FC<React.PropsWithChildren> = (
  props
) => {
  const { children } = props;
  const [sessions, setSessions] = useState<SessionItems>([]);
  const [configs, setConfigs] = useState<ConfigsItems>([]);

  const [isFetching, setIsFetching] =
    useBooleanState<FetchingKeys>(fetchingKeys);

  const sessionGetList = async () => {
    setIsFetching("sessionGetList", true);
    const sessions = await window.ipcRenderer.invoke(
      EVENT_TYPES.SESSION_GET_LIST
    );
    setSessions(sessions);
    setIsFetching("sessionGetList", false);
  };

  const configGetList = async () => {
    setIsFetching("configGetList", true);

    const importedConfigsList = await window.ipcRenderer.invoke(
      EVENT_TYPES.CONFIG_GET_LIST
    );

    setConfigs(importedConfigsList);
    setIsFetching("configGetList", false);
  };

  const configImport = async (params: {
    configName: string;
    filePath: string;
  }) => {
    setIsFetching("configImport", true);

    const { configName, filePath } = params;
    const importedConfigsList = await window.ipcRenderer.invoke(
      EVENT_TYPES.CONFIG_IMPORT,
      filePath,
      configName
    );
    setConfigs(importedConfigsList);
    setIsFetching("configImport", false);
  };

  const configRemove = async (configPath: string) => {
    setIsFetching("configRemove", true);

    const importedConfigsList = await window.ipcRenderer.invoke(
      EVENT_TYPES.CONFIG_REMOVE,
      configPath
    );
    setConfigs(importedConfigsList);
    setIsFetching("configRemove", false);
  };

  const sessionConnect = async (configName: string) => {
    setIsFetching("sessionConnect", true);

    const activeSessionsList = await window.ipcRenderer.invoke(
      EVENT_TYPES.SESSION_CONNECT,
      configName
    );
    setSessions(activeSessionsList);
    setIsFetching("sessionConnect", false);
  };

  const sessionDisconnect = async (configName: string) => {
    setIsFetching("sessionDisconnect", true);

    const activeSessionsList = await window.ipcRenderer.invoke(
      EVENT_TYPES.SESSION_DISCONNECT,
      configName
    );
    setSessions(activeSessionsList);
    setIsFetching("sessionDisconnect", false);
  };

  const sessionDisconnectByPath = async (configPath: string) => {
    setIsFetching("sessionDisconnect", true);
    const activeSessionsList = await window.ipcRenderer.invoke(
      EVENT_TYPES.SESSION_DISCONNECT_BY_PATH,
      configPath
    );
    setSessions(activeSessionsList);
    setIsFetching("sessionDisconnect", false);
  };

  const contextValue = useMemo<OVPNContextWithFetching>(
    () => ({
      client: {
        sessions,
        configs,
        sessionGetList,
        configGetList,
        configImport,
        configRemove,
        sessionConnect,
        sessionDisconnect,
        sessionDisconnectByPath,
      },
      isFetching,
    }),
    [sessions, configs, isFetching]
  );

  useEffect(() => {
    const init = async () => {
      await sessionGetList();
      await configGetList();
    };

    init();
  }, []);

  return (
    <OVPNClientContext.Provider value={contextValue}>
      {children}
    </OVPNClientContext.Provider>
  );
};

export const useVPN = () => useContext(OVPNClientContext);
