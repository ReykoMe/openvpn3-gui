export type OVPNConnectionStatuses =
  | "Connection, Client connected"
  | "Connection, Client reconnect";

export type StdOutKeys =
  | "Path"
  | "Created"
  | "PID"
  | "Owner"
  | "Device"
  | "Config name"
  | "Session name"
  | "Status";

export type SessionListParsedItemKeys =
  | "path"
  | "createdAt"
  | "processId"
  | "owner"
  | "networkDevice"
  | "configName"
  | "sessionName"
  | "status";

export type ConfigKeyMap = Record<StdOutKeys, SessionListParsedItemKeys>;

export type SessionsListParsedItem = Record<SessionListParsedItemKeys, string>;
export type SessionsListParsedItems = SessionsListParsedItem[];
export type SessionsListParsedReturnType = SessionsListParsedItems;
