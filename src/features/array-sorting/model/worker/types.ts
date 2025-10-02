export type PayloadToWorker = {
  execute: { algorithm: string, array: number[] };
  cancel: void;
};

export type PayloadFromWorker = {
  'task-complete': { array: number[]; time: number };
  'task-running': void;
  'task-error': void;
  'worker-stopped': void;
  'worker-terminated': void;
  'worker-message': void;
};
