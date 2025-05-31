/* eslint-disable @typescript-eslint/no-explicit-any */
import { WorkerEventMessages, WorkerCommands } from './types';

// WorkerIncomingMessages
export function createStartCommand(payload: any): WorkerCommands {
  return { type: 'start', payload };
}

export function createStopCommand(payload: any): WorkerCommands {
  return { type: 'stop', payload };
}

// WorkerOutgoingMessages
export function createErrorMsg(payload: any): WorkerEventMessages {
  return { type: 'error', payload };
}

export function createSuccessfullMsg(payload: any): WorkerEventMessages {
  return { type: 'done', payload };
}
