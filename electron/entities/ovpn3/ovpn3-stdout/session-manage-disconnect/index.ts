import {
  SessionManageDisconnectStdoutKeys,
  SessionManageDisconnectKeys,
  SessionManageDisconnectReturnType,
} from "./types";

const keysMap: Record<
  SessionManageDisconnectStdoutKeys,
  SessionManageDisconnectKeys
> = {
  BYTES_IN: "bytesIn",
  BYTES_OUT: "bytesOut",
  PACKETS_IN: "packetsIn",
  PACKETS_OUT: "packetsOut",
  TUN_BYTES_IN: "tunBytesIn",
  TUN_BYTES_OUT: "tunBytesOut",
  TUN_PACKETS_IN: "tunPacketsIn",
  TUN_PACKETS_OUT: "tunPacketsOut",
};

export const sessionManageDisconnect = (
  connectContent: string
): SessionManageDisconnectReturnType => {
  const lines = connectContent.split("\n");
  const [, ...stats] = lines;
  const statsWithoutEmptyLines = stats.filter(Boolean);
  const [, ...statsData] = statsWithoutEmptyLines;
  const statsNoDots = statsData.map((el) => el.replace(/\.+/g, ","));
  const entriesData: [SessionManageDisconnectKeys, number][] = statsNoDots.map(
    (el) => {
      const line = el.split(",");
      const key = line[0].trim() as SessionManageDisconnectStdoutKeys;
      const value = Number(line[1]);
      return [keysMap[key], value];
    }
  );
  return Object.fromEntries(entriesData) as SessionManageDisconnectReturnType;
};
