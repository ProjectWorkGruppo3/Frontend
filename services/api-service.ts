import { User } from '../types/user';
import axios from 'axios';
import config from '../utils/config';
import { Device } from '../models';

interface LoginProps {
  email: string;
  password: string;
}

type LoginResult = {
  user: User;
  token: string;
  expiration: Date;
} | null;

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
      }
    );

    if (result.status === 401) {
      return null;
    }

    const loginResult = result.data as LoginResult;

    return loginResult;
  };

  interface SignUpProps {
    email: string;
    password: string;
    birthday: Date;
    deviceCode: string;
    height: number;
    weight: number;
  }

  const signup = async (props: SignUpProps) => {
    const result = await axios.post(
      `${config.API_URL}/Users/register`,
      {
        email: props.email,
        password: props.password,
        weight: props.weight,
        height: props.height,
        dayOfBirth: props.birthday,
        deviceCode: props.deviceCode,
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

  interface GetDevicesProps {
    userId: string;
    token: string;
  }

  const getDevices = async (props: GetDevicesProps): Promise<Device[]> => {

    // FIXME
    return [
      {
        name: 'Device 1',
        deviceId: '3f7f795e-773e-44a4-a52e-9bdac7b0540f',
      },
      {
        name: 'Device 2',
        deviceId: 'd3d47010-a79c-45db-a1d1-43aba3e60188',
      },
      {
        name: 'Device 3',
        deviceId: 'f0adbd7e-d2aa-4f66-a1e5-3f6c7489329b',
      }
    ]


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

  interface GetDeviceData {
    userId: string;
    deviceId: string;
    token: string;
  }

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

  return {
    login,
    signup,
    getDevices,
  };
};

export default ApiService();
