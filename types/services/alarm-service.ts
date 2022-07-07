import { Alarm } from 'models/alarm';
import { AuthorizeProps } from './auth-service';

export interface GetDeviceAlarmsProps extends AuthorizeProps {
  deviceId: string;
  start?: number;
  limit?: number;
}

export interface PaginateAlarmData {
  total: number;
  data: Alarm[];
  start: number;
  limit: number;
}
