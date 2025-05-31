/* eslint-disable @typescript-eslint/no-explicit-any */
export type WorkerCommandTypes = 'start' | 'stop';
export type CommandPayload = { [K in WorkerCommandTypes]?: any };

export type WorkerCommands<P extends CommandPayload = CommandPayload> = {
  [K in WorkerCommandTypes]: Payload<K, P[K]>;
}[WorkerCommandTypes];

export type WorkerEventTypes = 'done' | 'error' | 'stopped' | 'message';
export type WorkerEventPayload = { [K in WorkerEventTypes]?: any };

export type WorkerEventMessages<P extends WorkerEventPayload = WorkerEventPayload> = {
  [K in WorkerEventTypes]: Payload<K, P[K]>;
}[WorkerEventTypes];

export type Payload<K extends string, P = any> = {
  type: K,
  payload: P
};
