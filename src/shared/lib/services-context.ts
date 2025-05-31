import React from 'react';
import type { IWorkersManager } from 'shared/workers';
import type { IFactory } from 'shared/lib/factory/types';
import type { AlgorithmFactoryItem } from 'shared/sort-algorithms/types';

export type Services = {
  workerManager: IWorkersManager;
  factory: IFactory<AlgorithmFactoryItem>;
};

export const ServicesContext = React.createContext<Services | null>(null);
