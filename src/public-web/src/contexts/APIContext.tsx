import React, { createContext, useContext, useMemo } from 'react';
import { RegisterSuppliesForm } from '../containers/registerSupplies/types';
import { RegisterRequestForm } from '../containers/requestPpe/types';
import { config } from '../config';
import { PpeType } from '../models/ppeType';

function isStatusSuccess(status: number) {
  return status >= 200 && status < 400;
}

export class APIError extends Error {
  readonly data: any;
  readonly response: Response;

  constructor(data: any, response: Response) {
    super(response.statusText);
    this.data = data;
    this.response = response;
  }
}

export interface FieldValidationErrorData {
  loc: string[];
  msg: string;
  type: string;
}

export function isFieldValidationErrorData(
  v: any
): v is FieldValidationErrorData {
  return (
    typeof v === 'object' &&
    Array.isArray(v.loc) &&
    typeof v.msg === 'string' &&
    typeof v.type === 'string'
  );
}

export interface SchemaValidationErrorData {
  detail: FieldValidationErrorData[];
}

export function isSchemaValidationErrorData(
  v: any
): v is SchemaValidationErrorData {
  console.log(v);
  return (
    typeof v === 'object' &&
    Array.isArray(v.detail) &&
    Array.from(v.detail).every(isFieldValidationErrorData)
  );
}

async function fetchApi(
  apiEndpoint: string,
  path: string,
  init: RequestInit
): Promise<any> {
  const url = new URL(path, apiEndpoint).href;
  const response = await fetch(url, init);
  const respData = await response.json();
  if (isStatusSuccess(response.status)) {
    return respData;
  }
  throw new APIError(respData, response);
}

function useMakeRpc() {
  return useMemo(() => {
    const { apiKey, apiEndpoint } = config;
    const headers = {
      'X-Frontlinelive-Api-Key': apiKey,
    };

    return {
      post: async (path: string, data: any) => {
        const init: RequestInit = {
          method: 'POST',
          mode: 'cors',
          headers,
          body: JSON.stringify(data),
        };
        return fetchApi(apiEndpoint, path, init);
      },
      get: async (path: string) => {
        const init: RequestInit = {
          method: 'GET',
          mode: 'cors',
          headers,
        };
        return fetchApi(apiEndpoint, path, init);
      },
    };
  }, []);
}

type Rpc = ReturnType<typeof useMakeRpc>;

enum ActionType {
  CreateSupply = 'createSupply',
  CreateRequest = 'createRequest',
}

function useMakeActions(rpc: Rpc) {
  return useMemo(
    () => ({
      [ActionType.CreateSupply]: async (form: RegisterSuppliesForm) => {
        const canSupplyPpeTypes = Object.keys(form.ppeTypes).filter(
          (ppeType) => form.ppeTypes[ppeType as PpeType].can
        );
        const ppeTypes = canSupplyPpeTypes.map((ppeType) => {
          const { can, ...details } = form.ppeTypes[ppeType as PpeType];
          return {
            type: ppeType,
            ...details,
          };
        });
        const data = {
          organisationName: form.organisationName,
          description: form.description,
          supplierType: form.supplierType,
          supplierTypeOther: form.supplierTypeOther,
          email: form.email,
          website: form.website,
          phoneNumber: form.phoneNumber,
          contactName: form.contactName,
          postcode: form.postcode,
          ppeTypes,
        };
        return rpc.post('v1/supply', data);
      },
      [ActionType.CreateRequest]: async (form: RegisterRequestForm) => {
        const { ppeTypes: ppeTypeDict, ...rest } = form;
        const needPpeTypes = Object.keys(ppeTypeDict).filter(
          (ppeType) => form.ppeTypes[ppeType as PpeType].need
        );
        const ppeTypes = needPpeTypes.map((ppeType) => {
          const { need, ...details } = form.ppeTypes[ppeType as PpeType];
          return {
            type: ppeType,
            ...details,
          };
        });
        const data = {
          ...rest,
          ppeTypes,
        };
        return rpc.post('v1/need', data);
      },
    }),
    [rpc]
  );
}

type Actions = ReturnType<typeof useMakeActions>;

interface APIContextValue {
  actions: Actions;
}

const APIContext = createContext<APIContextValue>(null as any);

export const APIContextProvider: React.FC = ({ children }) => {
  const rpc = useMakeRpc();
  const actions = useMakeActions(rpc);
  const value = useMemo(() => ({ actions }), [actions]);
  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
};

export const useAPIContext = (): APIContextValue => useContext(APIContext);
