import { User } from '../types/user';
import axios from 'axios';
import config from '../utils/config';

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
        validateStatus: () => true
      },
      
    );

    if (result.status >= 400) {
      console.log(result.data)
      throw new Error(result.data['message'] ?? 'Somethin wrong happened')
    }

  };

  return {
    login,
    signup,
  };
};

export default ApiService();
