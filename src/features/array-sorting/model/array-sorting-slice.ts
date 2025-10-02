import { createSlice } from '@reduxjs/toolkit/react';
import { addMetaData } from '@app/store/utils';
import { createInfoLog } from '@app/store/logger/utils';
import type { AppPayloadAction } from '@app/store/types';

import type { State } from '../model/types';
import type { PayloadFromWorker } from '../model/worker/types';

const initialState: State = { sortedArray: [] };
const slice = createSlice({
  name: 'arraySorting',
  initialState,
  reducers: {
    updateSortedArray: {
      prepare: (payload: PayloadFromWorker['task-complete']) => {
        const logs = [
          createInfoLog('Сортировка завершена.'),
          createInfoLog(`Время сортировки: ${payload.time} мс`),
          createInfoLog(`Отсортированный массив: ${payload.array}`)
        ];
        return addMetaData({ payload }, { 'toConsole': logs });
      },
      reducer: (state: State, action: AppPayloadAction<PayloadFromWorker['task-complete']>) => {
        state.sortedArray = action.payload.array;
      }
    }
  }
});

export const arraySortingReducers = slice.reducer;
export const { updateSortedArray } = slice.actions;
