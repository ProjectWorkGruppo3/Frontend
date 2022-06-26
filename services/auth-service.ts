import axios from 'axios';
import { ServiceReturnType } from 'types/services/common-service';
import {
  ForgotPasswordProps,
  LoginProps,
  LoginResult,
  SignUpProps,
} from '../types/services/auth-service';
import config from '../utils/config';

const AuthService = () => {
  const login = async ({
    email,
    password,
  }: LoginProps): Promise<ServiceReturnType<LoginResult | undefined>> => {
    try {
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
        throw new Error('Not Authorized');
      }

      const loginResult = result.data as LoginResult;

      return {
        data: loginResult,
        error: undefined,
      };
    } catch (error) {
      return {
        error: error,
        data: undefined,
      };
    }
  };
  const signup = async (
    props: SignUpProps
  ): Promise<ServiceReturnType<boolean>> => {
    try {
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
        }
      );

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

  const forgotPassword = async (
    props: ForgotPasswordProps
  ): Promise<ServiceReturnType<boolean>> => {
    try {
      await axios.post(
        `${config.API_URL}/Users/password-reset`,
        {
          email: props.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

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
    login,
    signup,
    forgotPassword,
  };
};

export default AuthService();
