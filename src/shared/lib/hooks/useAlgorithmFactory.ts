import React from 'react';
import { ServicesContext } from '@shared/lib/services-context';

export function useAlgorithmsFactory() {
  const servicesCtx = React.useContext(ServicesContext);
  return servicesCtx!.factory;
}
