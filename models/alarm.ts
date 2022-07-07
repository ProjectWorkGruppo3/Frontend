export type Alarm = {
  type: AlarmType;
  date: Date;
};

export type AlarmType = 'LOW_BATTERY' | 'FALL' | 'HEARTBEAT';
