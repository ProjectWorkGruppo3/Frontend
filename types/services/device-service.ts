import { AuthorizeProps } from './auth-service';

export interface GetDevicesProps extends AuthorizeProps {
  userId: string;
}

export interface GetDeviceDataProps extends AuthorizeProps {
  userId: string;
  deviceId: string;
}
