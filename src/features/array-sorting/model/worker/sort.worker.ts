import { getAlgorithmsFactory } from '@shared/sort-algorithms';
import {
  createTaskErrorEvent,
  createTaskCompleteEvent,
  type WorkerCommandMessage
} from '@shared/workers';
import { createWorkerTerminateEvent } from '@shared/workers/common';
import { WorkerCommandTypes } from '@shared/workers/types';

import { createNoAlgorithmMsg, createStoppedMsg } from './common';
import type { PayloadToWorker } from './types';

const factory = getAlgorithmsFactory();

self.onmessage = (e: MessageEvent<WorkerCommandMessage<PayloadToWorker>[WorkerCommandTypes]>) => { 
  const type = e.data.type;
  switch (type) {
    case 'execute': {
      const { array, algorithm } = e.data.payload;
      const algorithmInst = factory.getRegistered(algorithm);
      if (!algorithmInst) {
        self.postMessage(createNoAlgorithmMsg(algorithm));
        return;
      }
  
      const start = performance.now();
      const sortedArray = algorithmInst.sort(array);
      const time = performance.now() - start;
      const result = { array: sortedArray, time };
      self.postMessage(createTaskCompleteEvent(result));
      break;
    }
    case 'cancel':
      self.postMessage(createStoppedMsg());
      break;
    default: {
      const _: unknown = type;
      console.log(_);
    }

    self.postMessage(createWorkerTerminateEvent(undefined));
  }
};

self.onerror = (event) => {
  self.postMessage(createTaskErrorEvent(event.toString()));
};
