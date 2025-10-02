/* eslint-disable @typescript-eslint/no-explicit-any */

export const createExecuteCommand = <T>(payload: T) => ({
  type: 'execute',
  payload
});

export const createCancelCommand = (payload: any) => ({
  type: 'cancel',
  payload
});

export const createTaskCompleteEvent = (payload: any) => ({
  type: 'task-complete',
  payload
});

export const createTaskErrorEvent = (payload: any) => ({
  type: 'task-error',
  payload
});

export const createWorkerTerminateEvent = (payload: any) => ({
  type: 'worker-terminated',
  payload
});
