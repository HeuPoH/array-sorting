import React from 'react';
import { ServicesContext } from 'shared/lib/services-context';

export function useWorkersManager() {
  const servicesCtx = React.useContext(ServicesContext);
  return servicesCtx!.workerManager;
}
