import type { Log } from 'app/store/logger/types';
import { createErrorLog, createInfoLog } from 'app/store/logger/utils';

import { createStopCommand } from './common';
import { CustomWorker } from './custom-worker';
import type { WorkerEventPayload, CommandPayload } from './types';

export interface IWorkersManager {
  create<
    T extends CommandPayload = CommandPayload,
    F extends WorkerEventPayload = WorkerEventPayload
  >(url: URL): CustomWorker<T, F>;
}

type AddLogHandler = (logs: Log[]) => void;

export class WorkersManager implements IWorkersManager {
  constructor(private addLog: AddLogHandler) {}
  create<
    T extends CommandPayload = CommandPayload,
    F extends WorkerEventPayload = WorkerEventPayload
  >(url: URL) {
    const worker = new CustomWorker<T, F>(url);
    this.addLog([createInfoLog('Worker запущен')]);
    worker.addEventListener('done', () => this.handlerWorkerDone(worker));
    worker.addEventListener('stopped', () => this.handlerWorkerStopped(worker));
    worker.addEventListener('error', (e) => this.handlerWorkerError(worker, e));
    return worker;
  }

  private handlerWorkerDone<T extends CommandPayload, F extends WorkerEventPayload>(worker: CustomWorker<T, F>) {
    worker.postMessage(createStopCommand(''));
  }

  private handlerWorkerStopped<T extends CommandPayload, F extends WorkerEventPayload>(worker: CustomWorker<T, F>) {
    this.addLog([createInfoLog('Worker остановлен')]);
    this.closeWorker(worker);
  }

  private handlerWorkerError<
    T extends CommandPayload,
    F extends WorkerEventPayload
  >(worker: CustomWorker<T, F>, e: MessageEvent) {
    this.addLog([createErrorLog(e.data.payload), createErrorLog('Worker остановлен с ошибкой')]);
    this.closeWorker(worker);
  }

  private closeWorker<T extends CommandPayload, F extends WorkerEventPayload>(worker: CustomWorker<T, F>) {
    worker.terminate();
  }
}
