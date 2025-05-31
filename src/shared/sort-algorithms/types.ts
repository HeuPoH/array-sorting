import type { FactoryItem } from 'shared/lib/factory/types';

export interface AlgorithmFactoryItem extends FactoryItem {
  sort(arr: number[]): number[];
}
