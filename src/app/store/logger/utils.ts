import { getTime } from 'shared/lib/date';
import type { Log, LogType } from './types';

export function createLog(msg: string, type: LogType): Log {
  return { type, time: getTime(), msg };
}

export function createInfoLog(msg: string): Log {
  return createLog(msg, 'info');
}

export function createErrorLog(msg: string): Log {
  return createLog(msg, 'error');
}
