import { createExecuteCommand, createCancelCommand } from './common';
import type {
  Payload,
  WorkerCommandPayload,
  WorkerEventMessage,
  WorkerEventPayload,
  WorkerEventTypes,
} from './types';

type EventListener<
  E extends WorkerEventTypes,
  P extends WorkerEventPayload
> = (e: MessageEvent<WorkerEventMessage<P>[E]>) => void;

export class WorkerWrapper<
  T extends WorkerCommandPayload = WorkerCommandPayload,
  P extends WorkerEventPayload = WorkerEventPayload
> {
  private listeners = new Map<WorkerEventTypes, Set<EventListener<WorkerEventTypes, P>>>();
  private status: 'idle' | 'running' | 'stopping' | 'complete' | 'error' | 'terminated' = 'idle';

  constructor(private worker: Worker) {
    worker.addEventListener('message', this.onEventMessageListener);
    this.addEventListener('task-running', () => this.status = 'running');
    this.addEventListener('task-complete', () => this.status = 'complete');
    this.addEventListener('task-error', () => this.status = 'error');
    this.addEventListener('worker-stopped', () => this.status = 'stopping');
    this.addEventListener('worker-terminated', () => {
      this.status = 'terminated';
      this.terminate();
    });
  }

  start(payload: T['execute']) {
    this.checkNotTerminated();

    if (this.status === 'running') {
      console.warn('Worker is already running');
      return;
    }

    this.postMessage(createExecuteCommand(payload));
  }

  stop(payload: T['cancel']) {
    this.checkNotTerminated();

    if (this.status !== 'running') {
      console.warn('Worker is not running');
      return;
    }
    
    this.postMessage(createCancelCommand(payload));
  }

  terminate() {
    this.checkNotTerminated();
    this.listeners.clear();

    this.worker.removeEventListener('message', this.onEventMessageListener);
    this.worker.terminate();
  }

  addEventListener<E extends WorkerEventTypes>(type: E, listener: EventListener<E, P>) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(listener as EventListener<WorkerEventTypes, P>);
  }

  removeEventListener<E extends WorkerEventTypes>(type: E, listener: EventListener<E, P>) {
    this.listeners.get(type)?.delete(listener as EventListener<WorkerEventTypes, P>);
  }

  getStatus() {
    return this.status;
  }

  private checkNotTerminated() {
    if (this.status === 'terminated') {
      throw new Error('WorkerWrapper has been terminated');
    }
  }

  // Messages to worker
  private postMessage(message: unknown) {
    this.worker.postMessage(message);
  }

  // Messages from worker
  private onEventMessageListener = (event: MessageEvent<Payload<WorkerEventTypes>>) => {
    const eventType = event.data.type;
    const listeners = this.listeners.get(eventType);
    if (!listeners) {
      return;
    }

    for (const listener of listeners ) {
      listener(event);
    }
  };
}
