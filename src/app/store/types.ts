import { PayloadAction } from '@reduxjs/toolkit';
import { Log } from './logger/types';

export const TO_CONSOLE_KEY = 'toConsole';
export interface MetaDataKeys {
  [TO_CONSOLE_KEY]?: Log[];
}

export type AppPayloadAction<P = unknown> = PayloadAction<P> & { meta?: MetaDataKeys };
