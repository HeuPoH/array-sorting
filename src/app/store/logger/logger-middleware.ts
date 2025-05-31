import type { Middleware } from '@reduxjs/toolkit/react';

import { TO_CONSOLE_KEY, type AppPayloadAction   } from 'app/store/types';
import { addLogs } from 'app/store/logger/logger-slice';

export const loggerMiddleware: Middleware = store => next => action => {
  const appAction = action as AppPayloadAction;
  const toConsole = appAction.meta?.[TO_CONSOLE_KEY];
  if (toConsole) {
    store.dispatch(addLogs(toConsole));
  }

  return next(action);
};
