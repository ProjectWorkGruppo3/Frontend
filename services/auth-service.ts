import axios from 'axios';
import {
  LoginProps,
  LoginResult,
  SignUpProps,
} from '../types/services/auth-service';
import config from '../utils/config';

const AuthService = () => {
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

  return {
    login,
    signup,
  };
};

export default AuthService();
