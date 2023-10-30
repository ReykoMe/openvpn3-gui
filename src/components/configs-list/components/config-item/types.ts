import { MouseEventHandler } from "react";

export type ConfigItemCardProps = {
  name: string;
  onClickConnect: MouseEventHandler<HTMLButtonElement>;
  onClickDelete?: VoidFunction;
  isConnected?: boolean;
  isProgressShow?: boolean;
  isButtonDisabled?: boolean;
  isShowMenu?: boolean;
};
