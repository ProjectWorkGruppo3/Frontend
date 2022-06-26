import { User } from '../../models/user';

export interface AuthorizeProps {
  token: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export type LoginResult = {
  user: User;
  token: string;
  expiration: Date;
} | null;

export interface SignUpProps {
  email: string;
  password: string;
  birthday: Date;
  height: number;
  weight: number;
}

export interface ForgotPasswordProps {
  email: string;
}
