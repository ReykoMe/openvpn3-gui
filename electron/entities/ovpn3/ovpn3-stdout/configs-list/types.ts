export type ParsedItemKeys =
  | "path"
  | "importedAt"
  | "lastUsedAt"
  | "usedCount"
  | "configName"
  | "owner";

export type ConfigListParsedItem = Record<ParsedItemKeys, string>;
export type ConfigsListParsedReturnType = ConfigListParsedItem[];
