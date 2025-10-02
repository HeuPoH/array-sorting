import React from 'react';

import type { Log } from '@app/store/logger/types';
import { addLogs } from '@app/store/logger/logger-slice';
import { useAppDispatch } from '@app/store/hooks';

import { WorkersManager } from '@shared/workers';
import { type Services, ServicesContext } from '@shared/lib/services-context';
import { getAlgorithmsFactory } from '@shared/sort-algorithms';

export const ServicesProvider: React.FC<React.PropsWithChildren> = props => {
  const dispatch = useAppDispatch();
  const services: Services = React.useMemo(() => 
    ({
      workerManager: new WorkersManager((logs: Log[]) => dispatch(addLogs(logs))),
      factory: getAlgorithmsFactory()
    }),
    []
  );

  return (
    <ServicesContext.Provider value={services}>
      {props.children}
    </ServicesContext.Provider>
  );
};
