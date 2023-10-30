import { ConfigsListParsedReturnType } from "./ovpn3-stdout/configs-list/types";
import { SessionsListParsedReturnType } from "./ovpn3-stdout/sessions-list/types";
import * as service from "./ovpn3.service";

export const getSessionsList =
  async (): Promise<SessionsListParsedReturnType> => {
    return await service.sessionsList();
  };
export const disconnect = async (
  _: Electron.IpcMainInvokeEvent,
  importedConfigName: string
): Promise<SessionsListParsedReturnType> => {
  await service.sessionManageDisconnect(importedConfigName);
  return await service.sessionsList();
};

export const disconnectByPath = async (
  _: Electron.IpcMainInvokeEvent,
  sessionPath: string
): Promise<SessionsListParsedReturnType> => {
  await service.sessionManageDisconnectByPath(sessionPath);
  return await service.sessionsList();
};

export const connectByImportedConfigName = async (
  _: Electron.IpcMainInvokeEvent,
  importedConfigName: string
): Promise<SessionsListParsedReturnType> => {
  await service.sessionStart(importedConfigName);
  return await service.sessionsList();
};

export const getImportedConfigsList =
  async (): Promise<ConfigsListParsedReturnType> => {
    return await service.configsList();
  };

export const createImportConfig = async (
  _: Electron.IpcMainInvokeEvent,
  path: string,
  configName: string
): Promise<ConfigsListParsedReturnType> => {
  await service.configImport(path, configName);
  return await service.configsList();
};

export const removeImportedConfig = async (
  _: Electron.IpcMainInvokeEvent,
  path: string
): Promise<ConfigsListParsedReturnType> => {
  await service.configRemove(path);
  return await service.configsList();
};
