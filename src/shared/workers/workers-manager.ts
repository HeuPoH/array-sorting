import type { Log } from '@app/store/logger/types';
import { createErrorLog, createInfoLog } from '@app/store/logger/utils';

import { WorkerWrapper } from './worker-wrapper';
import type { WorkerEventPayload, WorkerCommandPayload } from './types';

export interface IWorkersManager {
  create<
    T extends WorkerCommandPayload = WorkerCommandPayload,
    P extends WorkerEventPayload = WorkerEventPayload
  >(worker: Worker): WorkerWrapper<T, P>;
}

type AddLogHandler = (logs: Log[]) => void;

export class WorkersManager implements IWorkersManager {
  constructor(private addLog: AddLogHandler) {}

  create<
    T extends WorkerCommandPayload = WorkerCommandPayload,
    P extends WorkerEventPayload = WorkerEventPayload
  >(worker: Worker) {
    const workerWrapper = new WorkerWrapper<T, P>(worker);
    const workerKey = 'Worker';

    this.addLog([createInfoLog(`${workerKey} запущен`)]);
    workerWrapper.addEventListener('task-running', () => this.addLog([createInfoLog(`${workerKey} приступил к выполнению задачи`)]));
    workerWrapper.addEventListener('task-complete', () =>  this.addLog([createInfoLog(`${workerKey} выполнил задачу`)]));
    workerWrapper.addEventListener('task-error', (e) => this.addLog([createErrorLog(e.data.payload), createErrorLog('При выполнение задачи произошлка ошибка')]));
    workerWrapper.addEventListener('worker-stopped', () => this.addLog([createInfoLog(`${workerKey} остановлен`)]));
    workerWrapper.addEventListener('worker-terminated', () => this.addLog([createInfoLog(`${workerKey} закрыт`)]));

    return workerWrapper;
  }
}
