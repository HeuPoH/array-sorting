import { createErrorMsg, WorkerEventMessages } from '@shared/workers';

export function createNoAlgorithmMsg(algorithm: string) {
  return createErrorMsg(`Сортировка типа ${algorithm} не зарегистрирована`);
}

export function createStoppedMsg(): WorkerEventMessages {
  return { type: 'stopped', payload: '' };
}
