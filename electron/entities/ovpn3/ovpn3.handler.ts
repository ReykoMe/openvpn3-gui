import { ipcMain } from "electron";
import * as controller from "./ovpn3.controller";
import { EVENT_TYPES } from "../../../shared/events";

ipcMain.handle(EVENT_TYPES.SESSION_GET_LIST, controller.getSessionsList);
ipcMain.handle(EVENT_TYPES.SESSION_DISCONNECT, controller.disconnect);
ipcMain.handle(
  EVENT_TYPES.SESSION_DISCONNECT_BY_PATH,
  controller.disconnectByPath
);
ipcMain.handle(
  EVENT_TYPES.SESSION_CONNECT,
  controller.connectByImportedConfigName
);
ipcMain.handle(EVENT_TYPES.CONFIG_GET_LIST, controller.getImportedConfigsList);
ipcMain.handle(EVENT_TYPES.CONFIG_IMPORT, controller.createImportConfig);
ipcMain.handle(EVENT_TYPES.CONFIG_REMOVE, controller.removeImportedConfig);
