import { createSlice } from '@reduxjs/toolkit/react';
import type { AppPayloadAction } from 'app/store/types';
import type { Log, State } from './types';
import { createInfoLog } from './utils';

const initialState: State = { logs: [createInfoLog('Ожидание генерации массива')] };
const slice = createSlice({
  name: 'logger',
  initialState,
  reducers: {
    addLogs: (state: State, action: AppPayloadAction<Log[]>) => {
      state.logs.push(...action.payload);
    }
  },
});

export const loggerReducers = slice.reducer;
export const { addLogs } = slice.actions;
