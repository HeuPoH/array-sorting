import { createSlice } from '@reduxjs/toolkit/react';
import { addMetaData } from 'app/store/utils';
import { createInfoLog } from 'app/store/logger/utils';
import type { AppPayloadAction } from 'app/store/types';

import type { State } from './types';

const initialState: State = { array: [] };
const slice = createSlice({
  name: 'arraySettings',
  initialState,
  reducers: {
    updateArray: {
      prepare: (payload: number[]) => {
        const log = createInfoLog(`Массив сгенерирован: ${payload}`);
        return addMetaData({ payload }, { 'toConsole': [log] });
      },
      reducer: (state: State, action: AppPayloadAction<number[]>) => {
        state.array = action.payload;
      }
    }
  }
});

export const arraySettingsReducers = slice.reducer;
export const { updateArray } = slice.actions;
