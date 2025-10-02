import type { IFactory } from '@shared/lib/factory/types';
import { Factory } from '@shared/lib/factory/factory';

import { quickSort } from './quick-sort';
import type { AlgorithmFactoryItem } from './types';

let algorithmsFactory: IFactory<AlgorithmFactoryItem>;
export function getAlgorithmsFactory() {
  if (!algorithmsFactory) {
    algorithmsFactory = new Factory();
    register((key, item) => algorithmsFactory.register(key, item));
  }

  return algorithmsFactory;
}

function register(register: (key: string, item: AlgorithmFactoryItem) => void) {
  register(
    'quick-sort',
    {
      type: 'quick-sort',
      label: 'Быстрая сортировка',
      sort: (arr) => quickSort(arr)
    }
  );
}
