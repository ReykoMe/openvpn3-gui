import { ConfigsListParsedReturnType, ParsedItemKeys } from "./types.ts";

export const configsList = (
  connectContent: string
): ConfigsListParsedReturnType => {
  const lines = connectContent.split("\n");
  if (lines.length <= 6) {
    // empty configs list looks like table and includes 6 lines
    return [];
  }
  const startIndex = 4;
  const endIndex = lines.length - 2;
  const noExtraSymbols = lines.slice(startIndex, endIndex);
  const parts: string[][] = [];
  let lineBuffer: string[] = [];
  for (const line of noExtraSymbols) {
    if (!line.length) {
      parts.push(lineBuffer);
      lineBuffer = [];
    } else {
      lineBuffer.push(line);
    }
  }
  const parseConfig = (
    configLines: string[]
  ): Record<ParsedItemKeys, string> => {
    const splittedLines: string[][] = configLines.map((el) => {
      return el.split(/ {2,}/g);
    });
    const dateLine: string[] = splittedLines[1];
    if (dateLine.length < 3) {
      dateLine.push(dateLine[dateLine.length - 1]);
      dateLine[1] = "never";
    }

    const configLinesFlat: string[] = [];
    for (const lineItems of splittedLines) {
      for (const line of lineItems) {
        configLinesFlat.push(line);
      }
    }
    const [path, importedAt, lastUsedAt, usedCount, configName, owner] =
      configLinesFlat;
    return { path, importedAt, lastUsedAt, usedCount, configName, owner };
  };
  parts.push(lineBuffer);

  return parts.map(parseConfig);
};
