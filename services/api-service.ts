import axios from 'axios';
import config from '../utils/config';
import { Device } from '../models';
import {
  AddNewDeviceData,
  GetDeviceData,
  GetDevicesProps,
  LoginProps,
  LoginResult,
  SignUpProps,
} from '../types/services/api-service';

const ApiService = () => {
  const login = async ({
    email,
    password,
  }: LoginProps): Promise<LoginResult> => {
    const result = await axios.post(
      `${config.API_URL}/Users/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        validateStatus: (status) => status <= 500,
      }
    );

    if (result.status === 401) {
      return null;
    }

    const loginResult = result.data as LoginResult;

    return loginResult;
  };
  const signup = async (props: SignUpProps) => {
    const result = await axios.post(
      `${config.API_URL}/Users/register`,
      {
        email: props.email,
        password: props.password,
        weight: props.weight,
        height: props.height,
        dayOfBirth: props.birthday,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        validateStatus: () => true,
      }
    );

    if (result.status >= 400) {
      console.log(result.data);
      throw new Error(result.data['message'] ?? 'Somethin wrong happened');
    }
  };

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

  const getDeviceData = async (props: GetDeviceData) => {
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

  const addNewDevice = async (props: AddNewDeviceData) => {
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
    login,
    signup,
    getDevices,
    getDeviceData,
    addNewDevice,
  };
};

export default ApiService();
