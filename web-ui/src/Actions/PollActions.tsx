export enum ActionTypes {
  START_POLLING = 'START_POLLING',
  STOP_POLLING = 'STOP_POLLING'
}

export interface StartPolling {
  type: ActionTypes.START_POLLING;
  payload: {};
}

export interface StopPolling {
  type: ActionTypes.STOP_POLLING;
  payload: {};
}

export const startPolling = (): StartPolling => {
  return {
    type: ActionTypes.START_POLLING,
    payload: {}
  };
};

export const stopPolling = (): StopPolling => {
  return {
    type: ActionTypes.STOP_POLLING,
    payload: {}
  };
};

export type Action = StartPolling | StopPolling;
