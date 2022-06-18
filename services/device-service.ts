import axios from 'axios';
import { Device } from '../models';
import { AddNewDeviceProps } from '../types/services/api-service';
import {
  GetDevicesProps,
  GetDeviceDataProps,
} from '../types/services/device-service';
import config from '../utils/config';

const DeviceService = () => {
  const getDevices = async (props: GetDevicesProps): Promise<Device[]> => {
    // FIXME
    return [];

    const result = await axios.get(
      `${config.API_URL}/users/${props.userId}/devices`, //FIXME
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: props.token,
        },
        validateStatus: () => true,
      }
    );

    if (result.status >= 400) {
      console.log(result.data);
      throw new Error(result.data['message'] ?? 'Somethin wrong happened');
    }

    const data = result.data as Device[];

    return data;
  };

  const getDeviceData = async (props: GetDeviceDataProps) => {
    const result = await axios.get(
      `${config.API_URL}/users/${props.userId}/devices/${props.deviceId}`, //FIXME
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: props.token,
        },
        validateStatus: () => true,
      }
    );

    if (result.status >= 400) {
      console.log(result.data);
      throw new Error(result.data['message'] ?? 'Somethin wrong happened');
    }
  };

  const addNewDevice = async (props: AddNewDeviceProps) => {
    return;
    const result = await axios.post(
      `${config.API_URL}/devices/`, //FIXME
      {
        name: props.name,
        id: props.id,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: props.token,
        },
        validateStatus: () => true,
      }
    );

    if (result.status >= 400) {
      console.log(result.data);
      throw new Error(result.data['message'] ?? 'Somethin wrong happened');
    }
  };

  return {
    getDevices,
    getDeviceData,
    addNewDevice,
  };
};

export default DeviceService();
