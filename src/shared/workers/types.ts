/* eslint-disable @typescript-eslint/no-explicit-any */
export type WorkerEventTypes = 
  | 'task-running'       // Задача запущена
  | 'task-complete'      // Задача успешно выполнена
  | 'task-error'         // Ошибка при выполнении задачи
  | 'worker-stopped'     // Воркер приостановлен
  | 'worker-terminated'  // Воркер полностью остановлен
  | 'worker-message';    // Любое другое сообщение от воркера

export type WorkerEventPayload = {
  'task-running': any,
  'task-complete': any;
  'task-error': any;
  'worker-stopped': any;
  'worker-terminated': any;
  'worker-message': any;
};

export type WorkerEventMessage<T extends WorkerEventPayload = WorkerEventPayload> = {
  [K in WorkerEventTypes]: Payload<K, T[K]>;
};

export type WorkerCommandTypes = 
  | 'execute'       // Запустить выполнение задачи
  | 'cancel';       // Отменить выполнение задачи

export type WorkerCommandPayload = {
  'execute': any;
  'cancel': any;
};

export type WorkerCommandMessage<T extends WorkerCommandPayload = WorkerCommandPayload> = {
  [K in WorkerCommandTypes]: Payload<K, T[K]>;
};

export type Payload<K extends string, P = any> = {
  type: K,
  payload: P
};
