/* eslint-disable @typescript-eslint/no-explicit-any */
import { type MetaDataKeys, TO_CONSOLE_KEY } from './types';

export function addMetaData<T extends Record<string, any>>(obj: T, keys: MetaDataKeys): T {
  let meta: MetaDataKeys = {};
  if (typeof obj['meta'] === 'object') {
    meta = { ...obj.meta };
  }

  if (keys[TO_CONSOLE_KEY]) {
    meta[TO_CONSOLE_KEY] = keys[TO_CONSOLE_KEY];
  }

  Object.defineProperty(obj, 'meta', { value: meta, writable: false });
  return obj;
}
