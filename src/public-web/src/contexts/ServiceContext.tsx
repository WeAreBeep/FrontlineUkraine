import React, { useContext, useMemo } from 'react';
import {
  IStorageService,
  LocalStorageService,
} from '../services/StorageService';

interface ServiceMap {
  storage: IStorageService;
}

const useMakeServices: (w: Window) => ServiceMap = (w) => {
  return useMemo(
    () => ({
      storage: new LocalStorageService(w.localStorage),
    }),
    [w.localStorage]
  );
};

const ServiceContext = React.createContext<ServiceMap>(null as any);

export const ServiceProvider: React.FC<{ windowImpl: Window }> = ({
  windowImpl,
  children,
}) => {
  const value = useMakeServices(windowImpl);
  return (
    <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>
  );
};

export const useService: () => ServiceMap = () => {
  return useContext(ServiceContext);
};
