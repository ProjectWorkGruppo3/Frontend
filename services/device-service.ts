import axios from 'axios';
import { ServiceReturnType } from 'types/services/common-service';
import { Device } from '../models';
import {
  AddNewDeviceProps,
  GetDeviceDataProps,
  GetDevicesProps,
} from '../types/services/device-service';
import config from '../utils/config';

const DeviceService = () => {
  const getDevices = async (
    props: GetDevicesProps
  ): Promise<ServiceReturnType<Device[]>> => {
    try {
      const result = await axios.get(`${config.API_URL}/Device`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.token}`,
        },
        validateStatus: () => true,
      });

      if (result.status >= 400) {
        console.log(result.data);
        throw new Error(result.data['message'] ?? 'Somethin wrong happened');
      }

      const data = result.data as Device[];

      return {
        data: data,
        error: undefined,
      };
    } catch (error: any) {
      return {
        data: [],
        error: error,
      };
    }
  };

  // TODO
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

  const addNewDevice = async (
    props: AddNewDeviceProps
  ): Promise<ServiceReturnType<boolean>> => {
    try {
      const result = await axios.post(
        `${config.API_URL}/Device`,
        {
          name: props.name,
          id: props.id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${props.token}`,
          },
          validateStatus: () => true,
        }
      );

      if (result.status >= 400) {
        console.log(result.data);
        throw new Error(result.data['message'] ?? 'Somethin wrong happened');
      }

      return {
        data: true,
        error: undefined,
      };
    } catch (error: any) {
      return {
        data: false,
        error: error,
      };
    }
  };

  return {
    getDevices,
    addNewDevice,
  };
};

export default DeviceService();
