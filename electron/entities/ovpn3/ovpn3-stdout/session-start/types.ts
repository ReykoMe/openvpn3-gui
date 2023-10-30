export type SessionStartParsedKeys =
  | "configPath"
  | "sessionPath"
  | "connectionStatus";
export type SessionStartParsesReturnType = Record<
  SessionStartParsedKeys,
  string
>;
