import { SessionStartParsesReturnType } from "./types";

export const sessionStart = (stdout: string): SessionStartParsesReturnType => {
  const lines: string[] = stdout.split("\n");

  const parsedLines: string[][] = lines.map((el) =>
    el.split(":").map((item) => item.trim())
  );

  const [configPath, sessionPath, connectionInfo] = parsedLines;

  return {
    configPath: configPath[1],
    sessionPath: sessionPath[1],
    connectionStatus: connectionInfo[0],
  };
};
