export type LogType = 'info' | 'error';
export type Log = { type: LogType, time: string, msg: string };
export type State = { logs: Log[] };
