import { configureStore } from '@reduxjs/toolkit';

import { loggerReducers } from 'app/store/logger/logger-slice';
import { loggerMiddleware } from 'app/store/logger/logger-middleware';
import { arraySettingsReducers } from 'features/array-settings';
import { arraySortingReducers } from 'features/array-sorting';

export const store = configureStore({
  reducer: {
    arraySettings: arraySettingsReducers,
    arraySorting: arraySortingReducers,
    logger: loggerReducers
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
