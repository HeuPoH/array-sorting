import { getAlgorithmsFactory } from '@shared/sort-algorithms';
import {
  createErrorMsg,
  createSuccessfullMsg,
  type WorkerCommands,
} from '@shared/workers';

import { createNoAlgorithmMsg, createStoppedMsg } from './common';
import type { PayloadToWorker } from './types';

const factory = getAlgorithmsFactory();

self.onmessage = (e: MessageEvent<WorkerCommands<PayloadToWorker>>) => { 
  const type = e.data.type;
  switch (type) {
    case 'start': {
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
      self.postMessage(createSuccessfullMsg(result));
      break;
    }
    case 'stop':
      self.postMessage(createStoppedMsg());
      break;
    default: {
      const _: unknown = type;
      console.log(_);
    }
  }
};

self.onerror = (event) => {
  self.postMessage(createErrorMsg(event.toString()));
};
