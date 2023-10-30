import { useCallback, useState } from "react";

type UseBooleanStateReturnType<T extends PropertyKey> = [
  Record<T, boolean>,
  (name: T, value: boolean) => void,
];

export const useBooleanState = <T extends PropertyKey>(
  keys: readonly T[]
): UseBooleanStateReturnType<T> => {
  const [state, setState] = useState<Record<T, boolean>>(getInitialValues);

  function getInitialValues(): Record<T, boolean> {
    const entries = keys.map((key) => [key, false]);
    return Object.fromEntries(entries);
  }

  const handleChangeState = useCallback(
    (name: T, value: boolean): void => {
      setState((prev) => ({ ...prev, [name]: value }));
    },
    [state]
  );

  return [state, handleChangeState];
};
