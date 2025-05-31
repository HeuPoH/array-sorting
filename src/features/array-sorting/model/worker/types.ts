export type PayloadToWorker = {
  start: { algorithm: string, array: number[] }
};

export type PayloadFromWorker = {
  done: { array: number[]; time: number }
};
