import { AuthorizeProps } from './auth-service';

import { Analytic } from 'models/analytic';
import { GeolocalizationValue } from 'types/geolocalization';
import UserDeviceState from 'types/user-device-state';
export interface GeneralDeviceData {
  deviceId:     string;
  lastUpdate:   Date;
  lastLocation: GeolocalizationValue;
  lastState:    UserDeviceState;
  totalAlarms:  number;
  analysis:     Analytic[];
  battery:      number;
}

export interface GetDevicesProps extends AuthorizeProps {
  userId: string;
}

export interface GetDeviceDataProps extends AuthorizeProps {
  userId: string;
  deviceId: string;
}

export interface AddNewDeviceProps extends AuthorizeProps {
  name: string;
  id: string;
}


export interface GetGeneralDeviceDataProps extends AuthorizeProps {
  deviceId: string;
}
