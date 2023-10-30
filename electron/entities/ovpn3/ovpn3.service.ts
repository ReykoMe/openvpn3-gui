import * as ovpn3Stdout from "./ovpn3-stdout";
import child_process from "node:child_process";
import { SessionsListParsedReturnType } from "./ovpn3-stdout/sessions-list/types";
import { SessionManageDisconnectReturnType } from "./ovpn3-stdout/session-manage-disconnect/types";
import { ConfigsListParsedReturnType } from "./ovpn3-stdout/configs-list/types";

export const sessionsList = async (): Promise<SessionsListParsedReturnType> => {
  const command = "openvpn3 sessions-list";

  return new Promise((res, rej) => {
    child_process.exec(command, (err, data) => {
      if (err) return rej(err);
      res(ovpn3Stdout.sessionsList(data.toString()));
    });
  });
};

export const sessionManageDisconnect = async (
  configName: string
): Promise<SessionManageDisconnectReturnType> => {
  const command = `openvpn3 session-manage --disconnect --config ${configName}`;
  return new Promise((res, rej) => {
    child_process.exec(command, (err, data) => {
      if (err) rej(err);
      res(ovpn3Stdout.sessionManageDisconnect(data.toString()));
    });
  });
};

export const sessionManageDisconnectByPath = async (
  configPath: string
): Promise<SessionManageDisconnectReturnType> => {
  const command = `openvpn3 session-manage --disconnect --path ${configPath}`;
  return new Promise((res, rej) => {
    child_process.exec(command, (err, data) => {
      if (err) rej(err);
      res(ovpn3Stdout.sessionManageDisconnect(data.toString()));
    });
  });
};

export const sessionStart = (importedConfigName: string): Promise<void> => {
  const command = `openvpn3 session-start --config ${importedConfigName}`;
  return new Promise((res, rej) => {
    child_process.exec(command, async (err) => {
      if (err) rej(err);
      res();
    });
  });
};

export const configsList = async (): Promise<ConfigsListParsedReturnType> => {
  return new Promise((res, rej) => {
    const command = "openvpn3 configs-list";
    child_process.exec(command, async (err, data) => {
      if (err) rej(err);
      const d = ovpn3Stdout.configsList(data.toString());
      res(d);
    });
  });
};

export const configImport = async (
  path: string,
  configName: string
): Promise<void> => {
  return new Promise((res, rej) => {
    const command = `openvpn3 config-import --config ${path} -n ${configName}`;
    child_process.exec(command, async (err, data) => {
      if (err) rej(err);
      console.log({ data });
      res();
    });
  });
};

export const configRemove = async (path: string): Promise<void> => {
  return new Promise((res, rej) => {
    const command = `openvpn3 config-remove --path ${path} --force`;
    child_process.exec(command, async (err) => {
      if (err) rej(err);
      res();
    });
  });
};
