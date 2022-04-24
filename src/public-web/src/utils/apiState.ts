interface InitApiState {
  state: 'init';
}

interface LoadingApiState<TData> {
  state: 'loading';
  data?: TData;
}

interface IdleApiState<TData> {
  state: 'idle';
  data: TData;
  lastFetchedAt: Date;
}

interface ErrorApiState {
  state: 'error';
  error: any;
  lastFetchedAt: Date;
}

export type ApiState<TData> =
  | InitApiState
  | LoadingApiState<TData>
  | IdleApiState<TData>
  | ErrorApiState;
