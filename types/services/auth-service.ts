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
  name: string;
  surname: string;
  job?: string;
  email: string;
  password: string;
  birthday: Date;
  height: number;
  weight: number;
  contacts: string[];
}

export interface ForgotPasswordProps {
  email: string;
}


export interface ResetPasswordProps {
  recoverToken: string;
  password: string;
}