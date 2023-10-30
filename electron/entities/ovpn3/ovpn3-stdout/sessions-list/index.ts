import {
  OVPNConnectionStatuses,
  ConfigKeyMap,
  SessionsListParsedReturnType,
  SessionListParsedItemKeys,
  StdOutKeys,
} from "./types";

export const removeNames = [
  "(Config not available)",
  "Client reconnect",
  "Client connected",
];

export const CONNECTION_STATUS: Record<OVPNConnectionStatuses, string> = {
  "Connection, Client connected": "Connected",
  "Connection, Client reconnect": "Reconnecting",
};

export const normalizedMap: ConfigKeyMap = {
  "Config name": "configName",
  "Session name": "sessionName",
  Created: "createdAt",
  Device: "networkDevice",
  Owner: "owner",
  Path: "path",
  PID: "processId",
  Status: "status",
};

export const sessionsList = (content: string): SessionsListParsedReturnType => {
  if (content === "No sessions available\n") {
    return [];
  }
  const lines = content.split("\n");
  const configSeparatorsIndices: number[] = [];
  lines.shift();
  lines.pop();
  lines.pop();
  for (const lineNumber in lines) {
    const line = lines[lineNumber];
    if (!line.length) {
      configSeparatorsIndices.push(Number(lineNumber));
    }
  }

  const configParts: string[][] = [];
  if (configSeparatorsIndices.length) {
    for (const sepNumber in configSeparatorsIndices) {
      const lastIdx = configSeparatorsIndices[sepNumber];
      const firstIdx = configSeparatorsIndices[Number(sepNumber) - 1] + 1 || 0;
      configParts.push(lines.slice(firstIdx, lastIdx));
    }
  } else {
    configParts.push(lines);
  }

  const configLinesNormalized: string[][] = [];
  for (const confPart of configParts) {
    const normalizedLines: string[] = [];
    for (const confLine of confPart) {
      const a = confLine.trim().replace(/ {2,}/g, ";").split(";");
      for (const item of a) {
        const line = item.trim();
        if (!removeNames.includes(line)) {
          normalizedLines.push(line);
        }
      }
    }
    configLinesNormalized.push(normalizedLines);
  }

  const configItems: Record<SessionListParsedItemKeys, string>[] = [];
  for (const confNorm of configLinesNormalized) {
    const entries: [SessionListParsedItemKeys, string][] = [];
    const sep = confNorm.map((el) => el.split(": ").map((it) => it.trim()));
    for (const el of sep) {
      const [srcKey, srcValue] = el;
      const key = normalizedMap[srcKey as StdOutKeys];
      entries.push([key, srcValue]);
    }
    const obj = Object.fromEntries(entries) as Record<
      SessionListParsedItemKeys,
      string
    >;
    obj.status =
      CONNECTION_STATUS[obj.status as OVPNConnectionStatuses] ||
      "Is not defined"; //TODO
    configItems.push(obj);
  }
  return configItems;
};
