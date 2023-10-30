import { ConfigListParsedItem } from "../../../electron/entities/ovpn3/ovpn3-stdout/configs-list/types";
import { SessionsListParsedItem } from "../../../electron/entities/ovpn3/ovpn3-stdout/sessions-list/types";

export type SessionItem = SessionsListParsedItem;
export type SessionItems = SessionItem[];

export type ConfigItem = ConfigListParsedItem;
export type ConfigsItems = ConfigItem[];
export type PromiseVoidFunction = () => Promise<void>;

export type OVPNContext = {
  client: {
    sessions: SessionItems;
    configs: ConfigsItems;
    sessionGetList: PromiseVoidFunction;
    configGetList: PromiseVoidFunction;

    configImport: (params: {
      configName: string;
      filePath: string;
    }) => Promise<void>;

    configRemove: (configPath: string) => Promise<void>;
    sessionConnect: (configName: string) => Promise<void>;
    sessionDisconnect: (configName: string) => Promise<void>;
    sessionDisconnectByPath: (configPath: string) => Promise<void>;
  };
};
