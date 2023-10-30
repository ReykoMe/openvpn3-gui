export type SessionManageDisconnectStdoutKeys =
  | "BYTES_IN"
  | "BYTES_OUT"
  | "PACKETS_IN"
  | "PACKETS_OUT"
  | "TUN_BYTES_IN"
  | "TUN_BYTES_OUT"
  | "TUN_PACKETS_IN"
  | "TUN_PACKETS_OUT";

export type SessionManageDisconnectKeys =
  | "bytesIn"
  | "bytesOut"
  | "packetsIn"
  | "packetsOut"
  | "tunBytesIn"
  | "tunBytesOut"
  | "tunPacketsIn"
  | "tunPacketsOut";

export type SessionManageDisconnectReturnType = Record<
  SessionManageDisconnectKeys,
  number
>;
