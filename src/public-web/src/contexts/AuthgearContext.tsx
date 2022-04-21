import React, { createContext, useState, useEffect, useContext } from 'react';
import authgear, { SessionState } from '@authgear/web';

export const AuthgearContext = createContext<SessionState>('UNKNOWN');

export interface AuthgearProviderProps {
  children?: React.ReactNode;
}

export function AuthgearProvider(
  props: AuthgearProviderProps
): React.ReactElement {
  const { children } = props;
  const [sessionState, setSessionState] = useState(authgear.sessionState);

  useEffect(() => {
    authgear.delegate = {
      onSessionStateChange: (container) => {
        setSessionState(container.sessionState);
      },
    };
    return () => {
      authgear.delegate = undefined;
    };
  }, []);

  return (
    <AuthgearContext.Provider value={sessionState}>
      {children}
    </AuthgearContext.Provider>
  );
}

export function useSessionState(): SessionState {
  return useContext(AuthgearContext);
}
