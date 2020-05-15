import { Reducer, AnyAction } from 'redux';

export function createAction<T extends string>(action: {
  type: T;
}): { type: T };
export function createAction<T extends string, P>(action: {
  type: T;
  payload: P;
}): { type: T; payload: P };
export function createAction<T extends string, P>(action: {
  type: T;
  payload?: P;
}) {
  return action;
}

export type InferActionType<T> = T extends {
  [key: string]: (...args: any[]) => infer R;
}
  ? R
  : never;

export function chainReducers<S>(
  initialState: S,
  ...reducers: Array<Reducer<S, AnyAction>>
): Reducer<S> {
  return (state = initialState, action: AnyAction) =>
    reducers.reduce((newState, reducers) => reducers(newState, action), state);
}
