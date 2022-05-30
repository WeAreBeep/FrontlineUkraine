import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface State {
  symbolCount: Record<string, number | undefined>;
  remarks: Record<string, string | undefined>;
}

enum ActionType {
  Register = 'register',
  Unregister = 'unregister',
}

function useMakeAction(
  _state: State,
  setState: Dispatch<SetStateAction<State>>
) {
  return useMemo(
    () => ({
      [ActionType.Register]: (symbol: string) => {
        setState((prev) => ({
          ...prev,
          symbolCount: {
            ...prev.symbolCount,
            [symbol]: (prev.symbolCount[symbol] ?? 0) + 1,
          },
        }));
      },
      [ActionType.Unregister]: (symbol: string) => {
        setState((prev) => ({
          ...prev,
          symbolCount: {
            ...prev.symbolCount,
            [symbol]: Math.max((prev.symbolCount[symbol] ?? 0) - 1, 0),
          },
        }));
      },
    }),
    [setState]
  );
}

type Actions = ReturnType<typeof useMakeAction>;

export interface RemarkContextValue {
  state: State;
  actions: Actions;
}

const RemarkContext = React.createContext<RemarkContextValue>(null as any);

export const RemarkContextProvider: React.FC<{
  remarks: Record<string, string>;
}> = ({ children, remarks }) => {
  const [state, setState] = useState<State>({ symbolCount: {}, remarks: {} });
  const actions = useMakeAction(state, setState);
  useEffect(() => {
    setState((prev) => ({ ...prev, remarks }));
  }, [remarks]);

  const value = useMemo(() => ({ state, actions }), [state, actions]);
  return (
    <RemarkContext.Provider value={value}>{children}</RemarkContext.Provider>
  );
};

export function useRemark(): RemarkContextValue {
  return React.useContext(RemarkContext);
}
