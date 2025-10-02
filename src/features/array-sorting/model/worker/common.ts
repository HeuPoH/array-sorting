import { createTaskErrorEvent, WorkerEventMessage } from '@shared/workers';

export function createNoAlgorithmMsg(algorithm: string) {
  return createTaskErrorEvent(`Сортировка типа ${algorithm} не зарегистрирована`);
}

export function createStoppedMsg(): WorkerEventMessage['worker-stopped'] {
  return { type: 'worker-stopped', payload: '' };
}
