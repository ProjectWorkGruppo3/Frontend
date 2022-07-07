import axios from 'axios';
import {
  GetDeviceAlarmsProps,
  PaginateAlarmData,
} from 'types/services/alarm-service';
import { ServiceReturnType } from 'types/services/common-service';
import config from 'utils/config';

const AlarmService = () => {
  const getDeviceAlarms = async (
    props: GetDeviceAlarmsProps
  ): Promise<ServiceReturnType<PaginateAlarmData | null>> => {
    try {
      const result = await axios.get(
        `${config.API_URL}/Alarms/${props.deviceId}?start=${
          props.start ?? 0
        }&limit=${props.limit ?? 50}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${props.token}`,
          },
        }
      );

      const data = result.data as PaginateAlarmData;

      return {
        data: data,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error,
      };
    }
  };

  return {
    getDeviceAlarms,
  };
};

export default AlarmService();
