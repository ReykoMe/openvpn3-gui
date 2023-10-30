import { ConfigItemCardProps } from "./components/config-item";

export type ConfigCardListItem = Pick<ConfigItemCardProps, "name"> & {
  path: string;
};

export type ConfigCardsListProps = {
  items: ConfigCardListItem[];
  isConnecting?: boolean;
  isConnected?: boolean;
  isShowItemsMenu?: boolean;
  processingItem?: ConfigItemCardProps["name"] | null;
  onClickToggleConnection: (configItem: ConfigCardListItem) => void;
  onClickDelete?: (configItem: ConfigCardListItem) => void;
};
