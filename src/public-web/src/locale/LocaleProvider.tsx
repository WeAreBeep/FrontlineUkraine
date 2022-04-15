import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useService } from '../contexts/ServiceContext';
import { IStorageService } from '../services/StorageService';
import { Context as MFContext, LocaleProvider as MFLocaleProvider, Values } from '@oursky/react-messageformat';
import { Locale, MessageID } from './type';
import { MESSAGE_MAP } from './constants';

interface State {
  locale: Locale;
}

enum ActionType {
  ChangeLocale = 'changeLocale',
}

const useMakeAction = (_state: State, setState: Dispatch<SetStateAction<State>>, storage: IStorageService) => {
  return useMemo(() => ({
    [ActionType.ChangeLocale]: (locale: Locale) => {
      setState({
        locale,
      });
      // set to storage
      storage.setLocale(locale);
    }
  }), [setState, storage]);
}

type Actions = ReturnType<typeof useMakeAction>;

type LocaleContextValue = State & Actions;

const LocaleContext = React.createContext<LocaleContextValue>(null as any);

interface TranslationContextValue extends LocaleContextValue {
  renderToString: (id: MessageID, values?: Values) => string;
}

const TranslationContext = React.createContext<TranslationContextValue>({} as TranslationContextValue);

const TranslationProvider: React.FC = ({children}) =>{
  const localeValue = React.useContext(LocaleContext);
  const { renderToString } = React.useContext(MFContext);

  const value = useMemo(() => ({
    ...localeValue,
    renderToString: renderToString as TranslationContextValue['renderToString']
  }), [localeValue, renderToString]);

  return <TranslationContext.Provider value={value}>
    {children}
  </TranslationContext.Provider>
}

export const LocaleProvider: React.FC<{defaultLocale: Locale}> = ({defaultLocale, children}) => {
  const { storage } = useService();
  const [state, setState] = useState<State>({
    locale: storage.getLocale() ?? defaultLocale,
  });
  const actions = useMakeAction(state, setState, storage);

  const value = useMemo(() => ({...state, ...actions}), [state, actions]);

  useEffect(() => {
    setState({
      locale: storage.getLocale() ?? defaultLocale,
    });
    // Load locale from storage on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <LocaleContext.Provider value={value}>
    <MFLocaleProvider locale={value.locale} messageByID={MESSAGE_MAP[state.locale]}>
      <TranslationProvider>
        {children}
      </TranslationProvider>
    </MFLocaleProvider>
  </LocaleContext.Provider>
}

export const useLocale: () => TranslationContextValue = () => {
  return React.useContext(TranslationContext);
}