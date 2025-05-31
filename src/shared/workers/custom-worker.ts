/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStartCommand, createStopCommand } from './common';
import type {
  Payload,
  WorkerCommands,
  CommandPayload,
  WorkerEventTypes,
  WorkerCommandTypes,
  WorkerEventPayload
} from './types';

type Listener<P = Payload<WorkerEventTypes>> = (e: MessageEvent<P>) => void;
type EventListener<P = Payload<WorkerEventTypes>> = Listener<P> | EventListenerObject;

export class CustomWorker<
  T extends CommandPayload = CommandPayload,
  F extends WorkerEventPayload = WorkerEventPayload
> extends Worker {
  private listeners = new Map<WorkerEventTypes, Set<Listener<T[WorkerCommandTypes]>>>();

  constructor(url: URL) {
    super(url, { type: 'module' });
    super.addEventListener('message', this.onEventMessageListener);
  }

  start(payload: T['start']) {
    this.postMessage(createStartCommand(payload));
  }

  stop(payload: T['stop']) {
    this.postMessage(createStopCommand(payload));
  }

  override terminate() {
    this.listeners.clear();
    super.terminate();
  }

  override addEventListener<K extends WorkerEventTypes>(type: K, listener: EventListener<Payload<K, F[K]>>) {
    if (typeof listener !== 'function') {
      throw new Error();
    }

    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)!.add(listener);
  }

  // Messages to worker
  override postMessage(message: WorkerCommands, arg2?: any) {
    super.postMessage(message, arg2);
  }

  // Messages from worker
  private onEventMessageListener(event: MessageEvent<Payload<WorkerEventTypes>>) {
    const eventType = event.data.type;
    const listeners = this.listeners.get(eventType);
    if (!listeners) {
      return;
    }

    for (const listener of listeners ) {
      listener(event);
    }
  }
}
